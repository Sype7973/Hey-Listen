import React from "react";
import { Flex, Text, Icon, Menu, MenuButton, Box } from "@chakra-ui/react";

export default function NavItem({ icon, title, isActive, navSize }) {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Box
          bg={isActive ? "teal.500" : "transparent"}
          color={isActive ? "white" : "gray.500"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#AEC8CA" }}
          w={navSize === "large" && "100%"}
        >
          <MenuButton w="100%">
            <Flex>
              <Icon
                as={icon}
                fontSize="xl"
                color={isActive ? "white" : "gray.500"}
              />
              <Text ml={5} display={navSize === "small" ? "none" : "flex"}>
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Box>
      </Menu>
    </Flex>
  );
}
