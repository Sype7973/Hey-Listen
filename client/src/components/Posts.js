// component to render a post into PostDashboard.js

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Button } from "@chakra-ui/react";
import { QUERY_POSTS } from "../utils/queries";
import Auth from "../utils/auth";

// function that maps and renders posts
const Posts = () => {
  const { loading, data } = useQuery(QUERY_POSTS);
  const [posts, setPosts] = useState([]);

//   doesn't render data on dashboard
  useEffect(() => {
    if (data) {
      setPosts(data.getPosts);
    }
  }, [data]);
  console.log(data);
  if (loading) {
    return <div>Loading...</div>;
  }
 
  const handleContactPoster = (postId) => {
    // Implement the logic to contact the poster for the given postId
    console.log(`Contacting the poster for post with ID: ${postId}`);
  };

  const handleAcceptPost = (postId) => {
    // Implement the logic to accept the post for the given postId
    console.log(`Accepting the post with ID: ${postId}`);
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
              <h2>{post.postTitle}</h2>
              <p>{post.postDescription}</p>
              <p>{post.postType}</p>
              <p>{post.username}</p>
              <p>Budget: {post.budget}</p>
              <p>Deadline: {post.deadline}</p>
              <p>Created By: {post.username}</p>
              <p>Created At: {post.createdAt}</p>

              <Button colorScheme="teal" mt={2} onClick={() => handleContactPoster(post._id)}>
                Contact Poster
              </Button>
              <Button colorScheme="blue" mt={2} onClick={() => handleAcceptPost(post._id)}>
                Accept Post
              </Button>
            </Box>
          </Flex>
        ))}
    </Box>
  );
};

export default Posts;