// // component to render a post into PostDashboard.js

// import React, { useEffect, useState } from "react";
// import { useQuery } from "@apollo/client";
// import { Box, Flex } from "@chakra-ui/react";
// import { QUERY_POSTS } from "../utils/queries";
// import Auth from "../utils/auth";

// // function that maps and renders posts
// const Posts = () => {
//   const { loading, data } = useQuery(QUERY_POSTS);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     if (data) {
//       setPosts(data.posts);
//     }
//   }, [data]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Box>
//       {posts &&
//         posts.map((post) => (
//           <Flex
//             key={post._id}
//             p={5}
//             shadow="md"
//             borderWidth="1px"
//             flex="1"
//             borderRadius="md"
//             flexDirection="column"
//             alignItems="center"
//             justifyContent="center"
//             textAlign="center"
//             bg="gray.50"
//             m={5}
//           >
//             <Box>
//               <h2>{post.postTitle}</h2>
//               <p>{post.postDescription}</p>
//               <p>{post.postType}</p>
//               <p>{post.username}</p>
//               <p>Budget: {post.budget}</p>
//               <p>Deadline: {post.deadline}</p>
//               <p>Created By: {post.userId}</p>
//               <p>Created At: {post.createdAt}</p>
//             </Box>
//           </Flex>
//         ))}
//     </Box>
//   );
// };

// export default Posts;