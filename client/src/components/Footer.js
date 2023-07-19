import React from 'react';
import { Flex, Link } from '@chakra-ui/react';

// custom styles to keep footer at the bottom of the page
const customStyles = {
  footer: {
    left: 0,
    bottom: 0,
    width: '100%',
    color: 'white',
    textAlign: 'center',
  },
};

export default function Footer() {
  return (
    <footer id='footer--pin' style={customStyles.footer}>
      <Flex justify="center" py={4}>
        <Link href="mailto:adam.day7973@gmail.com" mx={2}>
          <img src="https://img.icons8.com/color/48/000000/gmail.png" alt="Email" />
        </Link>
        <Link href="https://github.com/Sype7973" target="_blank" rel="noopener noreferrer" mx={2}>
          <img src="https://img.icons8.com/color/48/000000/github--v1.png" alt="GitHub" />
        </Link>
        <Link href="https://au.linkedin.com/in/adam-day-lightineasy" target="_blank" rel="noopener noreferrer" mx={2}>
          <img src="https://img.icons8.com/color/48/000000/linkedin.png" alt="LinkedIn" />
        </Link>
      </Flex>
    </footer>
  );
}
