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
} from "@chakra-ui/react";
import { GET_ME, GET_COMMISSIONS } from "../utils/queries";
import { MdSettings } from "react-icons/md";

import Commissions from "./Commission";
import spinner from "../assets/images/spinner.gif";
import { UPDATE_COMMISSION, DELETE_COMMISSION } from "../utils/mutations";
// import MyPosts from "./MyPosts";

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

  useEffect(() => {
    const handleInitialRefetch = async () => {
      await refetch();
    };
    handleInitialRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.me !== null) {
      setUser(data.me);
    }
  }, [data]);

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
            borderColor="black"
          >
            <Card
              width="100%"
              h="auto"
              bg="black"
              color="teal.500"
              borderRadius="none"
            >
              <Flex flexDir="row">
                <Flex width="10%"></Flex>
                <CardBody textAlign="center">
                  <Heading color="teal.500" letterSpacing={10} size="4xl">
                    {user.username}
                  </Heading>
                  <Text letterSpacing={5}>{user.userType}</Text>
                </CardBody>
                <Flex width="10%" justifyContent="center" alignItems="center">
                  <Link to="/settings">
                    <Icon as={MdSettings} boxSize="50px" />
                  </Link>
                </Flex>
              </Flex>
            </Card>

            <Flex
              minHeight="100vh"
              justifyContent="center"
              bg="teal.500"
              direction="row"
              width="100%"
              borderRadius="none"
            >
              <Flex
                minHeight="100vh"
                alignItems="center"
                bg="white"
                direction="column"
                width="70%"
              >
                {commissions ? (
                  <Box h="auto" width="100%">
                    <Card width="100%" h="auto" borderRadius="none">
                      <CardBody width="100%" textAlign="center">
                        <Heading>Active Commissions</Heading>
                        <Commissions
                          commissions={activeCommissions}
                          user={user}
                          onHandleUpdateCommission={handleUpdateCommission}
                          onHandleDeleteCommission={handleDeleteCommission}
                        />
                      </CardBody>
                    </Card>
                    <Card width="100%" h="auto" borderRadius="none">
                      <CardBody textAlign="center">
                        <Heading>Completed Commissions</Heading>
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
                      <Heading>No Active Commissions</Heading>
                    </CardBody>
                  </Card>
                )}
              </Flex>
              <Flex w="30%">
                <Card w="100%" h="auto" borderRadius="none">
                  <CardBody>
                    <Flex alignItems="center" justifyContent="center">
                      <Box w="80%" fontSize="25px">
                        <Heading fontSize="50px">Profile</Heading>
                        <Divider borderWidth="4px" borderColor="black" />
                        <Text>{user.email}</Text>
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
      ) : (
        <Flex
          minHeight="100vh"
          alignItems="center"
          bg="teal.500"
          direction="column"
        >
          <Card my="auto" width="auto" h="auto">
            <CardBody textAlign="center">
              <Heading>Not Logged In!</Heading>
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
