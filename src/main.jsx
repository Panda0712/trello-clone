import { NoSsr } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "~/App.jsx";
import theme from "~/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NoSsr>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </NoSsr>
  </React.StrictMode>
);
