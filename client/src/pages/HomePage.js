import React from 'react';
import {
  Button,
  Flex,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';

const HomePage = () => {
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
          Make music with everyone
        </Text>
        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => {
            window.location.href = '/signup';
            }}
        >
          Get Started
        </Button>
      </VStack>
    </Flex>
  );
};

export default HomePage;