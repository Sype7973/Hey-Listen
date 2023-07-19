import React, { useState } from "react";
import Auth from "../utils/auth";
import { Link } from "react-router-dom";
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../utils/mutations";
import { FormControl, FormLabel, Input, Button, Alert, AlertIcon, Box } from "@chakra-ui/react";

function LoginForm() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  return (
    <Box 
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box 
        p={4} 
        borderWidth={1} 
        borderRadius="md" 
        boxShadow="lg" 
        display="flex" 
        flexDirection="column"
        alignItems="center"
      >
        <form onSubmit={handleFormSubmit}>
          <FormControl id="email" mt={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formState.email}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl id="password" mt={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formState.password}
              onChange={handleChange}
            />
          </FormControl>
          <Button colorScheme="teal" type="submit" mt={4} w="100%">
            Login
          </Button>
          {error && (
            <Alert status="error" mt={4}>
              <AlertIcon />
              {error.message}
            </Alert>
          )}
        </form>

        <Button 
          as={Link}
          to="/signup"
          colorScheme="teal"
          mt={4}
        >
          Go to Signup
        </Button>
      </Box>
    </Box>
  );
}

export default LoginForm;