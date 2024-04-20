import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Text, Input, FormControl } from "@chakra-ui/react";
import io from "socket.io-client";
import { useLocation, Route, Routes } from "react-router-dom";

const ChatWindow = ({ chatId, closeChat, isChatBoxOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [serverOffset, setServerOffset] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const socket = io("http://localhost:3001", {
    auth: {
      serverOffset: 0,
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    // socket.emit("chat message",{
    //    username: 'ron'
    //   });

    if (inputValue) {
      // Emit the message to the server
      socket.emit("chat message", {
        content: inputValue,
        sender: "6623df58b9c2d18233a4a241", // Provide the sender's ID or name
        receiver: "6623df72b9c2d18233a4a243", // Provide the receiver's ID or name
      });

      // Clear the input field
      setInputValue("");
    }
  };

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
    console.log("location changed to " + location.pathname);
  }, [location]);

  return (
    <>
      {isChatBoxOpen && (
        <Flex
          width="15em"
          height="20em"
          border="2px"
          borderColor="#319795"
          borderRadius={20}
          bg="white"
          
        >
          <Box width="100%" height="100%"
          >
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
                justifyContent="end"
                borderTopRadius={20}
                flexDir="column"
                alignItems="end"
              >
                <Button
                  bg="gray.100"
                  onClick={closeChat}
                  borderTopRightRadius={20}
                >
                  X
                </Button>
              
              <Flex direction="column" gap={2}                 bg="white" width="100%"
>
                <Text>{chatId}</Text>
              </Flex>
              </Flex>
              <Flex className="App" flexDir="row" >
                <Flex as="header" className="App-header" flexDir="column" justifyContent="end">
                  <Box width="100%" bg="slateGray">
                    <ul id="messages">
                      {messagesList.map((msg, index) => (
                        <li key={index}>
                          <div>{msg.content}</div>
                        </li>
                      ))}
                    </ul>
                  </Box>
                  <FormControl
                    id="form"
                    as="form"
                    action=""
                    inputValue={setInputValue}
                    onSubmit={handleSubmit}
                    onChange={handleInputChange}
                  >
                    <Flex justifyContent="row">
                      <Input
                        id="input"
                        autoComplete="off"
                        value={inputValue}
                        onChange={handleInputChange}
                        borderBottomLeftRadius={20}
                      />{" "}
                      <Button type="submit" onClick={handleSubmit}
                                              borderBottomRightRadius={20}
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
