import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Flex, Button } from "@chakra-ui/react";
import { QUERY_POSTS } from "../utils/queries";
import { REMOVE_POST } from "../utils/mutations";
import Auth from "../utils/auth";

const Posts = () => {
  const { loading, data, refetch } = useQuery(QUERY_POSTS);
  const [posts, setPosts] = useState([]);
  const [removePost, { error }] = useMutation(REMOVE_POST);

  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
      refetch();
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  // still need to implement these functions correctly, coming up as undefined
  const handleContactPoster = (postId, email, postTitle, username) => {
    const subject = `I'm interested in your post: ${postTitle}`;
    const body = `Hi ${username},\n\nI'm interested in: ${postTitle}.\n\nPlease let me know if it's still available.\n\nThanks!`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    console.log(`Contacting the poster for post with ID: ${postId}`);
  };
  // accepts posts and moves them to the user's accepted posts
  const handleAcceptPost = (postId) => {
    console.log(`Accepting the post with ID: ${postId}`);
  };

  const handleRemovePost = (postId) => {
    console.log(`Removing the post with ID: ${postId}`);
    removePost({
      variables: { postId },
      update: (cache, { data: { removePost } }) => { // Destructure the response to get the removed post
        const existingPosts = cache.readQuery({ query: QUERY_POSTS });
        const updatedPosts = existingPosts.getPosts.filter((post) => post._id !== removePost._id);
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { getPosts: updatedPosts },
        });
      },
    });
  };



  const formatDate = (timestamp) => {
    if (timestamp) {
      const date = new Date(parseInt(timestamp));
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${day}/${month}/${year}`;
    }
    return "Invalid Date";
  };
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
              <p>Description: {post.postDescription}</p>
              <p>Post Type: {post.postType}</p>
              <p>User: {post.username}</p>
              <p>Budget: ${post.budget}</p>
              <p>Deadline: {formatDate(post.deadline)}</p>
              <p>Created By: {post.username}</p>
              <p>Created At: {formatDate(post.createdAt)}</p>

              {/* Check if the logged-in user is the same as the post's creator */}
              {loggedInUsername === post.username && (
                <>
                  <Button colorScheme="red" mt={2} onClick={() => handleRemovePost(post._id)}>
                    Remove Post
                  </Button>
                </>
              )}
              {loggedInUsername !== post.username && (
                <>
                  <Button colorScheme="teal" mt={2} onClick={() => handleContactPoster(post._id, post.email, post.postTitle, post.username )}>
                    Contact Poster
                  </Button>
                  <Button colorScheme="blue" mt={2} onClick={() => handleAcceptPost(post._id)}>
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