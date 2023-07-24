import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const { searchTerm, results } = location.state || {};

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
          {results.posts.length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={4}>
                Posts:
              </Heading>
              {results.posts.map((post) => (
                <Text key={post._id} fontSize="lg" mb={2}>
                  {post.postTitle} - {post.username}
                </Text>
              ))}
            </>
          )}

          {results.users.length > 0 && (
            <>
              <Heading as="h2" size="lg" mt={4}>
                Users:
              </Heading>
              {results.users.map((user) => (
                <Text key={user._id} fontSize="lg" mb={2}>
                  {user.username} - {user.email}
                </Text>
              ))}
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