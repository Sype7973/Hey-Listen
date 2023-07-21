// component to render a commission into PostDashboard.js
import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { Box, Flex, Heading, Card, CardBody } from "@chakra-ui/react";
import { GET_ME } from "../utils/queries";
import Commissions from "./Commission";
import spinner from "../assets/images/spinner.gif";
import { UPDATE_COMMISSION } from "../utils/mutations";

// function that maps and renders commissions
const MyProfile = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [user, setUser] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updateCommission, { error }] = useMutation(UPDATE_COMMISSION);

  const [activeCommissions, setActiveCommissions] = useState([]);
  const [completedCommissions, setCompletedCommissions] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.me !== null) {
      setUser(data.me);
      setCommissions(data.me.commissions);
    }
  }, [data]);

  useEffect(() => {
    const activeCommissions = commissions.filter(
      (commission) => commission.status === true
    );
    const completedCommissions = commissions.filter(
      (commission) => commission.status !== true
    );
    setActiveCommissions(activeCommissions);
    setCompletedCommissions(completedCommissions);
  }, [commissions]);

  const handleUpdateCommission = async (updatedCommission) => {
    console.log(updatedCommission);
    const commissionIndex = user.commissions.findIndex(
      (commission) => commission._id === updatedCommission._id
    );

    if (commissionIndex === -1) {
      console.error("Commission not found!");
      return;
    }

    const updatedCommissions = [
      ...user.commissions.slice(0, commissionIndex),
      updatedCommission,
      ...user.commissions.slice(commissionIndex + 1),
    ];

    const updatedUser = {
      ...user,
      commissions: updatedCommissions,
    };

    console.log(user._id);
    console.log(updatedUser.commissions);

    const data = await updateCommission({
      variables: {
        id: updatedUser._id, // The ID of the user you want to update
        commissions: updatedUser.commissions.map((commission) => ({
          _id: commission._id,
          commissionTitle: commission.commissionTitle,
          commissionType: commission.commissionType,
          commissionDescription: commission.commissionDescription,
          username: commission.username,
          collaborator: commission.collaborator,
          budget: commission.budget,
          completionDate: commission.completionDate,
          status: commission.status,
          rating: commission.rating,
          review: commission.review,
        })),
      },
    });
    console.log(data);
    refetch();
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
    <Box background="black">
      {user ? (
        <Flex
          minHeight="100vh"
          alignItems="center"
          bg="teal.500"
          direction="column"
        >
          <Card mt="3vh" width="200px" h="auto">
            <CardBody  textAlign="center">
              <Heading>{user.username}</Heading>
              <p>{user.userType}</p>
            </CardBody>
          </Card>
          {commissions ? (
            <Box>
              <Card mb="3vh" mt="3vh" width="700px" h="auto">
                <CardBody textAlign="center">
                  <Heading>Active Commissions</Heading>
                  <Commissions
                    commissions={activeCommissions}
                    user={user}
                    onHandleUpdateCommission={handleUpdateCommission}
                  />
                </CardBody>
              </Card>
              <Card mb="3vh" mt="3vh" width="700px" h="auto">
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
            <Card mb="3vh" mt="3vh" width="40vw" h="auto">
              <CardBody textAlign="center">
                <Heading>No Active Commissions</Heading>
              </CardBody>
            </Card>
          )}
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
