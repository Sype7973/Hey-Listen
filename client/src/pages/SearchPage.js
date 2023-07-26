import React from "react";
import { Flex, Box, Grid, GridItem, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const { searchTerm, results } = location.state || {};
  const finalSearchTerm = searchTerm || "";

  console.log("Search Term:", finalSearchTerm);
  console.log("Search Results:", results);


  return (
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
      <Heading as="h1" size="xl" mb={4}>
        Search Results
      </Heading>
      {results && (
        <Flex flexDirection="column" alignItems="center">
          {results.posts.length > 0 && results.users.length > 0 ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={4} w="80%">
              <GridItem>
                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  my={4}
                >
                  <Heading as="h2" size="lg" mb={2}>
                    Posts:
                  </Heading>
                  {results.posts.map((post) => (
                    <Box key={post._id} borderWidth="1px" borderColor="gray.200" p={2} my={2}>
                      <Link to={`/post/${post._id}`}>
                      <Heading as="h3" size="md" color="teal.500">
                        Title:
                      </Heading>
                      </Link>
                      {post.postTitle}

                      <Heading as="h3" size="md">
                        Description:
                      </Heading>
                      {post.postDescription}

                      <Heading as="h3" size="md">
                        User:
                      </Heading>
                      <Link to={`/profile/${post.username}`}>
                        <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                          {post.username}
                        </Text>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </GridItem>

              <GridItem>
                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  my={4}
                >
                  <Heading as="h2" size="lg" mb={2}>
                    Users:
                  </Heading>
                  {results.users.map((user) => (
                    <Box key={user._id} borderWidth="1px" borderColor="gray.200" p={2} my={2}>
                      <Heading as="h3" size="md">
                        User:
                      </Heading>
                      <Link to={`/profile/${user.username}`}>
                        <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                          {user.username}
                        </Text>
                      </Link>{" "}
                      <Heading as="h3" size="md">
                        Email:
                      </Heading>
                      {user.email}
                      <Heading as="h3" size="md">
                        Stats:
                      </Heading>
                      <Text>{user.posts.length} Posts</Text>
                      <Text>{user.commissionIds.length} commissions</Text>
                      <Text>{user.userType}</Text>
                    </Box>
                  ))}
                </Box>
              </GridItem>
            </Grid>
          ) : (
            <>
              {results.posts.length > 0 && (
                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  my={4}
                  w="80%"
                >
                  <Heading as="h2" size="lg" mb={2}>
                    Posts:
                  </Heading>
                  {results.posts.map((post) => (
                    <Box key={post._id} borderWidth="1px" borderColor="gray.200" p={2} my={2}>
                      <Heading as="h3" size="md">
                        Title:
                      </Heading>
                      {post.postTitle}
                      <Heading as="h3" size="md">
                        Description:
                      </Heading>
                      {post.postDescription}
                      <Link to={`/profile/${post.username}`}>
                        <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                          {post.username}
                        </Text>
                      </Link>
                    </Box>
                  ))}
                </Box>
              )}

              {results.users.length > 0 && (
                <Box
                  borderWidth="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  p={4}
                  my={4}
                  w="100%"
                >
                  <Heading as="h2" size="lg" mb={2}>
                    Users:
                  </Heading>
                  {results.users.map((user) => (
                    <Box key={user._id} borderWidth="1px" borderColor="gray.200" p={2} my={2}>
                      <Link to={`/profile/${user.username}`}>
                        <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                          {user.username}
                        </Text>
                      </Link>{" "}
                      <Heading as="h3" size="md">
                        Email:
                      </Heading>
                      {user.email}
                      <Heading as="h3" size="md">
                        Stats:
                      </Heading>
                      <Text>{user.posts.length} posts</Text>
                      <Text>{user.commissionIds.length} commissions</Text>
                      <Text>{user.userType}</Text>
                    </Box>
                  ))}
                </Box>
              )}
            </>
          )}

          {results.posts.length === 0 && results.users.length === 0 && (
            <Text>No results found.</Text>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default SearchPage;