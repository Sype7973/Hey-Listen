import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADD_POST } from "../utils/mutations";
import { GET_ME } from "../utils/queries";
import Auth from "../utils/auth";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    postType: "",
    postDescription: "",
    budget: 0, // Default value for the slider
    deadline: "",
  });

  const [addPost, { error }] = useMutation(ADD_POST);
  //  get user data from me query
  const { data } = useQuery(GET_ME);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data]);
  console.log(data);
  console.log(user);

  const [username, setUsername] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);
  console.log(username);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSliderChange = (value) => {
    setFormData({ ...formData, budget: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, deadline: date });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!Auth.loggedIn()) {
        throw new Error("You must be logged in to create a post!");
      }
      const { data } = await addPost({
        variables: {
          postTitle: formData.postTitle,
          postType: formData.postType,
          postDescription: formData.postDescription,
          budget: formData.budget,
          deadline: formData.deadline,
          userId: user._id,
          username: username,
        },
      });
      console.log(username);
      console.log(data);
      window.location.replace("/post-dashboard");

    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        bg="gray.50"
        w="1000px"
      >
        <Box>
          <h2>Create a Post</h2>
          <form onSubmit={handleFormSubmit}>
            <FormControl id="postTitle" marginBottom="1rem">
              <FormLabel>Post Title</FormLabel>
              <Input
                type="text"
                name="postTitle"
                placeholder="Post Title"
                value={formData.postTitle}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="postType" marginBottom="1rem">
              <FormLabel>Post Type</FormLabel>
              <Input
                type="text"
                name="postType"
                placeholder="Post Type"
                value={formData.postType}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="postDescription" marginBottom="1rem">
              <FormLabel>Post Description</FormLabel>
              <Input
                type="text"
                name="postDescription"
                placeholder="Post Description"
                value={formData.postDescription}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="budget" marginBottom="1rem">
              <FormLabel>Budget</FormLabel>
              <Slider
                value={formData.budget}
                min={0}
                max={1000}
                step={1}
                focusThumbOnChange={false}
                onChange={handleSliderChange}
                colorScheme="pink"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl id="deadline" marginBottom="1rem">
              <FormLabel>Deadline</FormLabel>
              <DatePicker
                selected={formData.deadline}
                onChange={handleDateChange}
                dateFormat="dd/MM/yy"
                placeholderText="Select a deadline"
                minDate={new Date()} // Optional: To set the minimum date available for selection
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" mt={4}>
              Submit
            </Button>
          </form>
          {error && (
            <Box mt={4} color="red.500">
              Something went wrong...
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default CreatePost;
