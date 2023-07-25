import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import { Box, Flex, Button, Card, CardBody, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import spinner from "../assets/images/spinner.gif";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import PostFilter from "../components/PostFilter";

const PostDashboard = () => {
  const { loading, data } = useQuery(GET_ME);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [postTypeFilter, setPostTypeFilter] = useState("all");

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.me !== null) {
      setUser(data.me);
    }
  }, [data]);

  if (isLoading || loading) {
    return (
      <Flex
        minHeight="100vh"
        width="100%"
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
    <Flex align="flex-start" justify="space-between">
      {user ? (
        <>
          <Box width="20%" ml={5} mt={5}>
            <Heading>Filter</Heading>
            <PostFilter onFilterChange={setPostTypeFilter} />
          </Box>
        </>
      ) : null}
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
        <Heading as="h1" size="xl" mb={5}>
          Posts
        </Heading>
        <Posts postTypeFilter={postTypeFilter} />
        {user ? (
          <Box textAlign="center">
            <Link to="/create-post">
              <Button colorScheme="teal" mt={4}>
                Create Post
              </Button>
            </Link>
          </Box>
        ) : null}
      </Flex>
    </Flex>
  );
};

export default PostDashboard;