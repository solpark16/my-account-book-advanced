import React from "react";
import Router from "./shared/Router";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { AuthProvider } from "./context/AuthContext";

const GlobalStyle = createGlobalStyle`
  ${reset}
  body{
    background-color: #eb6530;
  }
   a {color:#000; text-decoration: none; outline: none} a:hover, a:active {text-decoration: none; color:#000;}

`;
const App = () => {
  return (
    <>
      <GlobalStyle />
      <AuthProvider>
        <Router />
      </AuthProvider>
    </>
  );
};

export default App;
