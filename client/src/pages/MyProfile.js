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
} from "@chakra-ui/react";
import { GET_ME, GET_USER, GET_COMMISSIONS } from "../utils/queries";
import Commissions from "./Commission";
import spinner from "../assets/images/spinner.gif";
import { UPDATE_COMMISSION } from "../utils/mutations";
// import MyPosts from "./MyPosts";

// function that maps and renders commissions
const MyProfile = () => {
  const { loading, data, refetch } = useQuery(GET_ME);

  const { loading: commissionLoading, data: commissionData } =
    useQuery(GET_COMMISSIONS);

  const [user, setUser] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateCommission, { error }] = useMutation(UPDATE_COMMISSION);

  const [activeCommissions, setActiveCommissions] = useState([]);
  const [completedCommissions, setCompletedCommissions] = useState([]);

  const handlePageRefetch = async () => {
    await refetch();
  };

  useEffect(() => {
    handlePageRefetch();
  }, []);

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

  const handleInitialRefetch = async () => {
    await refetch();
  };

  useEffect(() => {
    handleInitialRefetch();
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.me !== null) {
      setUser(data.me);
    }
  }, [data]);
  console.log(commissions);

  const handleUpdateCommission = async (updatedCommission) => {
    // setUpdatedCommission(updatedCommission);
    // console.log("CREATOR DATA");
    // console.log(creatorData);
    // console.log("COLLABORATOR DATA");
    // console.log(collaboratorData);
    // if (!collaboratorData || !creatorData || !updatedCommission) {
    //   console.log("Data not available yet. Waiting...");
    //   return;
    // }
    // const collaboratorIndex = collaboratorData.commissions.findIndex(
    //   (commission) => commission._id === updatedCommission._id
    // );
    // console.log("COLLABORATOR INDEX");
    // console.log(collaboratorData.commissions);
    // console.log(collaboratorIndex);
    // const creatorIndex = creatorData.commissions.findIndex(
    //   (commission) => commission._id === updatedCommission._id
    // );
    // if (collaboratorIndex === -1) {
    //   console.error("Collaborator Commission not found!");
    //   return;
    // }
    // if (creatorIndex === -1) {
    //   console.error("Creator Commission not found!");
    //   return;
    // }
    // const updatedCreatorCommissions = [
    //   ...creatorData.commissions.slice(0, creatorIndex),
    //   updatedCommission,
    //   ...creatorData.commissions.slice(creatorIndex + 1),
    // ];
    // const updatedCollaboratorCommissions = [
    //   ...collaboratorData.commissions.slice(0, collaboratorIndex),
    //   updatedCommission,
    //   ...collaboratorData.commissions.slice(collaboratorIndex + 1),
    // ];
    // const updatedCreator = {
    //   ...creatorData,
    //   commissions: updatedCreatorCommissions,
    // };
    // const updatedCollaborator = {
    //   ...collaboratorData,
    //   commissions: updatedCollaboratorCommissions,
    // };
    // console.log("Updated User COmmissions");
    // const newCreatorData = await updateCommission({
    //   variables: {
    //     // The ID of the user you want to update
    //     commissions: updatedCreator.commissions.map((commission) => ({
    //       _id: commission._id,
    //       commissionTitle: commission.commissionTitle,
    //       commissionType: commission.commissionType,
    //       commissionDescription: commission.commissionDescription,
    //       username: commission.username,
    //       collaboratorId: commission.collaboratorId,
    //       creatorId: commission.creatorId,
    //       budget: commission.budget,
    //       deadline: commission.deadline,
    //       completionDate: commission.completionDate,
    //       status: commission.status,
    //       rating: commission.rating,
    //       review: commission.review,
    //       createdAt: commission.createdAt,
    //     })),
    //   },
    // });
    // const newCollaboratorData = await updateCommission({
    //   variables: {
    //     // The ID of the user you want to update
    //     commissions: updatedCollaborator.commissions.map((commission) => ({
    //       _id: commission._id,
    //       commissionTitle: commission.commissionTitle,
    //       commissionType: commission.commissionType,
    //       commissionDescription: commission.commissionDescription,
    //       username: commission.username,
    //       collaboratorId: commission.collaboratorId,
    //       creatorId: commission.creatorId,
    //       budget: commission.budget,
    //       deadline: commission.deadline,
    //       completionDate: commission.completionDate,
    //       status: commission.status,
    //       rating: commission.rating,
    //       review: commission.review,
    //       createdAt: commission.createdAt,
    //     })),
    //   },
    // });
    // refetch();
  };

  if (isLoading || loading) {
    return (
      <Flex
        minHeight="100vh"
        alignItems="center"
        bg="teal.500"
        direction="column"
        justifyContent="center"
      >
        <Card m="auto" width="40vw" h="40vw">
          <CardBody display="flex" alignItems="center" justifyContent="center">
            <img src={spinner} alt="loading"></img>{" "}
          </CardBody>
        </Card>
      </Flex>
    );
  }

  return (
    <Box background="teal.500" >
      {user ? (
        <Flex direction="column" justify="center" alignItems="center" >
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
                <Heading color="teal.500" letterSpacing={10} size="4xl">
                  {user.username}
                </Heading>
                <Text letterSpacing={5}>{user.userType}</Text>
              </CardBody>
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
