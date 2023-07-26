import React from 'react';
import { Flex, Text, Link, useBreakpointValue } from '@chakra-ui/react';

const Footer = () => {
  const footerWidth = useBreakpointValue({ base: '100%', md: '100%', lg: '100%' });

  return (
    <Flex
      as="footer"
      position="relative"
      bottom={0}
      left={0}
      width={footerWidth}
      backgroundColor="#38B2AC"
      color="white"
      textAlign="center"
      padding="1.5rem"
      justifyContent="center"
    >
      <Text alignItems="center">
          Created By{' '}
          <Link href="https://github.com/Sype7973" color="white" isExternal>
            Adam Day
          </Link>{' '}
          and{' '}
          <Link href="https://github.com/Elibrer" color="white" isExternal>
            Elijah Brereton
          </Link>{' '}
          {'\uD83C\uDFB5'}
      </Text>
    </Flex>
  );
};

export default Footer;