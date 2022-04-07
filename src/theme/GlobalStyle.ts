import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  html {
    min-height: 100vh;
  }
  body {
    background: linear-gradient(#f6f6f6, #eee, #f6f6f6);
    background-size: cover;
    background-repeat: no-repeat;
    
  }

  button, input, textarea {
    appearance: none;
    border: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;
