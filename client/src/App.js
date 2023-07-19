// This is the main file for the portfolio website. It is the first file that is run when the website is loaded.
import React, {useState, useEffect} from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Home from './pages/HomePage';
import PostDashboard from './pages/PostDashboard';
import Login from './pages/LoginForm';
import Signup from './pages/SignupForm';
import Header from './components/Header';
import Footer from './components/Footer';

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

function App() {
  const [currentPath] = useState(window.location.pathname);
  const location = useLocation();

useEffect(() => {
  console.log('location changed to ' + location.pathname);
}, [location]);
  return (
    <ApolloProvider client={client}>
        <div>
        <ChakraProvider>
          <Header currentPath={currentPath} />
          {location.pathname === '/' && <Home />}
          {location.pathname === '/postdashboard' && <PostDashboard />}
          {location.pathname === '/login' && <Login />}
          {location.pathname === '/signup' && <Signup />}
          <Footer />
        </ChakraProvider>
        </div>
    </ApolloProvider>
  );

}

export default App;