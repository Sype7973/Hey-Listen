import React from "react";
import { Flex, Box, Heading, Text, useBreakpointValue } from "@chakra-ui/react";
import { useLocation, Link } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const { searchTerm, results } = location.state || {};
  const finalSearchTerm = searchTerm || "";

  console.log("Search Term:", finalSearchTerm);
  console.log("Search Results:", results);

  const isSmallerScreen = useBreakpointValue({ base: true, md: false });

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
      <Heading as="h1" size="xl" mb={4} color="teal.400">
        Search Results
      </Heading>
      {results && (
        <Flex flexDirection="column" alignItems="center" w="100%">
          {results.posts.length > 0 && results.users.length > 0 ? (
            <>
              {isSmallerScreen ? (
                <Box w="100%">
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
                      <Box
                        key={post._id}
                        borderWidth="1px"
                        borderColor="gray.200"
                        p={2}
                        my={2}
                        ml={4}
                      >
                         <Heading as="h3" size="md">
                            Title:
                          </Heading>
                         
                         <Link to={`/post/${post._id}`}>
                        <Heading fontSize="20px" color="teal.500">
                        {post.postTitle}
                        </Heading>
                        </Link>
                        <Heading as="h3" size="md">
                          Description:
                        </Heading>
                        {post.postDescription}

                        <Heading as="h3" size="md">
                          User:
                        </Heading>
                        <Link to={`/profile/${post.username}`}>
                          <Text
                            color="teal.500"
                            fontStyle="bold"
                            fontWeight="bold"
                          >
                            {post.username}
                          </Text>
                        </Link>
                      </Box>
                    ))}
                  </Box>

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
                      <Box
                        key={user._id}
                        borderWidth="1px"
                        borderColor="gray.200"
                        p={2}
                        my={2}
                      >
                        <Heading as="h3" size="md">
                          User:
                        </Heading>
                        <Link to={`/profile/${user.username}`}>
                          <Text
                            color="teal.500"
                            fontStyle="bold"
                            fontWeight="bold"
                          >
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
                </Box>
              ) : (
                <Flex w="80%">
                  <Box
                    borderWidth="1px"
                    borderColor="gray.200"
                    borderRadius="md"
                    shadow="md"
                    p={5}
                    my={4}
                    mr={4}
                    ml={6}
                    justifyContent={{ base: "center", md: "flex-start" }}
                  >
                    <Heading as="h2" size="lg" mb={6} color="teal.300">
                      Posts:
                    </Heading>
                    {results.posts.map((post) => (
                      <Box
                        key={post._id}
                        borderWidth="2px"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={2}
                        my={2}
                        m={4}
                        py={4}
                      >
                          <Heading as="h3" size="md">
                            Title:
                          </Heading>
                        <Link to={`/post/${post._id}`}>
                        <Heading fontSize="20px"color="teal.500">
                        {post.postTitle}
                        </Heading>
                      </Link>
                        <Heading as="h3" size="md">
                          Description:
                        </Heading>
                        {post.postDescription}

                        <Heading as="h3" size="md">
                          User:
                        </Heading>
                        <Link to={`/profile/${post.username}`}>
                          <Text
                            color="teal.500"
                            fontStyle="bold"
                            fontWeight="bold"
                          >
                            {post.username}
                          </Text>
                        </Link>
                      </Box>
                    ))}
                  </Box>

                  <Box
                    width={{ base: "100%", md: "40%" }}
                    borderWidth="2px"
                    borderColor="gray.200"
                    borderRadius="md"
                    shadow="md"
                    p={4}
                    my={4}
                    ml={6}
                  >
                    <Heading as="h2" size="lg" mb={6} color="teal.300">
                      Users:
                    </Heading>
                    {results.users.map((user) => (
                      <Box
                        key={user._id}
                        borderWidth="1px"
                        borderColor="gray.200"
                        borderRadius="md"
                        p={2}
                        py={4}
                        my={2}
                        m={4}
                      >
                        <Heading as="h3" size="md">
                          User:
                        </Heading>
                        <Link to={`/profile/${user.username}`}>
                          <Text
                            color="teal.500"
                            fontStyle="bold"
                            fontWeight="bold"
                          >
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
                </Flex>
              )}
            </>
          ) : (
            <>
              {results.posts.length > 0 && (
                <Box
                  borderColor="gray.200"
                  p={4}
                  my={4}
                  w="80%"
                >
                  <Heading as="h2" size="lg" mb={6} color="teal.300">
                    Posts:
                  </Heading>
                  {results.posts.map((post) => (
                    <Box
                      key={post._id}
                      borderWidth="2px"
                      borderColor="gray.200"
                      borderRadius="md"
                      p={2}
                      my={2}
                    >
                      <Heading as="h3" size="md">
                        Title:
                      </Heading>
                      <Link to={`/post/${post._id}`}>
                        <Heading fontSize="20px" color="teal.500">
                        {post.postTitle}
                        </Heading>
                      </Link>

                      <Heading as="h3" size="md">
                        Description:
                      </Heading>
                      {post.postDescription}
                      <Link to={`/profile/${post.username}`}>
                        <Text
                          color="teal.500"
                          fontStyle="bold"
                          fontWeight="bold"
                        >
                          {post.username}
                        </Text>
                      </Link>
                    </Box>
                  ))}
                </Box>
              )}

              {results.users.length > 0 && (
                <Box
                  borderColor="gray.200"
                  p={4}
                  my={4}
                  w="100%"
                >
                  <Heading as="h2" size="lg" mb={6} color="teal.300">
                    Users:
                  </Heading>
                  {results.users.map((user) => (
                    <Box
                      key={user._id}
                      borderWidth="2px"
                      borderColor="gray.200"
                      borderRadius="md"
                      p={2}
                      my={2}
                    >
                      <Link to={`/profile/${user.username}`}>
                        <Text
                          color="teal.500"
                          fontStyle="bold"
                          fontWeight="bold"
                        >
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