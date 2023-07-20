// component to render a commission into PostDashboard.js

import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Box, Flex, Heading, Card, CardBody } from "@chakra-ui/react";
import { GET_ME } from "../utils/queries";
import Commissions from "./Commission";

// function that maps and renders commissions
const MyProfile = () => {
  const { loading, data } = useQuery(GET_ME);
  const [user, setUser] = useState(null);
  const [commissions, setCommissions] = useState([]);


  useEffect(() => {
    if (data) {
      setUser(data.me);
      setCommissions(data.me.commissions);
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      {user ? (
        <Flex minHeight="100vh" alignItems="center" bg="teal.500" direction="column">
          <Card mt="3vh" width="80vw" h="auto">
            <CardBody textAlign="center">
              <Heading>{user.username}</Heading>
              <p>{user.userType}</p>
            </CardBody>
          </Card>
          <Card mb="3vh" mt="3vh" width="80vw" h="auto">
            <CardBody textAlign="center">
              <Heading>Active Commissions</Heading>
              <Commissions commissions={commissions} />
            </CardBody>
          </Card>
        </Flex>
      ) : (
        <div>User information not available</div>
      )}
    </Box>
  );
};

export default MyProfile;
