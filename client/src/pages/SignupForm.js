import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  FormControl,
  FormLabel,
  Textarea,
  Select,
  InputRightElement,
  InputGroup,
  useToast,
  Spinner,
} from "@chakra-ui/react";

function Signup() {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    userType: "",
    musicLinks: [],
    profilePicture: "",
    bio: "",
  });

  const toast = useToast();

  const [loggingIn, setLoggingIn] = useState(false);
  const [addUser, { error }] = useMutation(ADD_USER);
// handles form submit for signup
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const handleToast = () => {
      toast({
        title: "Account created.",
        description: "Logging you in...",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    };
    setLoggingIn(true);
    try {
      const { data } = await addUser({
        variables: {
          username: formState.username,
          email: formState.email,
          password: formState.password,
          userType: formState.userType,
          musicLinks: formState.musicLinks,
          profilePicture: formState.profilePicture,
          bio: formState.bio,
        },
      });
      handleToast();
      setTimeout(() => {
        Auth.login(data.addUser.token);
      }, 3000);
    } catch (e) {
      console.error(e);
    }
  };
// handles form change for signup
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };
// handles music links change for signup
  const handleMusicLinksChange = (event, index) => {
    const { value } = event.target;
    const updatedLinks = [...formState.musicLinks];
    updatedLinks[index] = value;
    setFormState({ ...formState, musicLinks: updatedLinks });
  };
// handles adding music links for signup
  const handleAddLink = () => {
    setFormState({ ...formState, musicLinks: [...formState.musicLinks, ""] });
  };
// handles removing music links for signup
  const handleRemoveLink = (index) => {
    const updatedLinks = [...formState.musicLinks];
    updatedLinks.splice(index, 1);
    setFormState({ ...formState, musicLinks: updatedLinks });
  };
// future dev for profile picture
  const handleProfilePictureChange = (event) => {
    // Handle the profile picture upload here (e.g., using FileReader or FormData)
  };

  return (
    <Flex
      flexDirection="column"
      width="100%"
      minHeight="100vh"
      backgroundColor="gray.100"
      justifyContent="center"
      alignItems="center"
      pt={8}
      pb={8}
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Heading color="teal.400" fontSize={['xl', '2xl', '3xl']}>Sign Up</Heading>
        <Text fontSize={["md", 'lg', 'xl']} color="gray.600">
          To start making music ✌️
        </Text>
      </Stack>
      <Box
        p={8}
        maxWidth="500px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <Stack
          spacing={4}
          p={4}
          backgroundColor="whiteAlpha.900"
          boxShadow="md"
        >
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formState.username}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="userType">
            <FormLabel>User Type</FormLabel>
            <Select
              name="userType"
              placeholder="Select user type"
              value={formState.userType}
              onChange={handleChange}
            >
              <option value="Producer">Producer</option>
              <option value="Artist">Artist</option>
            </Select>
          </FormControl>
          <FormControl id="musicLinks">
            <FormLabel>Music Links</FormLabel>
            {formState.musicLinks.map((link, index) => (
              <InputGroup key={index}>
                <Input
                  type="text"
                  name="musicLinks"
                  placeholder="Enter a music link"
                  value={link}
                  onChange={(event) => handleMusicLinksChange(event, index)}
                />
                <InputRightElement width="4.5rem">
                  <Button size="sm" onClick={() => handleRemoveLink(index)}>
                    Remove
                  </Button>
                </InputRightElement>
              </InputGroup>
            ))}
            <Button mt={2} size="sm" onClick={handleAddLink}>
              Add Music Link
            </Button>
          </FormControl>
          <FormControl id="profilePicture">
            <FormLabel>Profile Picture</FormLabel>
            <Input
              type="file"
              name="profilePicture"
              onChange={handleProfilePictureChange}
            />
          </FormControl>
          <FormControl id="bio">
            <FormLabel>Bio</FormLabel>
            <Textarea
              name="bio"
              placeholder="Enter your bio"
              value={formState.bio}
              onChange={handleChange}
            />
          </FormControl>
          {loggingIn ? (
            <Flex justifyContent="center" alignItems="center ">
              <Spinner color="teal.500" size="xl" />
            </Flex>
          ) : null}
          <Button colorScheme="teal" type="submit" onClick={handleFormSubmit}>
            Sign Up
          </Button>
          {error && <Text color="red.500">{error.message}</Text>}
        </Stack>
      </Box>
    </Flex>
  );
}

export default Signup;
