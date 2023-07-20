// Commissions.js
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Box,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import CommissionPost from "../components/CommissionPost";
import { UPDATE_COMMISSION } from "../utils/mutations";

const Commissions = ({ commissions }) => {
  const [activeCommissionIndex, setActiveCommissionIndex] = useState(null);

  const [updateCommission] = useMutation(UPDATE_COMMISSION);


  const openModal = (index) => {
    setActiveCommissionIndex(index);
  };

  const closeModal = () => {
    setActiveCommissionIndex(null);
  };

  const handleUpdateCommission = (commissionData) => {
    console.log(commissionData);
    // updateCommission({
    //     variables: {
    //         commissionTitle: commissionData.commissionTitle,
    //         commissionDescription: commissionData.commissionDescription,
    //         budget: commissionData.budget,
    //         commissionType: commissionData.commissionType,
    //     },
    // });
    // Implement your mutation logic here
    closeModal(); // Close the modal after the mutation is performed
  };

  return (
    <Box>
      {commissions.length > 0 ? (
        commissions.map((commission, index) => (
          <Flex
            key={commission._id}
            p={5}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="gray.50"
            m={5}
            onClick={() => openModal(index)}
            cursor="pointer"
          >
            <h2>{`Title: ${commission.commissionTitle}`}</h2>
            <p>{`Description: ${commission.commissionDescription}`}</p>
            {/* ... Other commission details */}
          </Flex>
        ))
      ) : (
        <p>No commissions to display.</p>
      )}

      {activeCommissionIndex !== null && (
        <Modal isOpen={true} onClose={closeModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CommissionPost
                commission={commissions[activeCommissionIndex]}
                onUpdateCommission={handleUpdateCommission}
                closeModal={closeModal}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Commissions;
