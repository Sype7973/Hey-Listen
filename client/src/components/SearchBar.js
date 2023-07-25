import React, { useState } from "react";
import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USERS, QUERY_POSTS } from "../utils/queries";
import { useNavigate } from "react-router-dom"; // Correct import for useNavigate
import Auth from "../utils/auth";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: userData } = useQuery(GET_USERS);
  const { data: postData } = useQuery(QUERY_POSTS);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const postResults =
      postData?.getPosts?.filter((post) =>
        post.postTitle.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 15) || [];

    const userResults =
      userData?.getUsers?.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 15) || [];

    navigate("/search", { state: { searchTerm, results: { posts: postResults, users: userResults } } });
  };

  if (!Auth.loggedIn()) {
    return null;
  }
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
      <Text fontSize="3xl" fontWeight="bold">
        Search for posts or users
      </Text>
      <form onSubmit={handleSearch}>
        <Input
          type="text"
          name="search"
          placeholder="Search"
          onChange={handleChange}
          value={searchTerm}
          size="lg"
          w="50%"
          m={5}
        />
        <Button type="submit" colorScheme="teal" size="lg">
          Search
        </Button>
      </form>
    </Flex>
  );
};

export default SearchBar;