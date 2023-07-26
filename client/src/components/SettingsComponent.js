import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  Flex,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  TableContainer,
  Heading,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Select,
} from "@chakra-ui/react";
import { UPDATE_USER, DELETE_USER } from "../utils/mutations";
import Auth from "../utils/auth";

// for settings page
const SettingsComponent = ({ title, userData, setInputChange, setChangePassword, changePassword, refetch }) => {
  console.log(userData);

  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [passwordField, setPasswordField] = useState("");
// deconstructs user data
  const {
    password,
    username,
    email,
    userType,
    musicLinks,
    profilePicture,
    bio,
  } = userData;
// sets form state for updating user
  const [formState, setFormState] = useState({
    username: username,
    email: email,
    userType: userType,
    musicLinks: musicLinks,
    profilePicture: profilePicture,
    bio: bio,
    password: password,
  });


  const [musicLinksState, setMusicLinksState] = useState(userData.musicLinks);

  const handleAddLink = async () => {
    setInputChange(true);
    setMusicLinksState([...musicLinksState, '']);
    updateUser({ variables: { id: userData._id, musicLinks: [...musicLinksState, ''] } });
    await refetch();
  };


  useEffect(() => {
    console.log(formState);
  }, [formState]);
// handles modal for deleting account
  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };
// handles modal for deleting account
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
//  handles deleting account
  const handleDeleteAccount = async () => {
    const userId = userData._id;
    await deleteUser({ variables: { id: userId } });
    Auth.logout();
  };
// handles input change
  const handleInputChange = (event) => {
    setInputChange(true);
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
// handles password change
  const handlePasswordChange = (event) => {
    setPasswordField(event.target.value);
    setFormState({
      ...formState,
      password: event.target.value,
    });
  };
// handles music links change

const handleMusicLinksChange = (index, value) => {
  setInputChange(true);
  const updatedMusicLinks = [...musicLinksState];
  updatedMusicLinks[index] = value;

  setMusicLinksState(updatedMusicLinks);
  setFormState({
    ...formState,
    musicLinks: updatedMusicLinks,
  });
};

  //  const handleMusicLinksChange = (index, value) => {
  //   setInputChange(true);
  //   const updatedMusicLinks = [...formState.musicLinks];
  //   updatedMusicLinks[index] = value;

  //   setFormState({
  //     ...formState,
  //     musicLinks: updatedMusicLinks,
  //   });
  // };

// handles overall update
  const handleUpdate = async () => {
    setInputChange(false);
    setChangePassword(false);

    const filteredMusicLinks = musicLinksState.filter(link => link !== undefined && link !== null && link !== '');

// deconstructs user data
    const updateData = {
      id: userData._id,
      username: formState.username,
      email: formState.email,
      userType: formState.userType,
      musicLinks: filteredMusicLinks,
      profilePicture: formState.profilePicture,
      bio: formState.bio,
    };

    setMusicLinksState(filteredMusicLinks);
    
    if (formState.password !== password) {
      updateData.password = formState.password;
    }

    updateUser({ variables: updateData });
    setPasswordField("");
  };
// changes password state
  const changePasswordState = () => {
    setChangePassword(true);
  };

  const renderContent = () => {
    switch (title) {
      case "Profile Settings":
        return (
          <TableContainer width="100%">
            <Table variant="simple">
              <Tbody>
                <Tr>
                  <Td>Bio: </Td>
                  <Td>
                    <Flex justifyContent="right" alignItems="center">
                      <Input
                        width="50%"
                        style={{ textAlign: "right" }}
                        defaultValue={bio}
                        name="bio"
                        value={formState.bio}
                        onChange={handleInputChange}
                      ></Input>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td> Music Links: <Button onClick={handleAddLink}>Add Link</Button></Td>
                  <Td>
                    <Flex
                      justifyContent="right"
                      alignItems="center"
                      flexDir="column"
                    >
                      {musicLinks.length > 0 ? (
                        musicLinks.map((link, index) => (
                          <Input
                            key={index}
                            style={{ textAlign: "right" }}
                            width="100%"
                            name="musicLinks"
                            defaultValue={`${link}`}
                            onChange={(event) =>
                            handleMusicLinksChange(index, event.target.value)
                            }
                          ></Input>
                        ))
                      ) : (
                        <Text>No links found</Text>
                      )}
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>User Type: </Td>
                  <Td>
                    <Flex justifyContent="right" alignItems="center">
                      <Select
                        style={{ textAlign: "right" }}
                        width="50%"
                        name="userType"
                        value={formState.userType}
                        onChange={handleInputChange}
                      >
                        <option value="Producer">Producer</option>
                        <option value="Artist">Artist</option>
                      </Select>
                    </Flex>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Profile Picture: </Td>
                  <Td>
                    <Flex justifyContent="right" alignItems="center">
                      <Input
                        type="file"
                        width="50%"
                        name="profilePicture"
                        style={{ textAlign: "right" }}
                        value={formState.profilePicture}
                        onChange={handleInputChange}
                      ></Input>
                    </Flex>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        );

      case "Account Settings":
        return (
          <>
            <TableContainer width="100%">
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>Email:</Td>
                    <Td>
                      <Flex justifyContent="right" alignItems="center">
                        <Input
                          width="50%"
                          name="email"
                          style={{ textAlign: "right" }}
                          value={formState.email}
                          onChange={handleInputChange}
                        ></Input>
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Password: </Td>
                    <Td>
                      <Flex justifyContent="right" alignItems="center">
                        <Button colorScheme="green" onClick={changePasswordState}>Change Password</Button>
                        {changePassword ? <Input
                          width="50%"
                          name="password"
                          style={{ textAlign: "right" }}
                          value={passwordField}
                          onChange={handlePasswordChange}
                        ></Input> : null}
                      </Flex>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Delete Account?</Td>
                    <Td>
                      <Flex justifyContent="right" alignItems="center">
                        <Button
                          colorScheme="red"
                          onClick={handleOpenDeleteModal}
                        >
                          Delete Account
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Modal
              isOpen={isDeleteModalOpen}
              onClose={handleCloseDeleteModal}
              size="sm"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Confirm Deletion</ModalHeader>
                <ModalBody>
                  Are you sure you want to delete this account and remove all
                  associated data?
                </ModalBody>
                <ModalFooter>
                  <Button
                    colorScheme="red"
                    mr={3}
                    onClick={handleDeleteAccount}
                  >
                    Confirm
                  </Button>
                  <Button colorScheme="blue" onClick={handleCloseDeleteModal}>
                    Cancel
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Flex
      width="100%"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <Heading>{title}</Heading>
      {renderContent()}
      <Button onClick={handleUpdate} mt="30px">
        Save Changes
      </Button>
    </Flex>
  );
};

export default SettingsComponent;
