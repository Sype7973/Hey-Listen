import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Flex, Text, Input, FormControl } from "@chakra-ui/react";
import io from "socket.io-client";
import { useLocation, Route, Routes } from "react-router-dom";
import getSocketInstance from "../utils/socket";

const ChatWindow = ({
  chatId,
  closeChat,
  isChatBoxOpen,
  userId,
  otherUsername,
  otherUserId,
}) => {
  const socket = getSocketInstance(chatId);

  const [inputValue, setInputValue] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [serverOffset, setServerOffset] = useState(0);

  const chatContainerRef = useRef(null); // Reference to the chat container

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) {
      // Create the message object
      const message = {
        content: inputValue,
        sender: userId,
        receiver: otherUserId,
      };

      // Emit the message to the server using chatId as the room ID
      socket.emit("chat message", { roomId: chatId, message });

      // Clear the input field
      setInputValue("");
    }
  };

  useEffect(() => {
    if (chatId) {
      // Join the chat room using the chatId as the room ID
      socket.emit("join room", chatId);

      // Load previous messages
      socket.emit("load previous messages", {
        sender: userId,
        receiver: otherUserId,
      });
    }

    const handlePreviousMessages = (messages) => {
      setMessagesList(messages.messages);
    };

    socket.on("previous messages", handlePreviousMessages);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("previous messages", handlePreviousMessages);
      // Leave the room when the component unmounts
      socket.emit("leave room", chatId);
    };
  }, [chatId, userId]);

  useEffect(() => {
    // Set up the event listener
    const handleChatMessage = (
      { content, sender, receiver },
      savedMessageId
    ) => {
      // Update the `messagesList` state with the new message
      setMessagesList((prevMessages) => [
        ...prevMessages,
        { content, sender, receiver, id: savedMessageId },
      ]);

      // Scroll to the bottom of the chat
      window.scrollTo(0, document.body.scrollHeight);
    };

    // Listen for the 'chat message' event
    socket.on("chat message", handleChatMessage);

    // Cleanup the event listener when the component unmounts
    return () => {
      socket.off("chat message", handleChatMessage);
    };
  }, []);

  // const [currentPath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messagesList]);

  useEffect(() => {
    console.log("location changed to " + location.pathname);
  }, [location]);

  return (
    <>
      {isChatBoxOpen && (
        <Flex
          width="20em"
          height="30em"
          border="2px"
          borderColor="#319795"
          borderRadius={20}
          bg="white"
        >
          <Box width="100%" height="100%">
            <Flex
              borderWidth={1}
              borderRadius={20}
              bg="white"
              shadow="md"
              height="100%"
              justifyContent="space-between"
              flexDir="column"
            >
              <Flex
                bg="gray.100"
                justifyContent="space-between"
                borderTopRadius={20}
                flexDir="row"
                alignItems="center"
              >
                <Text pl="10px">{otherUsername}</Text>
                <Button
                  bg="gray.100"
                  onClick={closeChat}
                  borderTopRightRadius={20}
                >
                  X
                </Button>
              </Flex>
              <Flex className="App" flexDir="row">
                <Flex
                  as="header"
                  className="App-header"
                  flexDir="column"
                  justifyContent="end"
                  width="100%"
                >
                  <Box width="100%">
                    <ul
                      id="messages"
                      style={{
                        height: "24em",
                        overflowY: "auto",
                        padding: "10px",
                      }}
                      ref={chatContainerRef}
                    >
                      {messagesList.map((msg, index) => (
                        <li key={index} style={{ listStyleType: "none" }}>
                          <Flex
                            justify={msg.sender === userId ? "end" : "start"}
                            borderRadius={100}
                            p={0.8}
                          >
                            <Text
                              borderRadius={20}
                              //   width="80%"
                              px="10px"
                              bg={msg.sender === userId ? "#38b2ac" : "#319795"}
                              ml={msg.sender === userId ? "0px" : "5px"}
                              mr={msg.sender === userId ? "5px" : "0px"}
                              textAlign="left"
                            //   textAlign={
                            //     msg.sender === userId ? "right" : "left"
                            //   }
                            >
                              {msg.content}
                            </Text>
                          </Flex>
                        </li>
                      ))}
                    </ul>
                  </Box>
                  <FormControl
                    id="form"
                    as="form"
                    action=""
                    // inputValue={setInputValue}
                    onSubmit={handleSubmit}
                    onChange={handleInputChange}
                  >
                    <Flex justifyContent="row">
                      <Input
                        id="input"
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleInputChange}
                        borderBottomLeftRadius={16}
                        borderTopLeftRadius={0}
                        borderRightRadius={0}
                      />{" "}
                      <Button
                        type="submit"
                        onClick={handleSubmit}
                        borderBottomRightRadius={20}
                        borderLeftRadius={0}
                      >
                        Send
                      </Button>
                    </Flex>
                  </FormControl>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ChatWindow;
