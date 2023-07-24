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
import { QUERY_POST } from "../utils/queries";

// takes the post id from the url
// prefills the form with the post data
// allows user to update the post
const UpdatePost = () => {
    const [formData, setFormData] = useState({
        postTitle: "",
        postType: "",
        postDescription: "",
        budget: 0, // Default value for the slider
        deadline: "",
    });

    const [updatePost, { error }] = useMutation(UPDATE_POST);
    const { data } = useQuery(QUERY_POST);
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

    const [selectedPostType, setSelectedPostType] = useState("");

    const [selectedDeadline, setSelectedDeadline] = useState(new Date());

    const [selectedBudget, setSelectedBudget] = useState(0);

    const [selectedPostTitle, setSelectedPostTitle] = useState("");

    const [selectedPostDescription, setSelectedPostDescription] = useState("");

    const [selectedPostId, setSelectedPostId] = useState("");

    const { postId } = useParams();

    useEffect(() => {
        if (data) {
            setSelectedPostId(data.postId);
            setSelectedPostTitle(data.postTitle);
            setSelectedPostDescription(data.postDescription);
            setSelectedPostType(data.postType);
            setSelectedBudget(data.budget);
            setSelectedDeadline(data.deadline);
        }
    }, [data]);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await updatePost({
                variables: {
                    postId: selectedPostId,
                    postTitle: selectedPostTitle,
                    postDescription: selectedPostDescription,
                    postType: selectedPostType,
                    budget: selectedBudget,
                    deadline: selectedDeadline,
                },
            });
            console.log(data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Flex justifyContent="center" alignItems="center" height="100vh">
            <Box
                p={8}
                maxWidth="500px"
                borderWidth={1}
                borderRadius={8}
                boxShadow="lg"
            >
                <Box textAlign="center">
                    <Heading>Update Post</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleFormSubmit}>
                        <FormControl>
                            <FormLabel>Post Title</FormLabel>
                            <Input
                                placeholder="Post Title"
                                value={selectedPostTitle}
                                onChange={(e) => setSelectedPostTitle(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Post Description</FormLabel>
                            <Input
                                placeholder="Post Description"
                                value={selectedPostDescription}
                                onChange={(e) =>
                                    setSelectedPostDescription(e.target.value)
                                }
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Post Type</FormLabel>
                            <Select
                                placeholder="Select Post Type"
                                value={selectedPostType}
                                onChange={(e) => setSelectedPostType(e.target.value)}
                            >
                                {postTypeOptions.map((postType) => (
                                    <option key={postType} value={postType}>
                                        {postType}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Budget</FormLabel>
                            <Slider
                                aria-label="slider-ex-1"
                                defaultValue={selectedBudget}
                                onChange={(value) => setSelectedBudget(value)}
                            >
                                <SliderTrack>
                                    <SliderFilledTrack />
                                </SliderTrack>
                                <SliderThumb />
                            </Slider>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Deadline</FormLabel>
                            <DatePicker
                                selected={selectedDeadline}
                                onChange={(date) => setSelectedDeadline(date)}
                            />
                        </FormControl>

                        <Button
                            width="full"
                            mt={4}
                            type="submit"
                            colorScheme="teal"
                            isLoading={false}
                        >
                            Update Post
                        </Button>
                    </form>
                </Box>
            </Box>
        </Flex>
    );
};

export default UpdatePost;