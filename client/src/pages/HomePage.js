import React, { useEffect, useState } from 'react';
import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GET_ME } from "../utils/queries";
import { useQuery } from '@apollo/client';

const HomePage = () => {
  const [user, setUser] = useState(null); 

  const { data } = useQuery(GET_ME);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (data.me) {
          setUser(data.me);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      }
    };
    fetchUserProfile();
  }, [data]);

  return (
    <Flex
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      bg="teal.500"
    >
      <VStack spacing={4} textAlign="center">
        <Heading as="h1" size="xl" color="white">
          Hey Listen!
        </Heading>
        <Text fontSize="xl" color="white">
          Make music with everyone{user ? `, ${user.username}` : ''}
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => {
            if (data) {
              window.location.href = '/post';
            } else {
              window.location.href = '/signup';
            }
          }}
        >
          Get Started
        </Button>
      </VStack>
    </Flex>
  );
};

export default HomePage;