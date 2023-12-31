import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  Box,
  Grid,
  Flex,
  Card,
  CardBody,
  Heading,
  Button,
  Text,
} from "@chakra-ui/react";
import { GET_ME, QUERY_POSTS } from "../utils/queries";
import { REMOVE_POST, UPDATE_POST } from "../utils/mutations";
import spinner from "../assets/images/spinner.gif";
import Auth from "../utils/auth";
import UpdatePostModal from "../components/UpdatePostModal";
import { Link } from "react-router-dom";

// format date function
const formatDate = (timestamp) => {
  if (timestamp) {
    const date = new Date(parseInt(timestamp));
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  }
  return "Invalid Date";
};

const MyPosts = () => {
  const { loading: meLoading, data: meData, refetch } = useQuery(GET_ME);
  const user = meData?.me || {};
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const [removePost] = useMutation(REMOVE_POST);
  const [updatePost] = useMutation(UPDATE_POST);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPostData, setSelectedPostData] = useState({
    postTitle: "",
    postDescription: "",
    postType: "",
    budget: 0,
    deadline: new Date(),
  });
  const [activePostIndex, setActivePostIndex] = useState(null);
// use effect to set loading to false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, [meData]);

  const myPosts = user.posts ? user.posts.filter((post) => post.username === loggedInUsername) : [];

// handles the remove post button
  const handleRemovePost = (postId) => {
    console.log(`Removing the post with ID: ${postId}`);
    removePost({
      variables: { postId },
      update: (cache, { data: { removePost } }) => {
        const existingPosts = cache.readQuery({ query: QUERY_POSTS });
        const updatedPosts = existingPosts.getPosts.filter((post) => post._id !== removePost._id);
        cache.writeQuery({
          query: QUERY_POSTS,
          data: { getPosts: updatedPosts },
        });
        refetch();
      },
    });
  };
  
  // handles opening the modal
  const handleOpenModal = (post) => {
  
    setSelectedPostData({
      postTitle: post.postTitle,
      postDescription: post.postDescription,
      postType: post.postType,
      budget: post.budget,
      deadline: "",
    });
    setActivePostIndex(post._id);
    setIsModalOpen(true);
  };
// handles closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActivePostIndex(null);
  };
// handles updating the post from modal
  const handleModalFormSubmit = async () => {
    console.log("Updating Post:", selectedPostData);
    try {
      const { data } = await updatePost({
        variables: {
          postId: activePostIndex,
          postTitle: selectedPostData.postTitle,
          postDescription: selectedPostData.postDescription,
          postType: selectedPostData.postType,
          budget: selectedPostData.budget,
        },
      });
      console.log("Updated Post Data:", data);
      // refetchPosts();
      handleCloseModal(); // Close the modal after updating the post
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading || meLoading) {
    return (
      <Flex minHeight="100vh" alignItems="center" bg="teal.500" direction="column" justifyContent="center">
        <Card m="auto" width="20vw" h="20vw">
          <CardBody display="flex" alignItems="center" justifyContent="center">
            <img src={spinner} alt="loading" />
          </CardBody>
        </Card>
      </Flex>
    );
  }

  console.log("MY POSTS")
  console.log(myPosts)


  return (
    <Box>
      {myPosts.length > 0 ? (
        <Flex p={5} flexDirection="column" alignItems="center">
          <Box>
          <Heading as="h2" mb={8} color="teal.400">
            My Posts
          </Heading>
          </Box>
          <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4} w="100%">
            {myPosts.map((post) => (
              <Card
                id="posts-card"
                key={post._id}
                p="4"
                border="1px"
                borderColor="gray.200"
                borderRadius="lg"
                boxShadow="lg"
                bg="gray.50"
                w="100%"
              >
                <CardBody>
                  <Heading as="h2" fontSize="2xl" fontWeight="bold" mb={4}>
                    {post.postTitle}
                  </Heading>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    Description:
                  </Text>
                  <p>{post.postDescription}</p>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    Post Type:
                  </Text>
                  <p>{post.postType}</p>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    User:
                  </Text>
                  <p>{post.username}</p>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    Budget:
                  </Text>
                  <p>${post.budget}</p>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    Deadline:
                  </Text>
                  <p>{formatDate(post.deadline)}</p>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    Created By:
                  </Text>
                  <p>{post.username}</p>
                  <Text fontSize="1.2rem" fontWeight="bold">
                    Created At:
                  </Text>
                  <p>{formatDate(post.createdAt)}</p>
                  {loggedInUsername === post.username && (
                    <>
                      <Button colorScheme="red" mt={2} onClick={() => handleRemovePost(post._id)}>
                        Remove Post
                      </Button>
                      <Button colorScheme="teal" mt={2} ml={2} onClick={() => handleOpenModal(post)}>
                        Update Post
                      </Button>
                    </>
                  )}
                </CardBody>
              </Card>
            ))}
          </Grid>
          <Box textAlign="center" mt={4}>
            {/* Create Post button that links to CreatePost page */}
            <Link to="/create-post">
              <Button colorScheme="teal">
                Create Post
              </Button>
            </Link>
          </Box>
        </Flex>
      ) : (
        <Flex p={5} flexDirection="column" alignItems="center">
          <Heading as="h2" mb={4}>
            No Posts Found
          </Heading>
          <Box textAlign="center" mt={4}>
            {/* Create Post button that links to CreatePost page */}
            <Link to="/create-post">
              <Button colorScheme="teal">
                Create Post
              </Button>
            </Link>
          </Box>
        </Flex>
      )}
      {activePostIndex !== null && (
        <UpdatePostModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          selectedPostData={selectedPostData}
          setSelectedPostData={setSelectedPostData}
          handleModalFormSubmit={handleModalFormSubmit}
        />
      )}
    </Box>
  );
};

export default MyPosts;