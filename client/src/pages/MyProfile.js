// component to render a commission into PostDashboard.js
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Heading, Card, CardBody } from "@chakra-ui/react";
import { GET_ME } from "../utils/queries";
import Commissions from "./Commission";
import spinner from "../assets/images/spinner.gif";

// function that maps and renders commissions
const MyProfile = () => {
  const { loading, data, refetch } = useQuery(GET_ME);
  const [user, setUser] = useState(null);
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    if (data && data.me !== null) {
      setUser(data.me);
      setCommissions(data.me.commissions);
    }
  }, [data]);


  const handleRefetch = async () => {
    // Call the refetch function from useQuery to fetch updated data
    const { data } = await refetch();

    // Update the user and commissions state with the new data
    if (data) {
      setUser(data.me);
      setCommissions(data.me.commissions);
    }
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
    <Box>
      {user ? (
        <Flex
          minHeight="100vh"
          alignItems="center"
          bg="teal.500"
          direction="column"
        >
          <Card mt="3vh" width="20vw" h="auto">
            <CardBody textAlign="center">
              <Heading>{user.username}</Heading>
              <p>{user.userType}</p>
            </CardBody>
          </Card>
          {commissions ? (
            <Box>
              <Card mb="3vh" mt="3vh" width="40vw" h="auto">
                <CardBody textAlign="center">
                  <Heading>Active Commissions</Heading>
                  <Commissions
                    commissions={commissions}
                    user={user}
                    refetch={handleRefetch}
                  />
                </CardBody>
              </Card>
              <Card mb="3vh" mt="3vh" width="40vw" h="auto">
                <CardBody textAlign="center">
                  <Heading>Completed Commissions</Heading>
                  <Commissions
                    commissions={commissions}
                    user={user}
                    refetch={handleRefetch}
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
          <Card my="auto" width="20vw" h="auto">
            <CardBody textAlign="center">
              <Heading>Not Logged In!</Heading>
            </CardBody>
          </Card>
        </Flex>
      )}
    </Box>
  );
};

export default MyProfile;
