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
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import CommissionPost from "../components/CommissionPost";

import greenLight from "../assets/images/greenlight.png";
import orangeLight from "../assets/images/orangelight.png";

const Commissions = ({ onHandleUpdateCommission, commissions, user, onHandleDeleteCommission }) => {
  const [activeCommissionIndex, setActiveCommissionIndex] = useState(null);
// media query for smaller screens
  const headingSize = useBreakpointValue({ base: "15px", md: "md", lg: "lg", xl: "xl" });
  const textSize = useBreakpointValue({ base: "12px", md: "md", lg: "lg", xl: "xl" });
  const imageSize = useBreakpointValue({ base: "25px", md: "40px", lg: "60px", xl: "60px" });
// handles opening modal
  const openModal = (index) => {
    console.log("OPEN MODAL")
    setActiveCommissionIndex(index);
  };
  console.log(activeCommissionIndex)

// handles closing modal
  const closeModal = () => {
    setActiveCommissionIndex(null);
  };
// handles updating a commission
  const handleUpdateCommission = async (updatedCommission) => {
    onHandleUpdateCommission(updatedCommission);
    closeModal();
  };
// handles deleting a commission
  const handleDeleteCommission = async (commissionId) => {
    onHandleDeleteCommission(commissionId);
    closeModal();
  };

  return (
    <Box>
      {commissions.length > 0 ? (
        commissions.map((commission, index) => (
          <Flex
            key={commission._id}
            p={2}
            shadow="md"
            borderWidth="1px"
            flex="1"
            borderRadius="md"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            bg="gray.50"
            m={3}
            onClick={() => openModal(index)}
            cursor="pointer"
          >
            <Box
              pr={2}
              pl={2}
              flex="1"
              w="50vw"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              m={5}
            >
              <Heading fontSize={headingSize} size="">{`${commission.commissionTitle}`}</Heading>
              <Text fontSize={textSize}>{`${commission.commissionDescription}`}</Text>
            </Box>
            {commission.status ? (
              <Image
                boxSize={imageSize}
                objectFit="cover"
                src={orangeLight}
                alt="active"
              ></Image>
            ) : (
              <Image boxSize={imageSize}
              objectFit="cover" src={greenLight} alt="complete"></Image>
            )}
            {/* ... Other commission details */}
          </Flex>
        ))
      ) : (
        <p>No commissions to display.</p>
      )}

      {activeCommissionIndex !== null && (
        <Modal isOpen={true} onClose={closeModal} size="3xl">
          <ModalOverlay />
          <ModalContent >
            <ModalHeader>Commissions</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <CommissionPost
                commission={commissions[activeCommissionIndex]}
                onUpdateCommission={handleUpdateCommission}
                closeModal={closeModal}
                onDeleteCommission={handleDeleteCommission}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default Commissions;
