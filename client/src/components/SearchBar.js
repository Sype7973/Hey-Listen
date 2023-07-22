// searchbar component at the top of the page
// searches for posts by title or searches for users by username
import React, { useState } from "react";
import {  Flex, Input, Button, Text } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USERS, QUERY_POSTS } from "../utils/queries";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const { data } = useQuery(GET_USERS);
    const { data: postData } = useQuery(QUERY_POSTS);
    const history = useNavigate();
    
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };
    

    const handleSearch = (event) => {
        event.preventDefault();
        
        // Use optional chaining to safely access the "posts" property
        const results = postData?.posts?.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        ) || [];
        
        setSearchResults(results);
        history.push({
          pathname: "/post",
          state: { results: results },
        });
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
    }

export default SearchBar;
