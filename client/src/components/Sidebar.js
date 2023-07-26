import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Flex,
  Text,
  Divider,
  Avatar,
  Heading,
  Box,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { MdLibraryMusic, MdDashboard, MdLogin, MdLogout } from "react-icons/md";
import NavItem from "../components/NavItem";
import Auth from "../utils/auth";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useDisclosure } from "@chakra-ui/react";
import burgerIconWhite from "../assets/images/burgericonwhite.png";
import burgerIconGrey from "../assets/images/burgericongrey.png";
import ProducerPng from "../assets/images/Producer.png";
import ArtistPng from "../assets/images/Artist.png";

export default function Sidebar() {
  const [navSize] = useState("large");
  const [user, setUser] = useState(null);
  const [whiteBurgerColor, setBurgerColor] = useState(true);
  const { loading, data } = useQuery(GET_ME);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const navHeight = useBreakpointValue({ base: '90vh', sm: '90vh', md: '95vh', lg: '95vh' });
  const navWidth = useBreakpointValue({ base: '160px', sm: '160px', md: '200px', lg: '200px' });


  const location = useLocation();
// use effect to fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (data) {
          if (data.me && data.me !== null) {
            setUser(data.me);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      }
    };
    fetchUserProfile();
  }, [data]);
// use effect to change burger icon color
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/my-profile") {
      setBurgerColor(true);
      console.log(whiteBurgerColor);
    } else {
      setBurgerColor(false);
      console.log(whiteBurgerColor);
    }
  }, [location.pathname, whiteBurgerColor]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Image
        src={whiteBurgerColor ? burgerIconGrey : burgerIconWhite}
        p="5px"
        zIndex="3"
        position="absolute"
        background={
          whiteBurgerColor ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)"
        }
        boxSize="60px"
        ml="5.3vw"
        mt="5vh"
        _hover={
          whiteBurgerColor ? { background: "white" } : { background: "black" }
        }
        icon={<FiMenu />}
        onClick={onOpen}
        transition="0.2s ease-in-out"
        borderRadius="10%"
      />
      <Flex>
        <>
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent
              style={{ width: navWidth }}
              align="center"
              ml="5"
              mt="2.5vh"
              h={navHeight}
              border="1px solid rgba(0, 0, 0, 0.08)"
              boxShadow="8px 4px 6px 0 rgba(0, 0, 0, 0.3)"
              borderRadius={navSize === "small" ? "15px" : "30px"}
              flexDir="column"
              justifyContent="space-between"
              zIndex="2"
              // transition="0.3s ease-in-out"
            >
              <DrawerCloseButton m="10px" />
              <Flex
                p="5%"
                flexDir="column"
                w="100%"
                h="100%"
                alignItems={navSize === "small" ? "center" : "flex-start"}
                as="nav"
                transition="0.3s ease-in-out"
              >
                <Box w="100%" mt="20px">
                  {" "}
                  <Link to="/">
                    {" "}
                    <NavItem
                      navSize={navSize}
                      icon={FiHome}
                      title="Home"
                      isActive={location.pathname === "/"}
                    />
                  </Link>
                  <Link to="/my-profile">
                    {" "}
                    <NavItem
                      navSize={navSize}
                      icon={FiUser}
                      title="Profile"
                      isActive={location.pathname === "/my-profile"}
                    />
                  </Link>
                  <Link to="/post-dashboard">
                    {" "}
                    <NavItem
                      navSize={navSize}
                      icon={MdDashboard}
                      title="Dashboard"
                      isActive={location.pathname === "/post-dashboard"}
                    />
                  </Link>
                  <Link to="/my-posts">
                    {" "}
                    <NavItem
                      navSize={navSize}
                      icon={MdLibraryMusic}
                      title="My Posts"
                      isActive={location.pathname === "/my-posts"}
                    />
                  </Link>
                </Box>
                <Flex
                  flex="1"
                  w="100%"
                  flexDir="column"
                  alignItems={navSize === "small" ? "center" : "flex-start"}
                  justifyContent="flex-end"
                  mb="10%"
                >
                  <Flex
                    mt={4}
                    align="center"
                    w="100%"
                    mb="20px"
                    justifyContent="center"
                  >
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
                      flexDir="column"
                      ml={4}
                      display={navSize === "small" ? "none" : "flex"}
                      transition="0.3s ease-in-out"
                    >
                      <Heading as="h3" size="sm">
                        {user ? user.username : ""}
                      </Heading>
                      <Text color="gray">{user ? user.userType : ""}</Text>
                    </Flex>
                  </Flex>

                  <Divider display={navSize === "small" ? "none" : "flex"} />

                  <Box w="100%">
                    {user ? (
                      <Link to="/" onClick={() => Auth.logout()}>
                        {" "}
                        <NavItem
                          navSize={navSize}
                          icon={MdLogout}
                          title="Logout"
                          isActive={location.pathname === "/logout"}
                          position="fixed"
                          bottom="10px"
                        />
                      </Link>
                    ) : (
                      <Box>
                        <Link to="/signup">
                          {" "}
                          <NavItem
                            navSize={navSize}
                            icon={BsPencilSquare}
                            title="Signup"
                            isActive={location.pathname === "/signup"}
                            position="fixed"
                            bottom="10px"
                          />
                        </Link>
                        <Link to="/login">
                          {" "}
                          <NavItem
                            navSize={navSize}
                            icon={MdLogin}
                            title="Login"
                            isActive={location.pathname === "/login"}
                            position="fixed"
                            bottom="10px"
                          />
                        </Link>
                      </Box>
                    )}
                  </Box>
                </Flex>
              </Flex>
            </DrawerContent>
          </Drawer>
        </>
      </Flex>
    </Box>
  );
}
