import CssBaseline from "@mui/material/CssBaseline";
import { NoSsr } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ConfirmProvider } from "material-ui-confirm";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "~/App.jsx";
import { store } from "~/redux/store";
import theme from "~/theme";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
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
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
