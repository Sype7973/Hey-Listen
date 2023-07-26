import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  ModalFooter,
  Button,
  Input,
  Flex,
  Table,
  Tbody,
  Tr,
  Td,
  ModalFooter as ModalFooter2,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

const CommissionPost = ({
  commission,
  onUpdateCommission,
  closeModal,
  onDeleteCommission,
}) => {
  const [updatedTitle, setUpdatedTitle] = useState(commission.commissionTitle);
  const [updatedDescription, setUpdatedDescription] = useState(
    commission.commissionDescription
  );

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleUpdateCommission = () => {
    const updatedCommission = {
      ...commission,
      commissionTitle: updatedTitle,
      commissionDescription: updatedDescription,
    };
    onUpdateCommission(updatedCommission);
  };

  const [date] = useState(new Date());

  const handleCompleteCommission = () => {
    const updatedCommission = {
      ...commission,
      completionDate: date,
      status: false,
    };
    onUpdateCommission(updatedCommission);
  };

  const handleDeleteCommission = () => {
    onDeleteCommission(commission._id);
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
  const isSmallerScreen = useBreakpointValue({ base: true, md: false });
  const updatedDeadline = formatDate(commission.deadline);
  const updatedCreatedAt = formatDate(commission.createdAt);

  return (
    <Box>
      <Table>
        <Tbody>
          <Tr>
            <Td>Title:</Td>
            <Td>
              <Input
                defaultValue={`${updatedTitle}`}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              ></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Descrption:</Td>
            <Td>
              <Input
                defaultValue={`${updatedDescription}`}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              ></Input>
            </Td>
          </Tr>
          <Tr>
            <Td>Type:</Td>
            <Td>{`${commission.commissionType}`}</Td>
          </Tr>
          <Tr>
            <Td>Submitter:</Td>
            <Td>
              <Link to={`/profile/${commission.creatorUsername}`}>
                <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                  {commission.creatorUsername}
                </Text>
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td>Collaborator:</Td>
            <Td>
              <Link to={`/profile/${commission.collaboratorUsername}`}>
                <Text color="teal.500" fontStyle="bold" fontWeight="bold">
                  {commission.collaboratorUsername}
                </Text>
              </Link>
            </Td>
          </Tr>
          <Tr>
            <Td>Budget:</Td>
            <Td>{`${commission.budget}`}</Td>
          </Tr>
          <Tr>
            <Td>Deadline:</Td>
            <Td>{`${updatedDeadline}`}</Td>
          </Tr>
          <Tr>
            <Td>Created At:</Td>
            <Td>{`${updatedCreatedAt}`}</Td>
          </Tr>
          {commission.status ? null : (
            <Tr>
              <Td>Completion Date:</Td>
              <Td>{`${formatDate(commission.completionDate)}`}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
      <ModalFooter>
      <Flex direction={isSmallerScreen ? "column" : "row"} gap="1">
        {commission.status === true ? (
          <>
            <Button colorScheme="green" onClick={handleCompleteCommission}>
              Complete Commission
            </Button>
            <Button colorScheme="yellow" onClick={handleUpdateCommission}>
              Update Commission
            </Button>
          </>
        ) : (
          <></>
        )}
        <Button colorScheme="red" onClick={handleOpenDeleteModal}>
          Delete Commission
        </Button>
        <Button colorScheme="blue" mr={3} onClick={closeModal}>
          Close
        </Button>
      </Flex>
    </ModalFooter>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this commission?
          </ModalBody>
          <ModalFooter2>
            <Button colorScheme="red" mr={3} onClick={handleDeleteCommission}>
              Confirm
            </Button>
            <Button colorScheme="blue" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
          </ModalFooter2>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CommissionPost;
