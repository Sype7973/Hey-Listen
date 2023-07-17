import React from 'react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
// import ReactDOM from 'react-dom';

// v18 react-dom/server

import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(

  <ChakraProvider>
    <BrowserRouter>
    <App />
  </BrowserRouter>
</ChakraProvider>

);