// import React from 'react'
// import {
//     Flex,
//     Heading,
//     Text,
//     Icon
// } from '@chakra-ui/react'

// export default function NavHoverBox({ title, icon, description }) {
//     return (
//         <>
//             <Flex
//                 pos="absolute"
//                 mt="calc(100px - 7.5px)"
//                 ml="-10px"
//                 mr="0"
//                 width={100}
//                 height={0}
//                 borderTop="10px solid transparent"
//                 borderBottom="10px solid transparent"
//                 borderRight="10px solid #82AAAD"
//             />
//             <Flex
//                 h={200}
//                 w="100%"
//                 mr="0px"
//                 flexDir="column"
//                 alignItems="center"
//                 justify="center"
//                 backgroundColor="#82AAAD"
//                 borderRadius="10px"
//                 color="#fff"
//                 textAlign="center"
//             >
//                 <Icon as={icon} fontSize="3xl" mb={4} />
//                 <Heading size="md" fontWeight="normal">{title}</Heading>
//                 <Text>{description}</Text>
//             </Flex>
//         </>
//     )
// }