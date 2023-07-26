import React, { useState, useEffect } from "react";
import Posts from "../components/Posts";
import { Box, Flex, Button, Card, CardBody, Heading, useBreakpointValue } from "@chakra-ui/react";
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
  const buttonWidth = useBreakpointValue({ base: "100px", md: "lg" });

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
    <Box>
      {user && (
        <Box textAlign="center" py={5} bg="gray.100">
          <Heading as="h1" size="xl">
            Post Dashboard
          </Heading>
          <Link to="/create-post">
            <Button colorScheme="teal" mt={4} width={buttonWidth}>
              Create Post
            </Button>
          </Link>
        </Box>
      )}
      <Flex justifyContent="space-between" flexWrap="wrap">
        {user && (
          <Box width={{ base: "100%", md: "20%" }} mb={{ base: 5, md: 0 }} px={{ base: 5, md: 0 }}>
            <Heading textAlign="center" mt={2} mb={2}>
              Filter
            </Heading>
            <PostFilter onFilterChange={setPostTypeFilter} />
          </Box>
        )}
        <Box flex="1" p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.50" m={5}>
          <Posts postTypeFilter={postTypeFilter} />
        </Box>
      </Flex>
    </Box>
  );
};

export default PostDashboard;