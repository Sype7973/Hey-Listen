// component to render a commission into PostDashboard.js
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Text,
  Divider,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { GET_ME, GET_COMMISSIONS } from "../utils/queries";
import { MdSettings } from "react-icons/md";

import Commissions from "./Commission";
import spinner from "../assets/images/spinner.gif";
import { UPDATE_COMMISSION, DELETE_COMMISSION } from "../utils/mutations";
// import MyPosts from "./MyPosts";
import ReactPlayer from "react-player";

// function that maps and renders commissions
const MyProfile = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [deleteCommission] = useMutation(DELETE_COMMISSION);

  const {
    loading: commissionLoading,
    data: commissionData,
    refetch: refetchData,
  } = useQuery(GET_COMMISSIONS);

  const [user, setUser] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateCommission, { error }] = useMutation(UPDATE_COMMISSION);

  const [activeCommissions, setActiveCommissions] = useState([]);
  const [completedCommissions, setCompletedCommissions] = useState([]);

  //  Chakra UI breakpoints
  const headingSize = useBreakpointValue({
    base: "lg",
    md: "xl",
    lg: "1xl",
    xl: "2xl",
  });
  const textSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "2xl",
    xl: "3xl",
  });
  const bioTextSize = useBreakpointValue({
    base: "sm",
    md: "md",
    lg: "2xl",
    xl: "3xl",
  });
  const largeScreen = useBreakpointValue({ base: false, lg: true });
  const mediumScreen = useBreakpointValue({ base: false, md: true });
  const settingsSize = useBreakpointValue({
    base: "30px",
    md: "50px",
    lg: "50px",
    xl: "50px",
  });
  const userSize = useBreakpointValue({
    base: "30px",
    md: "50px",
    lg: "50px",
    xl: "50px",
  });

  const videoSize = useBreakpointValue({
    base: "0em",
    md: "md",
    lg: "lg",
  });

  // useEffect to set commissions to state
  useEffect(() => {
    // Check if commissionData and getCommissions are available
    if (commissionData && commissionData.getCommissions && user && user._id) {
      // Map and filter out commissions that are connected to this userId
      const commissions = commissionData.getCommissions.filter(
        (commission) =>
          commission.creatorId === user._id ||
          commission.collaboratorId === user._id
      );

      // Set the filtered commissions to the state
      setCommissions(commissions);

      // Separate the commissions into active and completed
      const activeCommissions = commissions.filter(
        (commission) => commission.status !== false
      );

      const completedCommissions = commissions.filter(
        (commission) => commission.status === false
      );

      // Set the active and completed commissions to the states
      setActiveCommissions(activeCommissions);
      setCompletedCommissions(completedCommissions);
    }
  }, [commissionData, user]);

  console.log("COMMISSIONS");
  console.log(commissions);

  console.log(user);
  // useEffect to refetch data
  useEffect(() => {
    const handleInitialRefetch = async () => {
      await refetch();
    };
    handleInitialRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // useEffect to set isLoading to false
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.me !== null) {
      setUser(data.me);
    }
  }, [data]);
  // handles deleting a commission
  const handleDeleteCommission = async (commissionId) => {
    try {
      await deleteCommission({
        variables: { id: commissionId },
      });
      await refetch();
      await refetchData();
    } catch (error) {
      console.error(error);
    }
  };
  // handles updating a commission
  const handleUpdateCommission = async (updatedCommission) => {
    console.log("UPDATED COMMISSION");
    console.log(updatedCommission);

    delete updatedCommission.__typename;

    try {
      await updateCommission({
        variables: { commission: updatedCommission },
      });
      await refetch();
      await refetchData();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || loading || commissionLoading) {
    refetch();
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
      {user ? (
        <Flex direction="column" justify="center" alignItems="center">
          <Flex
            my="20px"
            width="80%"
            direction="column"
            justify="center"
            alignItems="center"
            border="8px"
            borderColor="blackAlpha.200"
            borderRadius="md"
            shadow={largeScreen ? "lg" : "md"}
          >
            <Card
              width="100%"
              h="auto"
              bg="black"
              color="teal.500"
              opacity={largeScreen ? "1" : "0.8"}
            >
              <Flex flexDir="row" alignItems="center">
                <Flex width="10%"></Flex>
                <CardBody textAlign="center" width="80%">
                  <Heading
                    color="teal.500"
                    letterSpacing={10}
                    size="4xl"
                    fontSize={userSize}
                  >
                    {user.username}
                  </Heading>
                  <Text letterSpacing={5} fontSize={textSize}>
                    {user.userType}
                  </Text>
                </CardBody>
                {largeScreen ? (
                  <Flex width="10%" justifyContent="center" alignItems="center">
                    <Link to="/settings">
                      <Icon as={MdSettings} boxSize={settingsSize} />
                    </Link>
                  </Flex>
                ) : (
                  <Flex
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Link to="/settings">
                      <Icon as={MdSettings} boxSize={settingsSize} />
                    </Link>
                  </Flex>
                )}
              </Flex>
            </Card>
            <Flex
              flex={1}
              minHeight="100vh"
              justifyContent="center"
              bg="teal.500"
              direction={largeScreen ? "row" : "column"}
              width="100%"
              borderRadius="none"
              flexWrap={largeScreen ? "nowrap" : "wrap"}
            >
              <Flex
                minHeight="100vh"
                alignItems="center"
                bg="white"
                direction="column"
                width={largeScreen ? "60%" : "100%"}
                borderRadius="md"
              >
                {commissions ? (
                  <Box h="auto" width="100%">
                    <Box // Profile and Bio Card
                      width="100%"
                      marginBottom="20px"
                      display={largeScreen ? "none" : "block"}
                      borderRadius="md"
                    >
                      <Card width="100%">
                        <CardBody textAlign="center">
                          <Heading fontSize={textSize}>Profile</Heading>
                          <Divider borderWidth="4px" borderColor="black" />
                          <Text fontSize={bioTextSize}>{user.email}</Text>
                          <Divider borderWidth="0.5px" borderColor="black" />

                          <Text fontSize={bioTextSize}>Bio: {user.bio}</Text>
                          <Divider borderWidth="0.5px" borderColor="black" />

                          {user.musicLinks ? (
                            <Flex direction="column">
                              <Text fontWeight="bold">Links to music:</Text>
                              <Flex direction="column">
                                {user.musicLinks.map((link, index) => (
                                  <Box>
                                    {/* <a
                                      key={index}
                                      href={link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {link}
                                    </a> */}
                                    <ReactPlayer height="40%" width="100%" url={link} />
                                  </Box>
                                ))}
                              </Flex>
                            </Flex>
                          ) : (
                            <Text>Links to music: None</Text>
                          )}
                          <Divider borderWidth="0.5px" borderColor="black" />
                        </CardBody>
                      </Card>
                    </Box>

                    <Card
                      width="100%"
                      h="auto"
                      borderRadius="none"
                      mb={largeScreen ? "0" : "20px"}
                    >
                      <CardBody
                        width="100%"
                        textAlign="center"
                        paddingX={mediumScreen ? "1rem" : "2rem"}
                      >
                        <Heading size={headingSize}>Active Commissions</Heading>
                        <Commissions
                          commissions={activeCommissions}
                          user={user}
                          onHandleUpdateCommission={handleUpdateCommission}
                          onHandleDeleteCommission={handleDeleteCommission}
                        />
                      </CardBody>
                    </Card>
                    <Card
                      width="100%"
                      h="auto"
                      borderRadius="none"
                      mb={largeScreen ? "0" : "20px"}
                    >
                      <CardBody
                        textAlign="center"
                        paddingX={mediumScreen ? "1rem" : "2rem"}
                      >
                        <Heading size={headingSize}>
                          Completed Commissions
                        </Heading>
                        <Commissions
                          commissions={completedCommissions}
                          user={user}
                          onHandleUpdateCommission={handleUpdateCommission}
                          onHandleDeleteCommission={handleDeleteCommission}
                        />
                      </CardBody>
                    </Card>
                  </Box>
                ) : (
                  <Card width="100%" h="auto">
                    <CardBody textAlign="center">
                      <Heading size={headingSize}>
                        No Active Commissions
                      </Heading>
                    </CardBody>
                  </Card>
                )}
              </Flex>
              {largeScreen && (
                <Flex w="40%">
                  <Card w="120%" h="auto" borderRadius="none">
                    <CardBody>
                      <Flex alignItems="center" justifyContent="center">
                        <Box w="80%" fontSize="25px">
                          <Heading fontSize={textSize}>Profile</Heading>
                          <Divider borderWidth="4px" borderColor="black" />
                          <Text fontSize={bioTextSize}>{user.email}</Text>
                          <Divider borderWidth="0.5px" borderColor="black" />

                          <Text fontSize={bioTextSize}>Bio: {user.bio}</Text>
                          <Divider borderWidth="0.5px" borderColor="black" />

                          {user.musicLinks ? (
                            <Flex direction="column">
                              <Text fontWeight="bold">Links to music:</Text>
                              <Flex direction="column">
                                {user.musicLinks.map((link) => (
                                  <Box>
                                    {/* <a
                                   href={link}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                 > 
                                    {link}
                                    </a> */}
                                    <Flex>
                                      <ReactPlayer
                                        width="100%"
                                        height="auto"
                                        url={link}
                                      />
                                    </Flex>
                                  </Box>
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
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          minHeight="100vh"
          alignItems="center"
          bg="teal.500"
          direction="column"
        >
          <Card my="auto" width="auto" h="auto">
            <CardBody textAlign="center">
              <Heading size={headingSize}>Not Logged In!</Heading>
            </CardBody>
          </Card>
        </Flex>
      )}
      {error && (
        <Box mt={4} color="red.500">
          Something went wrong...
        </Box>
      )}
    </Box>
  );
};

export default MyProfile;
