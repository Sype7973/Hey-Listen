import React from "react";
import { Box, ModalFooter, Button, Input, Divider } from "@chakra-ui/react";

const CommissionPost = ({ commission, onUpdateCommission, closeModal }) => {
  return (
    <Box>
      <h2>Title:</h2>
      <Input defaultValue={`${commission.commissionTitle}`}></Input>
      <h2 >Descrption:</h2>
      <Input defaultValue={`${commission.commissionDescription}`}></Input>
      <Divider />
      <h2>Type:</h2>
      <p>{`Type: ${commission.commissionType}`}</p>
      <h2>Submitter:</h2>
      <p>{`Submitter: ${commission.username}`}</p>
      <h2>Collaborator:</h2>
      <p>{`Collaborator: ${commission.collaborator}`}</p>
      <h2>Budget:</h2>
      <p>{`Budget: ${commission.budget}`}</p>
      <h2>Deadline:</h2>
      <p>{`Deadline: ${commission.deadline}`}</p>
      <h2>Created At:</h2>
      <p>{`Created At: ${commission.createdAt}`}</p>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={closeModal}>
          Close
        </Button>
        <Button variant="ghost" onClick={() => onUpdateCommission(commission)}>
          Update User
        </Button>
      </ModalFooter>
    </Box>
  );
};

export default CommissionPost;
