// This is the main file for the portfolio website. It is the first file that is run when the website is loaded.
import React, { useEffect } from "react";
import { ChakraProvider, Box, Flex } from "@chakra-ui/react";
import { useLocation, Route, Routes } from "react-router-dom";
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
import Profile from "./pages/Profile";
import SearchPage from "./pages/SearchPage";
import Settings from "./pages/Settings";

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
          <Flex flexDirection="column">
            <Sidebar />
            <Box flex="1" zIndex="1">
            <SearchBar />
            <Routes>
              {/* <Header currentPath={currentPath} /> */}
              <Route path ="/" element={<Home />} />
              <Route path ="/my-profile" element={<MyProfile />} />
              <Route path ="/post-dashboard" element={<PostDashboard/>} />
              <Route path ="/login" element={<Login />} />
              <Route path ="/signup" element={<Signup />} />
              <Route path ="/my-posts" element={<MyPosts />} />
              <Route path ="/create-post" element={<CreatePost />} />              
              <Route path="/profile/:username" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/search" element={<SearchPage />} />
              </Routes>
            </Box>
            <Footer position="sticky" bottom={0}/>
          </Flex>
        </ChakraProvider>
      </div>
    </ApolloProvider>
  );
}

export default App;
