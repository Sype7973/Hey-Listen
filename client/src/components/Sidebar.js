import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Image,
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

export default function Sidebar() {
  const [navSize] = useState("large");
  const [user, setUser] = useState(null);
  const [whiteBurgerColor, setBurgerColor] = useState(true);
  const { data } = useQuery(GET_ME);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (data.me) {
          setUser(data.me);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      }
    };
    fetchUserProfile();
  }, [data]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/my-profile") {
      setBurgerColor(true);
      console.log(whiteBurgerColor);
    } else {
      setBurgerColor(false);
      console.log(whiteBurgerColor);
    }
  }, [location.pathname]);

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
              style={{ width: "200px" }}
              align="center"
              ml="5"
              mt="2.5vh"
              h="95vh"
              border="1px solid rgba(0, 0, 0, 0.08)"
              boxShadow="8px 4px 6px 0 rgba(0, 0, 0, 0.3)"
              borderRadius={navSize === "small" ? "15px" : "30px"}
              flexDir="column"
              justifyContent="space-between"
              zIndex="2"
              // transition="0.3s ease-in-out"
            >
              <DrawerCloseButton  m="10px"/>
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
                  <Link to="/post">
                    {" "}
                    <NavItem
                      navSize={navSize}
                      icon={MdLibraryMusic}
                      title="Posts"
                      isActive={location.pathname === "/post"}
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
                    <Avatar size="sm" src="avatar-1.jpg" />
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
                          />
                        </Link>
                        <Link to="/login">
                          {" "}
                          <NavItem
                            navSize={navSize}
                            icon={MdLogin}
                            title="Login"
                            isActive={location.pathname === "/login"}
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
