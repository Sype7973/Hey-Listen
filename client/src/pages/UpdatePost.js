// Update post page that allows user to update their post
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
import { UPDATE_POST } from "../utils/mutations";
import { useParams } from "react-router-dom";
import { GET_ME } from "../utils/queries";


const UpdatePost = () => {
    const [formData, setFormData] = useState({
      postTitle: "",
      postType: "",
      postDescription: "",
      budget: 0, // Default value for the slider
      deadline: "",
    });
  
    const { id: postId } = useParams();
    const [updatePost, { error }] = useMutation(UPDATE_POST);
    const { data } = useQuery(GET_ME);
    const [user, setUser] = useState(null);
  
    useEffect(() => {
      if (data) {
        setUser(data.me);
        // Populate the form data with the existing post data from the user
        if (data.me && data.me.post) {
          setFormData({
            postTitle: data.me.post.postTitle,
            postType: data.me.post.postType,
            postDescription: data.me.post.postDescription,
            budget: data.me.post.budget,
            deadline: data.me.post.deadline,
          });
        }
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

   

    console.log(`Post ID: ${postId}`);

    const [selectedPostType, setSelectedPostType] = useState(postTypeOptions[0]);

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
          const { data } = await updatePost({
            variables: { ...formData, postId }, // Make sure postId is included in the variables
          });
      
          console.log("Data after update:", data);
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

export default UpdatePost;