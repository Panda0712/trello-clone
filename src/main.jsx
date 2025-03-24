import { NoSsr } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ConfirmProvider } from "material-ui-confirm";
import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "~/App.jsx";
import theme from "~/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NoSsr>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider
          defaultOptions={{
            allowClose: false,
            dialogProps: {
              maxWidth: "xs",
            },
            confirmationButtonProps: {
              color: "secondary",
              variant: "outlined",
            },
            cancellationButtonProps: {
              color: "inherit",
            },
            buttonOrder: ["cancel", "confirm"],
          }}
        >
          <CssBaseline />
          <App />
          <ToastContainer position="bottom-left" theme="colored" />
        </ConfirmProvider>
      </CssVarsProvider>
    </NoSsr>
  </React.StrictMode>
);
