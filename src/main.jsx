import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import { GlobalStyles, NoSsr } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { ConfirmProvider } from "material-ui-confirm";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "~/App.jsx";
import { store } from "~/redux/store";
import theme from "~/theme";

const persistor = persistStore(store);

// Inject store skills
import { injectStore } from "~/utils/authorizeAxios";
injectStore(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <NoSsr>
          <PersistGate persistor={persistor}>
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
                <GlobalStyles
                  styles={{
                    a: {
                      textDecoration: "none",
                    },
                  }}
                />
                <CssBaseline />
                <App />
                <ToastContainer position="bottom-left" theme="colored" />
              </ConfirmProvider>
            </CssVarsProvider>
          </PersistGate>
        </NoSsr>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
