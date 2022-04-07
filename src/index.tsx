import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme, GlobalStyle } from "./theme";
import App from "./App";

function WrappedApp() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  );
}

ReactDom.render(<WrappedApp />, document.getElementById("root"));
