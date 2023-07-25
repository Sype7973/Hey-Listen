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
  Select,
  Card,
  CardBody,
  Heading,
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

  const postTypeOptions = [
    "Need Artist",
    "Need Producer",
    "Need Sample",
    "Need Mixing",
    "Need Mastering",
    "Need Vocals",
    "Need Guitarist",
    "Need Bassist",
    "Need Drummer",
    "Need Pianist",
    "Need Synth",
    "Need Other",
  ];


  const [addPost, { error }] = useMutation(ADD_POST);
  const { data } = useQuery(GET_ME);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (data) {
      setUser(data.me);
    }
  }, [data]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);


  const [selectedPostType, setSelectedPostType] = useState("");

  const handlePostTypeChange = (e) => {
    setSelectedPostType(e.target.value);
  };

  const handleAddCustomPostType = () => {
    setShowCustomPostTypeInput(true);
  };

  const [showCustomPostTypeInput, setShowCustomPostTypeInput] = useState(false);
  const [customPostType, setCustomPostType] = useState("");

  const handleCustomPostTypeChange = (e) => {
    setCustomPostType(e.target.value);
  };

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
          postType: showCustomPostTypeInput ? customPostType : selectedPostType,
          postDescription: formData.postDescription,
          budget: formData.budget,
          deadline: formData.deadline,
          userId: user._id,
          username: username,
          email: user.email,
        },
      });
      console.log(formData.deadline);
      console.log(data);
      window.location.replace("/post-dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    {user ? (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="md" bg="gray.50" w="1000px">
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
              <Select
                name="postType"
                placeholder="Post Type"
                value={selectedPostType}
                onChange={handlePostTypeChange}
              >
                {postTypeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
              <Button colorScheme="teal" size="sm" onClick={handleAddCustomPostType} ml={2}>
                Add Custom
              </Button>
              {showCustomPostTypeInput && (
                <Input
                  type="text"
                  name="customPostType"
                  placeholder="Enter Custom Post Type"
                  value={customPostType}
                  onChange={handleCustomPostTypeChange}
                  mt={2}
                />
              )}
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
    ) : (
      <Flex minHeight="100vh" alignItems="center" bg="teal.500" direction="column">
        <Card my="auto" width="auto" h="auto">
          <CardBody textAlign="center">
            <Heading>Not Logged In!</Heading>
          </CardBody>
        </Card>
      </Flex>
    )}
  </>
);
};

export default CreatePost;