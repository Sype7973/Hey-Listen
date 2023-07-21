// Commissions.js
import React, { useState } from "react";
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
  Image,
} from "@chakra-ui/react";
import CommissionPost from "../components/CommissionPost";

import greenLight from "../assets/images/greenlight.png";
import redLight from "../assets/images/redlight.png";
import orangeLight from "../assets/images/orangelight.png";

const Commissions = ({ onHandleUpdateCommission, commissions, user, refetch }) => {
  const [activeCommissionIndex, setActiveCommissionIndex] = useState(null);


  const openModal = (index) => {
    setActiveCommissionIndex(index);
  };

  const closeModal = () => {
    setActiveCommissionIndex(null);
  };

  const handleUpdateCommission = async (updatedCommission) => {
    onHandleUpdateCommission(updatedCommission);
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
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="gray.50"
            m={5}
            onClick={() => openModal(index)}
            cursor="pointer"
          >
            <Box
              p={5}
              flex="1"
              w="50vw"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              m={5}
            >
              <Heading size="">{`~ ${commission.commissionTitle} ~`}</Heading>
              <p>{`${commission.commissionDescription}`}</p>
            </Box>
            {commission.status ? (
              <Image
                boxSize="60px"
                objectFit="cover"
                src={orangeLight}
                alt="active"
              ></Image>
            ) : (
              <Image boxSize="60px"
              objectFit="cover" src={greenLight} alt="complete"></Image>
            )}
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
    </Box>
  );
};

export default Commissions;
