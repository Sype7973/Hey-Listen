// This is the main file for the portfolio website. It is the first file that is run when the website is loaded.
import React, { useState, useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// function App() {
//   const [currentPath] = useState(window.location.pathname);
//   const location = useLocation();

//   useEffect(() => {
//     console.log('currentPath', currentPath);
//     console.log('location', location);
//   }, [currentPath, location]);

//   return (
//     <ApolloProvider client={client}>
//       <ChakraProvider>
//         <BrowserRouter>
//           <App />
//         </BrowserRouter>
//       </ChakraProvider>
//     </ApolloProvider>
//   );
// }