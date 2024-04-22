import React from "react";
import { Button } from "@chakra-ui/react";

const SingleChat = ({ convoId, otherUsername, otherUserId, onChatClick, isChatBoxOpen }) => {
    
  // Function to handle button click
  const handleClick = () => {
    console.log(convoId)
    console.log(otherUsername)
    console.log(otherUserId)
    console.log(onChatClick)
    console.log(isChatBoxOpen)

    onChatClick(convoId, otherUsername, otherUserId);
  };

  return (
    <Button onClick={handleClick} width="100%">
      {otherUsername} {/* Display the username */}
    </Button>
  );
};

export default SingleChat;
