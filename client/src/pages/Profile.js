// component to render a commission into PostDashboard.js
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Text,
  Divider,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_PROFILE, GET_ME } from "../utils/queries";
import spinner from "../assets/images/spinner.gif";
import logoPng from "../assets/images/logo.png";
// function that maps and renders commissions
const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const {
    loading: meLoading,
    data: meData,
    refetch: meRefetch,
  } = useQuery(GET_ME);

  const {
    loading: usernameLoading,
    data,
    refetch: usernameRefetch,
  } = useQuery(GET_PROFILE, {
    variables: { username: username },
  });

  const [user, setUser] = useState(null);
  const [me, setMe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (me && username) {
      if (me.username === username) {
        navigate("/my-profile");
      }
    }
  }, [me, username, navigate]);

  useEffect(() => {
    console.log("Received username:", username);
  }, [username]);

  useEffect(() => {
    const handleInitialRefetch = async () => {
      await usernameRefetch();
      await meRefetch();
    };
    handleInitialRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleContactPoster = (postId, email, username) => {
    console.log(postId, email, username);
    const subject = `Hey, Listen! I'd like to get in touch!`;
    const body = `Hi ${username},\n\nI saw your profile on 'Hey, Listen!', and I'm interested in getting in touch.\n\n\n\nThanks,\n\n${me.username}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
    console.log(`Contacting the poster for post with ID: ${postId}`);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.getProfile !== null && meData && meData.me !== null) {
      setUser(data.getProfile);
      setMe(meData.me);
    }
  }, [data, meData]);

  if (isLoading || meLoading || usernameLoading) {
    return (
      <Flex
        minHeight="100vh"
        alignItems="center"
        bg="teal.500"
        direction="column"
        justifyContent="center"
      >
        <Card m="auto" width="20vw" h="20vw">
          <CardBody display="flex" alignItems="center" justifyContent="center">
            <img src={spinner} alt="loading"></img>{" "}
          </CardBody>
        </Card>
      </Flex>
    );
  }

  return (
    <Box background="teal.500">
      <Flex direction="column" justify="center" alignItems="center">
        <Flex
          my="20px"
          width="80%"
          direction="column"
          justify="center"
          alignItems="center"
          border="8px"
          borderColor="black"
        >
          <Card
            width="100%"
            h="auto"
            bg="black"
            color="teal.500"
            borderRadius="none"
          >
            <CardBody textAlign="center">
              <Flex direction="row" alignItems="center" justifyContent="center">
                <Avatar width="20%" height="auto" size="2xl" src={user ? "avatar-1.jpg" : logoPng} />
                <Flex width="60%" direction="column" textAlign="center" alignItems="center" justifyContent="center">
                  <Heading color="teal.500" letterSpacing={10} size="4xl">
                    {user.username}
                  </Heading>
                  <Text letterSpacing={5}>{user.userType}</Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>

          <Flex
            justifyContent="center"
            bg="teal.500"
            direction="row"
            width="100%"
            borderRadius="none"
          >
            <Flex
              minHeight="50vh"
              alignItems="center"
              bg="white"
              direction="column"
              width="30%"
            >
              {" "}
              <Flex
                mt={4}
                flexDir="column"
                align="center"
                w="100%"
                mb="20px"
                justifyContent="center"
              >
                <Flex
                  pt="20px"
                  flexDir="column"
                  align="center"
                  transition="0.3s ease-in-out"
                >
                  <Heading as="h3" size="sm">
                    {user ? user.username : ""}
                  </Heading>
                  <Text color="gray">{user ? user.userType : ""}</Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex w="100%">
              <Card w="100%" h="auto" borderRadius="none">
                <CardBody >
                  <Flex alignItems="center" justifyContent="center">
                    <Box w="70%" fontSize="25px">
                      <Heading fontSize="50px">Profile</Heading>
                      <Divider borderWidth="4px" borderColor="black" />
                      <Text>
                        Contact:
                        <Button
                          variant="ghost"
                          onClick={() =>
                            handleContactPoster(
                              user._id,
                              user.email,
                              user.postTitle,
                              user.username
                            )
                          }
                        >
                          {user.email}
                        </Button>
                      </Text>
                      <Divider borderWidth="0.5px" borderColor="black" />

                      <Text>Bio: {user.bio}</Text>
                      <Divider borderWidth="0.5px" borderColor="black" />

                      {user.musicLinks ? (
                        <Flex direction="column">
                          <Text fontWeight="bold">Links to music:</Text>
                          <Flex direction="column">
                            {user.musicLinks.map((link) => (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {link}
                              </a>
                            ))}
                          </Flex>
                        </Flex>
                      ) : (
                        <Text>Links to music: None</Text>
                      )}
                      <Divider borderWidth="0.5px" borderColor="black" />
                    </Box>
                  </Flex>
                </CardBody>
              </Card>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Profile;
