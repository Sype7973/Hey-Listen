import React from 'react';
import { Flex, Text, Link } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex
      as="footer"
      position="relative"
      bottom={0}
      left={0}
      width="100%"
      backgroundColor="#38B2AC"
      color="white"
      textAlign="center"
      padding="1.5rem"
      justifyContent="center"
    >
      <Text alignItems="center">
        <p>
          Created By{' '}
          <Link href="https://github.com/Sype7973" color="white" isExternal>
            Adam Day
          </Link>{' '}
          and{' '}
          <Link href="https://github.com/Elibrer" color="white" isExternal>
            Elijah Brereton
          </Link>{' '}
          {'\uD83C\uDFB5'}
        </p>
      </Text>
    </Flex>
  );
};

export default Footer;