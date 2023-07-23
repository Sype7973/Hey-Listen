import React, { useState, useEffect } from "react";
import { Box, ModalFooter, Button, Input, Divider } from "@chakra-ui/react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../utils/queries";

const CommissionPost = ({ commission, onUpdateCommission, closeModal }) => {
  const [updatedTitle, setUpdatedTitle] = useState(commission.commissionTitle);
  const [updatedDescription, setUpdatedDescription] = useState(
    commission.commissionDescription
  );
  
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { _id: commission.collaboratorId },
  });

  useEffect(() => {
    if (loading) {
      console.log("Loading...");
    } else if (error) {
      console.error("Error fetching collaborator data:", error);
    } else {
      console.log("Collaborator data:", data);
    }
  }, [loading, error, data]);


  const handleUpdateCommission = () => {
    const updatedCommission = {
      ...commission,
      commissionTitle: updatedTitle,
      commissionDescription: updatedDescription,
    };
    onUpdateCommission(updatedCommission);
  };


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
  const updatedDeadline = formatDate(commission.deadline)


  return (
    <Box>
      <h2>Title:</h2>
      <Input
        defaultValue={`${updatedTitle}`}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      ></Input>
      <h2>Descrption:</h2>
      <Input
        defaultValue={`${updatedDescription}`}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      ></Input>
      <Divider />
      <h2>Type:</h2>
      <p>{`${commission.commissionType}`}</p>
      <h2>Submitter:</h2>
      <p>{`${commission.username}`}</p>
      <h2>Collaborator:</h2>
      <p>{`${commission.collaboratorId}`}</p>
      <h2>Budget:</h2>
      <p>{`${commission.budget}`}</p>
      <h2>Deadline:</h2>
      <p>{`${updatedDeadline}`}</p>
      <h2>Created At:</h2>
      <p>{`${commission.createdAt}`}</p>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={closeModal}>
          Close
        </Button>
        <Button variant="ghost" onClick={handleUpdateCommission}>
          Update User
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default CommissionPost;



