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
  useBreakpointValue,
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { GET_PROFILE, GET_ME } from "../utils/queries";
import spinner from "../assets/images/spinner.gif";
import ArtistPng from "../assets/images/Artist.png";
import ProducerPng from "../assets/images/Producer.png";
import ReactPlayer from "react-player";
// function that maps and renders commissions
const Profile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  // loading queries
  const {
    loading: usernameLoading,
    data,
    refetch: usernameRefetch,
  } = useQuery(GET_PROFILE, {
    variables: { username: username },
  });
  const {
    loading: meLoading,
    data: meData,
    refetch: meRefetch,
  } = useQuery(GET_ME);
  const [user, setUser] = useState(null);
  const [me, setMe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // use effect to check if user is logged in
  useEffect(() => {
    if (me && me.username && username) {
      if (me.username === username) {
        navigate("/my-profile");
      }
    }
  }, [me, username, navigate]);
  //  use effect to console log username
  useEffect(() => {
    console.log("Received username:", username);
  }, [username]);
  // use effect to refetch username and me
  useEffect(() => {
    const handleInitialRefetch = async () => {
      await usernameRefetch();
      await meRefetch();
    };
    handleInitialRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // handles contact poster button
  const handleContactPoster = (postId, email) => {
    if (me && me.username) {
      const subject = `Hey! Listen! I'd like to get in touch!`;
      const body = `Hi ${username},\n\nI saw your profile on 'Hey, Listen!', and I'm interested in getting in touch.\n\n\n\nThanks,\n\n${me.username}`;
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, "_blank");
      console.log(`Contacting the poster for post with ID: ${postId}`);
    } else {
      const subject = `Hey! Listen! I'd like to get in touch!`;
      const body = `Hi ${user.username},\n\nI saw your profile on 'Hey, Listen!', and I'm interested in getting in touch.\n\n\n\nThanks!`;
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, "_blank");
    }
  };
  // use effect to set loading to false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.getProfile !== null) {
      setUser(data.getProfile);
    }

    if (meData && meData.me !== null) {
      setMe(meData.me);
    }
  }, [data, meData]);

  const headingSize = useBreakpointValue({
    base: "xl",
    md: "2xl",
    lg: "3xl",
    xl: "4xl",
  });
  const textSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "2xl",
    xl: "3xl",
  });

  console.log(user);
  // loading statement before rendering
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
          width="90%"
          direction="column"
          justify="center"
          alignItems="center"
          borderColor="black"
          borderRadius="md"
          shadow="md"
        >
          <Card width="100%" h="auto" bg="black" color="teal.500">
            <CardBody textAlign="center">
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                {user && user.userType === "Producer" ? (
                  <Avatar
                    width="10%"
                    height="auto"
                    size="2xl"
                    src={user ? ProducerPng : ProducerPng}
                  />
                ) : (
                  <Avatar
                    width="10%"
                    height="auto"
                    size="2xl"
                    src={user ? ArtistPng : ArtistPng}
                  />
                )}
                <Flex
                  width="60%"
                  direction="column"
                  textAlign="center"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Heading
                    color="teal.500"
                    letterSpacing={10}
                    size="4xl"
                    fontSize={textSize}
                  >
                    {user.username}
                  </Heading>
                  <Text fontSize={headingSize} letterSpacing={5}>
                    {user.userType}
                  </Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>

          <Flex
            justifyContent="center"
            bg="teal.500"
            direction="row"
            width="100%"
            borderRadius="md"
          >
            <Flex
              minHeight="50vh"
              alignItems="center"
              bg="white"
              direction="column"
              width="30%"
              borderRadius="md"
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
                  <Heading fontSize={textSize} as="h3" size="sm">
                    {user ? user.username : ""}
                  </Heading>
                  <Text fontSize={textSize} color="gray">
                    {user ? user.userType : ""}
                  </Text>
                </Flex>
              </Flex>
            </Flex>
            <Flex w="100%">
              <Card w="100%" h="auto" borderRadius="md">
                <CardBody>
                  <Flex alignItems="center" justifyContent="center">
                    <Box w="70%" fontSize="25px">
                      <Heading fontSize={headingSize}>Profile</Heading>
                      <Divider borderWidth="4px" borderColor="black" />
                      <Text fontSize={textSize}>
                        Contact:
                        <Button
                          fontSize={textSize}
                          mb={1}
                          variant="ghost"
                          onClick={() =>
                            handleContactPoster(user.email, user.postTitle)
                          }
                        >
                          {user.email}
                        </Button>
                      </Text>
                      <Divider borderWidth="0.5px" borderColor="black" />

                      <Text fontWeight="bold" fontSize={textSize}>
                        Bio:{" "}
                      </Text>
                      <Text fontSize={textSize}>{user.bio}</Text>
                      <Divider borderWidth="0.5px" borderColor="black" />

                      {user.musicLinks ? (
                        <Flex direction="column">
                          <Text fontWeight="bold" fontSize={textSize}>
                            Links to music:
                          </Text>
                          <Flex direction="column">
                            {user.musicLinks.map((link) => (
                              <ReactPlayer
                                height="40%"
                                width="100%"
                                url={link}
                              />
                            ))}
                          </Flex>
                        </Flex>
                      ) : (
                        <Text fontSize={textSize}>Links to music: None</Text>
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
