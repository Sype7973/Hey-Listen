// Individual post page when a user clicks on a post from search results
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  Divider,
  useToast,
  Spinner,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POST, GET_ME, GET_USER } from "../utils/queries";
import { ACCEPT_POST } from "../utils/mutations";


const Post = () => {
  const { id: postId } = useParams();;
  const [loading, setLoading] = useState(true);
  const { data: postData, loading: postLoading } = useQuery(QUERY_POST, {
    variables: { id: postId },
  });
  const { data: userData, loading: userLoading } = useQuery(GET_USER, {
    variables: { id: postData?.getPost.userId },
  });
  const { data: meData, loading: meLoading } = useQuery(GET_ME);
  const [acceptPost] = useMutation(ACCEPT_POST);
  const toast = useToast();
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const [isLargerThan1280] = useMediaQuery("(min-width: 1280px)");
  const [isLargerThan1440] = useMediaQuery("(min-width: 1440px)");
  const [isLargerThan1920] = useMediaQuery("(min-width: 1920px)");

  useEffect(() => {
    if (!postLoading && postData?.getPost) {
      setLoading(false);
    }
  }, [postLoading, postData]);

// uses the ACCEPT_POST mutation to accept a post (BROKEN)
const handleAcceptPost = async (postId) => {
    if (!meData || !postData) {
        console.error("User or post data not available!");
        return;
        }
        const post = postData.getPost;
        const me = meData.me;

        try {
            await acceptPost({
                variables: { postId },
            });
            toast({
                title: "Post accepted.",
                status: "success",
                duration: 9000,
                isClosable: true,
                position: "top",
            });
        } catch (err) {
            console.error(err);
            toast({
                title: "Something went wrong.",
                description: "Unable to accept post.",
                status: "error",
                duration: 9000,
                isClosable: true,
                position: "top",
            });
        }
    };

// handles contact poster (BROKEN)
    const handleContactPoster = () => {
        if (meLoading || postLoading || userLoading) {
          console.log("Loading user or post data...");
          return;
        }
      
        if (!meData || !postData || !userData || !userData.getUser) {
          console.error("User or post data not available!");
          return;
        }
      
        const post = postData.getPost;
        const me = meData.me;
        const posterEmail = userData.getUser.email;
      
        const subject = `I'm interested in your post: ${post.postTitle}`;
        const body = `Hi ${post.username},\n\nI'm interested in: ${post.postTitle}.\n\nPlease let me know if it's still available.\n\nThanks,\n\n${me.username}`;
        const mailtoLink = `mailto:${posterEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink, "_blank");
      };

  if (loading || postLoading || meLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  const formatDateForm = (timestamp) => {
    if (timestamp) {
      const date = new Date(parseInt(timestamp));
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = String(date.getFullYear()).slice(-2);
      return `${year}/${month}/${day}`;
    }
    return "Invalid Date";
  };

  const post = postData.getPost;
  const me = meData.me;

  return (
    <Box>
      <Flex justifyContent="center" alignItems="center" height="100vh" bg="gray.100">
        <Box
          width={
            isLargerThan1920
              ? "60vw"
              : isLargerThan1440
              ? "70vw"
              : isLargerThan1280
              ? "80vw"
              : isLargerThan768
              ? "90vw"
              : "95vw"
          }
          bg="white"
          p={isLargerThan768 ? 10 : 5}
          borderRadius={10}
          boxShadow="lg"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h1" size="xl">
              {post.postTitle}
            </Heading>
            <Text fontSize="xl" fontWeight="bold">
              ${post.budget}
            </Text>
          </Flex>
          <Divider my={5} />
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <Avatar
                size="md"
                name={post.username}
                src={`https://avatars.dicebear.com/api/identicon/${post.username}.svg`}
                mr={3}
              />
              <Flex direction="column">
                <Link to={`/profile/${post.username}`}>
                  <Text fontSize="xl" fontWeight="bold">
                    {post.username}
                  </Text>
                </Link>
                <Text fontSize="md" fontWeight="bold">
                  {post.postType}
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="md" fontWeight="bold">
              {formatDateForm(post.deadline)}
            </Text>
          </Flex>
          <Divider my={5} />
          <Text fontSize="xl" fontWeight="bold">
            Description
          </Text>
          <Text fontSize="md">{post.postDescription}</Text>
          <Divider my={5} />
          <Text fontSize="xl" fontWeight="bold">
            Post Type
          </Text>
          <Text fontSize="md">{post.postType}</Text>
          <Divider my={5} />
          <Text fontSize="xl" fontWeight="bold">
            Deadline
          </Text>
          <Text fontSize="md">{formatDateForm(post.deadline)}</Text>
          <Divider my={5} />
          <Text fontSize="xl" fontWeight="bold">
            Budget
          </Text>
          <Text fontSize="md">${post.budget}</Text>
          <Divider my={5} />
          {me && post && me.username !== post.username && (
            <Flex justify="center" mt={5}>
              <Button colorScheme="teal" size="lg" mr={3} onClick={handleAcceptPost}>
                Accept Post
              </Button>
              <Button size="lg" ml={3} onClick={handleContactPoster}>
                Contact Poster
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default Post;