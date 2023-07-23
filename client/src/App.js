// This is the main file for the portfolio website. It is the first file that is run when the website is loaded.
import React, { useEffect } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Home from "./pages/HomePage";
import PostDashboard from "./pages/PostDashboard";
import Login from "./pages/LoginForm";
import Signup from "./pages/SignupForm";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import MyProfile from "./pages/MyProfile";
import CreatePost from "./pages/CreatePost";
import MyPosts from "./pages/MyPosts";
import SearchBar from "./components/SearchBar";
import UpdatePost from "./pages/UpdatePost";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  // const [currentPath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    console.log("location changed to " + location.pathname);
  }, [location]);
  return (
    <ApolloProvider client={client}>
      <div>
        <ChakraProvider>
          <Flex>
            <Sidebar />
            <Box flex="1" zIndex="1">
            <SearchBar />
              {/* <Header currentPath={currentPath} /> */}
              {location.pathname === "/" && <Home />}
              {location.pathname === "/my-profile" && <MyProfile />}
              {location.pathname === "/post-dashboard" && <PostDashboard />}
              {location.pathname === "/login" && <Login />}
              {location.pathname === "/signup" && <Signup />}
              {location.pathname === "/my-posts" && <MyPosts />}
              {location.pathname === "/create-post" && <CreatePost />}
              {location.pathname === "/update-post/:id" && <UpdatePost />}
              <Footer />
            </Box>
          </Flex>
        </ChakraProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
