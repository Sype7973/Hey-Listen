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
  Heading,
} from "@chakra-ui/react";
import CommissionPost from "../components/CommissionPost";
import { UPDATE_COMMISSION } from "../utils/mutations";

const Commissions = ({ commissions, user, refetch }) => {
  const [activeCommissionIndex, setActiveCommissionIndex] = useState(null);

  const [updateCommission, { error }] = useMutation(UPDATE_COMMISSION);

  const openModal = (index) => {
    setActiveCommissionIndex(index);
  };

  const closeModal = () => {
    setActiveCommissionIndex(null);
  };

  const handleUpdateCommission = async (updatedCommission) => {
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
          commissions: updatedUser.commissions.map(commission => ({
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
    console.log(data)
      refetch();
    closeModal();
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
            <Heading size="">{`~ ${commission.commissionTitle} ~`}</Heading>
            <p>{`${commission.commissionDescription}`}</p>
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
            <ModalHeader>Commissions</ModalHeader>
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
      {error && <Box mt={4} color="red.500">Something went wrong...</Box>}
    </Box>
    
  );
};

export default Commissions;
