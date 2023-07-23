import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Grid, Flex, Card, CardBody, Heading, Button, Center } from "@chakra-ui/react";
import { GET_ME, QUERY_POSTS } from "../utils/queries";
import { REMOVE_POST } from "../utils/mutations";
import spinner from "../assets/images/spinner.gif";
import Auth from "../utils/auth";

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
  const { loading: meLoading, data: meData } = useQuery(GET_ME);
  const { loading: postsLoading, data: postsData, refetch: refetchPosts } = useQuery(QUERY_POSTS);
  const user = meData?.me || {};
  const loggedInUsername = Auth.loggedIn() ? Auth.getProfile().data.username : null;
  const [removePost, { error }] = useMutation(REMOVE_POST);

  if (meLoading || postsLoading) {
    return <img src={spinner} alt="loading" />;
  }

  console.log("User Data:", user);
  console.log("Logged In Username:", loggedInUsername);

  // Filter the user's posts into "My Posts" (Posts belonging to the logged-in user)
  const myPosts = user.posts ? user.posts.filter((post) => post.username === loggedInUsername) : [];

  console.log("My Posts:", myPosts);

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
      },
    });
  };

  return (
    <Box>
      {myPosts.length > 0 ? (
        <Flex p={5} flexDirection="column" alignItems="center">
          <Heading as="h2" mb={4}>
            My Posts
          </Heading>
          <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={4} w="100%">
            {myPosts.map((post) => (
              <Card key={post._id} p="4" border="1px" borderColor="gray.200" borderRadius="lg" boxShadow="lg" bg="gray.50" w="100%">
                <CardBody>
                  <Heading as="h2" fontSize="2xl">
                    {post.postTitle}
                  </Heading>
                  <p>Description: {post.postDescription}</p>
                  <p>Post Type: {post.postType}</p>
                  <p>User: {post.username}</p>
                  <p>Budget: ${post.budget}</p>
                  <p>Deadline: {formatDate(post.deadline)}</p>
                  <p>Created By: {post.username}</p>
                  <p>Created At: {formatDate(post.createdAt)}</p>
                  {loggedInUsername === post.username && (
                    <Button colorScheme="red" mt={2} onClick={() => handleRemovePost(post._id)}>
                      Remove Post
                    </Button>
                  )}
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Flex>
      ) : (
        <Flex p={5} shadow="md" borderWidth="1px" flex="1" borderRadius="md" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" bg="gray.50" m={5}>
          <Heading as="h2" mb={4}>
            No Posts Found
          </Heading>
        </Flex>
      )}
    </Box>
  );
};

export default MyPosts;