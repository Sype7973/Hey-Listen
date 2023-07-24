import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Flex, Button, Card, CardBody } from "@chakra-ui/react";
import { QUERY_POSTS, GET_ME } from "../utils/queries";
import { REMOVE_POST, ACCEPT_POST } from "../utils/mutations";
import Auth from "../utils/auth";
import spinner from "../assets/images/spinner.gif";


const Posts = () => {
  const { loading, data, refetch } = useQuery(QUERY_POSTS);
  const { data: myUserData } = useQuery(GET_ME);
  const [posts, setPosts] = useState([]);
  const [postId, setPostId] = useState(null);
  const [removePost] = useMutation(REMOVE_POST);
  const [acceptPost] = useMutation(ACCEPT_POST);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posts]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);

  

  const loggedInUsername = Auth.loggedIn()
    ? Auth.getProfile().data.username
    : null;

  // still need to implement these functions correctly, coming up as undefined
  const handleContactPoster = (postId, email, postTitle, username) => {
    const subject = `I'm interested in your post: ${postTitle}`;
    const body = `Hi ${username},\n\nI'm interested in: ${postTitle}.\n\nPlease let me know if it's still available.\n\nThanks!`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    console.log(`Contacting the poster for post with ID: ${postId}`);
  };
  // accepts posts and moves them to the user's accepted posts
  const handleAcceptPost = async (postId) => {
    setPostId(postId);
    if (!data || !data.getPosts) {
      console.error("No posts found!");
      return;
    }
    const postData = data.getPosts.filter((post) => post._id === postId);

    if (postData.length === 0) {
      console.error(`No post found with ID: ${postId}`);
      return;
    }

    const post = postData[0];

    if (!post.deadline) {
      console.error(`No deadline found for post with ID: ${postId}`);
      return;
    }

    console.log(postData[0].deadline);
    // const updatedDeadline = formatDateForm(postData[0].deadline);

    // const updatedCreatedAt = formatDateForm(postData[0].createdAt);

    // console.log("Updated deadline");
    // console.log(updatedDeadline);

    const acceptedCommission = {
      commissionTitle: postData[0].postTitle,
      commissionType: postData[0].postType,
      commissionDescription: postData[0].postDescription,
      creatorId: postData[0].userId,
      collaboratorId: myUserData.me._id,
      collaboratorUsername: myUserData.me.username,
      budget: postData[0].budget,
      deadline: postData[0].deadline,
      status: true,
      creatorUsername: postData[0].username,
      createdAt: postData[0].createdAt,
    };

    console.log("ACCEPTED COMMISSION");
    console.log(acceptedCommission);

    try {
      const { data: acceptedPostData, error: acceptError } = await acceptPost({
        variables: { commissions: acceptedCommission },
      });
      handleRemovePost(postId);
      refetch();

      if (acceptError) {
        console.error("Error accepting the post:", acceptError);
      }
      console.log("Accepted Post Data");
      console.log(acceptedPostData);
    } catch (err) {
      console.error(`ERRRRRRRRRRR: ${err}`);
    }

    console.log(`Accepting the post with ID: ${postId}`);
  };

  const handleRemovePost = (postId) => {
    console.log(`Removing the post with ID: ${postId}`);
    removePost({
      variables: { postId },
      update: (cache, { data: { removePost } }) => {
        const existingPosts = cache.readQuery({ query: QUERY_POSTS });
        const updatedPosts = existingPosts.getPosts.filter(
          (post) => post._id !== removePost._id
        );
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { getPosts: updatedPosts },
        });
      },
    });
  };

  const formatDateForm = (timestamp) => {
    if (timestamp) {
      const date = new Date(parseInt(timestamp));
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${year}/${month}/${day}`;
    }
    return "Invalid Date";
  };


  if (isLoading || loading) {
    return (
      <Flex
        minHeight="100vh"
        alignItems="center"
        bg="teal.500"
        direction="column"
        justifyContent="center"
      >
        <Card m="auto" width="20vw" h="20vw">
          <CardBody display="flex" alignItems="center" justifyContent="center">
            <img src={spinner} alt="loading"></img>{" "}
          </CardBody>
        </Card>
      </Flex>
    );
  }

  return (
    <Box>
      {posts &&
        posts.map((post) => (
          <Flex
            key={post._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="gray.50"
            m={5}
          >
            <Box>
              <h2>Title: {post.postTitle}</h2>
              <p style={{ fontStyle: "italic" }}>{post.username}</p>
              <p>Description: {post.postDescription}</p>
              <p>Post Type: {post.postType}</p>
              <p>Budget: ${post.budget}</p>
              <p>Deadline: {formatDateForm(post.deadline)}</p>
              <p>Created At: {formatDateForm(post.createdAt)}</p>

              {/* Check if the logged-in user is the same as the post's creator */}
              {loggedInUsername === post.username && (
                <>
                  <Button
                    colorScheme="red"
                    mt={2}
                    onClick={() => handleRemovePost(post._id)}
                  >
                    Remove Post
                  </Button>
                </>
              )}
              {loggedInUsername !== post.username && (
                <>
                  <Button
                    colorScheme="teal"
                    mt={2}
                    onClick={() =>
                      handleContactPoster(
                        post._id,
                        post.email,
                        post.postTitle,
                        post.username
                      )
                    }
                  >
                    Contact Poster
                  </Button>
                  <Button
                    colorScheme="blue"
                    mt={2}
                    onClick={() => handleAcceptPost(post._id)}
                  >
                    Accept Post
                  </Button>
                </>
              )}
            </Box>
          </Flex>
        ))}
    </Box>
  );
};

export default Posts;
