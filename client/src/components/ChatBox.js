import React, { useState } from "react";
import { Box, Button, Flex, Icon } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import ChatWindow from "./ChatWindow"; // Import the chat window component
import auth from "../utils/auth";

import { AiOutlineMessage } from "react-icons/ai";

const ChatBox = () => {

    
    const user = auth.loggedIn() ? auth.getProfile() : null;


  // State to manage active chat
  const [activeChatId, setActiveChatId] = useState(null);
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);

  // Mock data for the user's chats
  const chats = [
    { id: 1, username: "Ron" },
    { id: 2, username: "Billy" },
  ];

  // Function to handle click on SingleChat button
  const handleChatClick = (chatId) => {
    setActiveChatId(chatId);
  };
  const toggleChatbox = () => {
    console.log(user.data._id)
    setActiveChatId(null);
    setIsChatboxOpen(!isChatboxOpen);
  };

  return (
    <Box position="fixed" bottom={0} right={0} p={4} zIndex={10000}>
      <Flex>
        {activeChatId && (
          <ChatWindow
            chatId={activeChatId}
            closeChat={() => setActiveChatId(null)}
            isChatBoxOpen={isChatboxOpen}
            userId={user.data._id}
            />
        )}

        <Flex flexDir="column" width="15em" justifyContent="end"
        alignItems="end" pl="10px">
          {/* Chatbox */}
          {isChatboxOpen && (
            <Box
              mt={2}
              p={4}
              borderWidth={1}
              bg="white"
              shadow="md"
              width="100%"
              borderRadius={20}
            >
              <Flex direction="column" gap={2}>
                {/* Map over the user's chats and render each chat as a SingleChat button */}
                {chats.map((chat) => (
                  <SingleChat
                    userId={user.data._id}
                    key={chat.id}
                    chatId={chat.id}
                    username={chat.username}
                    onChatClick={handleChatClick}
                    isChatBoxOpen={isChatboxOpen}
                  />
                ))}
              </Flex>
            </Box>
          )}<Box pt="10px">
          <Flex bg="blue.500" width="60px" height="60px" borderRadius={100} justifyContent="center" alignItems="center">
            {/* <Button > */}
            <Icon as={AiOutlineMessage} boxSize="50px" onClick={toggleChatbox} 
            cursor="pointer"
            
            /> {/* The boxSize is based on Chakra's sizing scale */}
            {/* </Button> */}
          </Flex>
          </Box>
        </Flex>
      </Flex>
      {/* Chat window (displayed conditionally) */}
    </Box>
  );
};

export default ChatBox;
