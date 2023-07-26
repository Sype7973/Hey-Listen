import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Card,
  CardBody,
  Text,
  Divider,
  Avatar,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Icon,
} from "@chakra-ui/react";
import { GET_ME } from "../utils/queries";
import SettingsComponent from "../components/SettingsComponent";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import ArtistPng from "../assets/images/Artist.png";
import ProducerPng from "../assets/images/Producer.png";

const Settings = () => {
  const { data, refetch } = useQuery(GET_ME);
  const [user, setUser] = useState(null);
  const [buttonActive, setButtonActive] = useState("Profile");

  const [selectedTabTitle, setSelectedTabTitle] = useState("Profile Settings");
  const [inputChange, setInputChange] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
// handles tab change
  const handleTabChange = (tab) => {
    if (!inputChange) {
      switch (tab) {
        case 0:
          console.log("tab 1");
          setChangePassword(false);
          setButtonActive("Profile");
          setSelectedTabTitle("Profile Settings");
          break;
        case 1:
          console.log("tab 2");
          setChangePassword(false);
          setButtonActive("Account");
          setSelectedTabTitle("Account Settings");
          break;
        default:
          setChangePassword(false);
          setSelectedTabTitle("Profile Settings");
          break;
      }
    } else {
      handleOpenUpdateModal();
    }
  };
// use effect to refetch data
  useEffect(() => {
    const handleInitialRefetch = async () => {
      await refetch();
    };
    handleInitialRefetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
// use effect to set user
  useEffect(() => {
    if (data && data.me) {
      setUser(data.me);
    }
  }, [data]);
// handles open update modal
  const handleOpenUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };
// handles close update modal
  const handleCloseUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <Box background="teal.500">
      {user ? (
        <Flex direction="column" justify="center" alignItems="center">
          <Flex
            my="20px"
            width="80%"
            direction="column"
            justify="center"
            alignItems="center"
            border="8px"
            borderColor="black"
          >
            <Card
              width="100%"
              h="auto"
              bg="black"
              color="teal.500"
              borderRadius="none"
            >
              <CardBody textAlign="center">
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Flex width="20%">
                    <Link to="/my-profile">
                      <Icon as={MdOutlineKeyboardBackspace} boxSize="50px" />
                    </Link>
                  </Flex >
                  {user && user.userType === "Producer" ? (
                <Avatar 
                  width="10%"
                  height="auto"
                  size="2xl"
                  src={user ? ProducerPng : ProducerPng}
                  />
                  ) : (
                  <Avatar
                 width="10%"
                 height="auto"
                  size="2xl"
                  src={user ? ArtistPng : ArtistPng}
                  />
                  )}
                  <Flex
                    width="60%"
                    direction="column"
                    textAlign="center"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Heading color="teal.500" letterSpacing={10} size="4xl">
                      {user.username}
                    </Heading>
                    <Text letterSpacing={5}>{user.userType}</Text>
                  </Flex>
                </Flex>
              </CardBody>
            </Card>

            <Flex
              justifyContent="center"
              bg="teal.500"
              direction="row"
              width="100%"
              borderRadius="none"
            >
              <Flex
                minHeight="50vh"
                alignItems="center"
                bg="white"
                direction="column"
                width="30%"
              >
                {" "}
                <Flex
                  mt={4}
                  flexDir="column"
                  align="center"
                  w="100%"
                  mb="20px"
                  justifyContent="center"
                >
                  <Flex
                    pt="20px"
                    flexDir="column"
                    align="center"
                    transition="0.3s ease-in-out"
                  >
                    <Button
                      variant={buttonActive === "Profile" ? "solid" : "ghost"}
                      bg={buttonActive === "Profile" ? "teal.500" : "none"}
                      color={buttonActive === "Profile" ? "white" : "black"}
                      my="10px"
                      width="100%"
                      onClick={() => handleTabChange(0)}
                    >
                      Profile Settings
                    </Button>
                    <Divider borderWidth="0.5px" borderColor="black" />
                    <Button
                      variant={buttonActive === "Account" ? "solid" : "ghost"}
                      color={buttonActive === "Account" ? "white" : "black"}
                      bg={buttonActive === "Account" ? "teal.500" : "none"}
                      my="10px"
                      width="100%"
                      onClick={() => handleTabChange(1)}
                    >
                      Account Settings
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
              <Flex w="100%">
                <Card w="100%" h="auto" borderRadius="none">
                  <CardBody>
                    <Flex alignItems="center" justifyContent="center">
                      <SettingsComponent
                        title={selectedTabTitle}
                        userData={user}
                        setInputChange={setInputChange}
                        setChangePassword={setChangePassword}
                        changePassword={changePassword}
                        refetch={refetch}
                      />
                    </Flex>
                  </CardBody>
                </Card>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex
          minHeight="100vh"
          alignItems="center"
          bg="teal.500"
          direction="column"
        >
          <Card my="auto" width="auto" h="auto">
            <CardBody textAlign="center">
              <Heading>Not Logged In!</Heading>
            </CardBody>
          </Card>
        </Flex>
      )}

      <Modal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>Please save all changes before switching tabs.</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleCloseUpdateModal}>
              Back
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Settings;
