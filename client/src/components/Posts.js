import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Box, Flex, Button, Text, Card, CardBody, Heading, SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import { QUERY_POSTS, GET_ME, GET_FILTERED_POSTS } from "../utils/queries";
import { REMOVE_POST, ACCEPT_POST } from "../utils/mutations";
import Auth from "../utils/auth";

const Posts = ({ postTypeFilter }) => {
  const { data, refetch } = useQuery(QUERY_POSTS);
  const { data: myUserData } = useQuery(GET_ME);
  const { data: filteredData } = useQuery(GET_FILTERED_POSTS, {
    variables: { postType: postTypeFilter },
  });
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [removePost] = useMutation(REMOVE_POST);
  const [acceptPost] = useMutation(ACCEPT_POST);

  // renders filtered data if there is a filter, otherwise renders all posts
  useEffect(() => {
    if (postTypeFilter === "all") {
      // When the filter is set to "all", display all posts from the original data.
      if (data) {
        setPosts(data.getPosts);
        setUser(myUserData.me);
      }
    } else {
      // When the filter is set to a specific value, use the filtered data.
      if (filteredData) {
        setPosts(filteredData.filterPost);
        setUser(myUserData.me);
      }
    }
  }, [data, filteredData, myUserData, postTypeFilter]);

  const loggedInUsername = Auth.loggedIn()
    ? Auth.getProfile().data.username
    : null;

  // still need to implement these functions correctly, coming up as undefined
  const handleContactPoster = (postId, email, postTitle, username) => {
    const subject = `I'm interested in your post: ${postTitle}`;
    const body = `Hi ${username},\n\nI'm interested in: ${postTitle}.\n\nPlease let me know if it's still available.\n\nThanks,\n\n${user.username}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
    console.log(`Contacting the poster for post with ID: ${postId}`);
  };
  // accepts posts and moves them to the user's accepted posts
  const handleAcceptPost = async (postId) => {
    // setPostId(postId);
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

  const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  const buttonFontSize = useBreakpointValue({ base: "sm", md: "md", lg: "md" });


  return (
    <Box>
      {posts.length ? (
        <SimpleGrid columns={gridColumns} spacing={5}>
          {posts.map((post) => (
            <Box
              key={post._id}
              p={5}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              flexDirection="column"
              alignItems="left"
              justifyContent="center"
              textAlign="left"
              bg="gray.50"
              mt={5}
              id="posts-card"
            >
              <Box m={5}>
                {/* Title Heading */}
                <Text fontSize="1.5rem" fontWeight="bold" mb={5} textAlign="center">
                  {post.postTitle}
                </Text>

                {/* User Heading */}
                <Text fontSize="1.5rem" fontWeight="bold" >
                  User:
                </Text>
                <Link to={`/profile/${post.username}`}>
                  <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                    {post.username}
                  </Text>
                </Link>

                {/* Description */}
                <Text fontSize="1.2rem" fontWeight="bold">
                  Description:
                </Text>
                <p>{post.postDescription}</p>

                {/* Post Type */}
                <Text fontSize="1.2rem" fontWeight="bold">
                  Post Type:
                </Text>
                <p>{post.postType}</p>

                {/* Budget */}
                <Text fontSize="1.2rem" fontWeight="bold">
                  Budget:
                </Text>
                <p>${post.budget}</p>

                {/* Deadline */}
                <Text fontSize="1.2rem" fontWeight="bold">
                  Deadline:
                </Text>
                <p>{formatDateForm(post.deadline)}</p>

                {/* Created At */}
                <Text fontSize="1.2rem" fontWeight="bold">
                  Created At:
                </Text>
                <p>{formatDateForm(post.createdAt)}</p>

                {/* Check if the logged-in user is the same as the post's creator */}
                {loggedInUsername === post.username && (
                  <>
                    <Button
                      colorScheme="red"
                      mt={2}
                      m={3}
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
                      m={3}
                      fontSize={buttonFontSize}
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
                      m={3}
                      fontSize={buttonFontSize}
                      onClick={() => handleAcceptPost(post._id)}
                    >
                      Accept Post
                    </Button>
                  </>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      ) : (
        <Card>
          <CardBody>
            <Heading>No Posts Yet</Heading>
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default Posts;