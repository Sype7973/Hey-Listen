import React from "react";
import { Button } from "@chakra-ui/react";

const SingleChat = ({ chatId, username, onChatClick, isChatBoxOpen }) => {
  // Function to handle button click
  const handleClick = () => {
    onChatClick(chatId);
  };

  return (
    <Button onClick={handleClick} width="100%">
      {username} {/* Display the username */}
    </Button>
  );
};

export default SingleChat;
