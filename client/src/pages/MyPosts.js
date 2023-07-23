import React from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Card, CardBody, Heading } from "@chakra-ui/react";
import { GET_ME } from "../utils/queries";
import spinner from "../assets/images/spinner.gif";
import Posts from "../components/Posts";
import Auth from "../utils/auth";

const MyPosts = () => {
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;

  if (loading) {
    return <img src={spinner} alt="loading" />;
  }

  console.log("User Data:", user);
  console.log("Logged In Username:", loggedInUsername);

  // Filter the user's posts into "My Posts" (Posts belonging to the logged-in user)
  const myPosts = user.posts ? user.posts.filter((post) => post.username === loggedInUsername) : [];

  console.log("My Posts:", myPosts);

  return (
    <Box>
      {myPosts.length > 0 ? (
        <Flex
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
          <Heading as="h2" mb={4}>
            My Posts
          </Heading>
          <Posts posts={myPosts} />
        </Flex>
      ) : (
        <Flex
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
          <Heading as="h2" mb={4}>
            No Posts Found
          </Heading>
        </Flex>
      )}
    </Box>
  );
};

export default MyPosts;