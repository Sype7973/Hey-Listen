import React, { useState, useEffect } from "react";
import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import SingleChat from "./SingleChat";
import ChatWindow from "./ChatWindow";
import auth from "../utils/auth";
import { GET_ME } from "../utils/queries";
import { useRefetchContext } from "../utils/refetchContext";

import { useQuery } from "@apollo/client";

import { AiOutlineMessage } from "react-icons/ai";

const ChatBox = ({
  isChatboxOpen,
  toggleChatbox,
  activeChatId,
  setActiveChatId,
  handleChatClick,
  activeOtherUsername,
  activeOtherUserId,
  refetchCallback,
}) => {
  const { data, loading, error, refetch } = useQuery(GET_ME);
  const user = auth.loggedIn() ? auth.getProfile() : null;
  const [chats, setChats] = useState([]);

  const { refetchChatboxData } = useRefetchContext();

  useEffect(() => {
    if (data && data.me) {
      setChats(data.me.conversations);
    }
    refetch()
    refetchCallback(refetch);
    refetchChatboxData(refetch);
    console.log("Refetch function set in ChatBox.js");
  }, [data]);

  return (
    <Box position="fixed" bottom={0} right={0} p={4} zIndex={10000}>
      <Flex>
        {activeChatId && (
          <ChatWindow
            chatId={activeChatId}
            closeChat={() => setActiveChatId(null)}
            isChatBoxOpen={isChatboxOpen}
            userId={user.data._id}
            otherUsername={activeOtherUsername}
            otherUserId={activeOtherUserId}
          />
        )}

        <Flex
          flexDir="column"
          width="15em"
          justifyContent="end"
          alignItems="end"
          pl="10px"
        >
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
                {chats && chats.length > 0 ? (
                  chats.map((chat) => (
                    <SingleChat
                      key={chat.conversationId}
                      convoId={chat.conversationId}
                      otherUsername={chat.otherUsername}
                      otherUserId={chat.otherUserId}
                      onChatClick={handleChatClick}
                      isChatBoxOpen={isChatboxOpen}
                    />
                  ))
                ) : (
                  <Text>
                    No chats. Go to someone's profile to start chatting!
                  </Text>
                )}
              </Flex>
            </Box>
          )}
          <Box pt="10px">
            <Flex
              bg="blue.500"
              width="60px"
              height="60px"
              borderRadius={100}
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={AiOutlineMessage}
                boxSize="50px"
                onClick={toggleChatbox}
                cursor="pointer"
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ChatBox;
