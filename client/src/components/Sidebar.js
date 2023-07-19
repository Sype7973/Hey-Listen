import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  Box,
} from "@chakra-ui/react";
import { FiMenu, FiHome, FiUser } from "react-icons/fi";
import { BsPencilSquare } from "react-icons/bs";
import { MdLibraryMusic, MdDashboard, MdLogin } from "react-icons/md";
import NavItem from "../components/NavItem";

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large");
  const [activeLink, setActiveLink] = useState("/");

  const handleNavItemClick = (link) => {
    setActiveLink(link);
  };

  return (
    <Flex
      bg="white"
      align="center"
      pos="absolute" // Use absolute positioning to overlay the sidebar on top of the main content
      left="5"
      top="2.5vh" // Adjust the top positioning as needed
      h="95vh"
      border="1px solid rgba(0, 0, 0, 0.08)"
      boxShadow="8px 4px 6px 0 rgba(0, 0, 0, 0.3)"
      borderRadius={navSize === "small" ? "15px" : "30px"}
      w={navSize === "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      zIndex="2"
      transition="0.3s ease-in-out"
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        h="100%"
        alignItems={navSize === "small" ? "center" : "flex-start"}
        as="nav"
        transition="0.3s ease-in-out"
      >
        <IconButton
          background="none"
          mt={5}
          _hover={{ background: "none" }}
          icon={<FiMenu />}
          onClick={() => {
            if (navSize === "small") changeNavSize("large");
            else changeNavSize("small");
          }}
          transition="0.3s ease-in-out"
        />

        <Box w="100%">
          {" "}
          <Link to="/" onClick={() => handleNavItemClick("/")}>
            {" "}
            <NavItem
              navSize={navSize}
              icon={FiHome}
              title="Home"
              isActive={activeLink === "/"}
            />
          </Link>
          <Link
            to="/myprofile"
            onClick={() => handleNavItemClick("/myprofile")}
          >
            {" "}
            <NavItem
              navSize={navSize}
              icon={FiUser}
              title="Profile"
              isActive={activeLink === "/myprofile"}
            />
          </Link>
          <Link
            to="/dashboard"
            onClick={() => handleNavItemClick("/dashboard")}
          >
            {" "}
            <NavItem
              navSize={navSize}
              icon={MdDashboard}
              title="Dashboard"
              isActive={activeLink === "/dashboard"}
            />
          </Link>
          <Link to="/post" onClick={() => handleNavItemClick("/post")}>
            {" "}
            <NavItem
              navSize={navSize}
              icon={MdLibraryMusic}
              title="Posts"
              isActive={activeLink === "/post"}
            />
          </Link>
        </Box>
        <Flex
          flex="1" // Occupy all available space and push its children to the bottom
          w="100%"
          flexDir="column"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          justifyContent="flex-end"
          mb="10%"
        >

          <Flex mt={4} align="center" w="100%" mb="20px" justifyContent="center">
            <Avatar size="sm" src="avatar-1.jpg" />
            <Flex
              flexDir="column"
              ml={4}
              display={navSize === "small" ? "none" : "flex"}
              transition="0.3s ease-in-out"
            >
              <Heading as="h3" size="sm">
                USERNAME
              </Heading>
              <Text color="gray">usertype</Text>
            </Flex>
          </Flex>
          
          <Divider display={navSize === "small" ? "none" : "flex"} />

          <Box w="100%">
            <Link to="/signup" onClick={() => handleNavItemClick("/signup")}>
              {" "}
              <NavItem
                navSize={navSize}
                icon={BsPencilSquare}
                title="Signup"
                isActive={activeLink === "/signup"}
              />
            </Link>
            <Link to="/login" onClick={() => handleNavItemClick("/login")}>
              {" "}
              <NavItem
                navSize={navSize}
                icon={MdLogin}
                title="Login"
                isActive={activeLink === "/login"}
              />
            </Link>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
