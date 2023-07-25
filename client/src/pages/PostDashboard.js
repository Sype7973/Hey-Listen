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
  const [userTypeFilter, setUserTypeFilter] = useState("all");
  const [postTypeFilter, setPostTypeFilter] = useState("all");

  const handleFilterChange = (userType, postType) => {
    setUserTypeFilter(userType);
    setPostTypeFilter(postType);
  };

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
      <Box width="20%">
        <PostFilter onFilterChange={handleFilterChange} />
      </Box>
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
        <Posts userTypeFilter={userTypeFilter} postTypeFilter={postTypeFilter} />
        <Box textAlign="center">
          <Link to="/create-post">
            <Button colorScheme="teal" mt={4}>
              Create Post
            </Button>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
};

export default PostDashboard;