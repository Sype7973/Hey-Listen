import React, { useEffect, useState } from "react";
import { Box, Flex, Card, CardBody, Heading } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import spinner from "../assets/images/spinner.gif";
import Posts from "../components/Posts";

const MyPosts = () => {
  const { loading, data } = useQuery(GET_ME);

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        alignItems="center"
        bg="teal.500"
        direction="column"
        justifyContent="center"
      >
        <Card m="auto" width="40vw" h="40vw">
          <CardBody display="flex" alignItems="center" justifyContent="center">
            <img src={spinner} alt="loading" />
          </CardBody>
        </Card>
      </Flex>
    );
  }

  // Filter the user's posts into "My Posts" and "Accepted Posts"
  const myPosts = user ? user.posts.filter((post) => !post.isAccepted) : [];
  const acceptedPosts = user ? user.posts.filter((post) => post.isAccepted) : [];

  return (
    <>
      {user ? (
        <Box>
          {/* Section for "My Posts" */}
          {myPosts.length > 0 && (
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
          )}

          {/* Section for "Accepted Posts" */}
          {acceptedPosts.length > 0 ? (
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
                Accepted Posts
              </Heading>
              <Posts posts={acceptedPosts} />
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
                No Accepted Posts
              </Heading>
            </Flex>
          )}
        </Box>
      ) : (
        <Flex
          minHeight="100vh"
          alignItems="center"
          bg="teal.500"
          direction="column"
          justifyContent="center"
        >
          <Card m="auto" width="40vw" h="40vw">
            <CardBody display="flex" alignItems="center" justifyContent="center">
              <img src={spinner} alt="loading" />
            </CardBody>
          </Card>
        </Flex>
      )}
    </>
  );
};

export default MyPosts;