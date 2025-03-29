import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// config height for the app bar
const APP_BAR_HEIGHT = "60px";
// config height for the board bar
const BOARD_BAR_HEIGHT = "65px";
// config height for the board content
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`;
// config height for the column header
const COLUMN_HEADER_HEIGHT = "50px";
// config height for the column footer
const COLUMN_FOOTER_HEIGHT = "50px";

// Create a theme instance.
const theme = extendTheme({
  // custom height variables for reuseable
  trelloCustom: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
  },
  colorSchemes: {
    light: {},
    dark: {},
  },
  // override the css root for the components of MaterialUI
  components: {
    // general css of the project
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          position: "relative",
          height: "100vh",
          // config scrollbar css for the entire web
          "*::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "#dcdde1",
            borderRadius: "8px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "white",
          },
        },
      },
    },
    // override button components css of MaterialUI
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontSize: "1rem",
          borderWidth: "0.5px",
          "&:hover": {
            borderWidth: "1px",
          },
        },
      },
    },
    // override input label components css of MaterialUI
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
        },
      },
    },
    // override typography components css of MaterialUI
    MuiTypography: {
      styleOverrides: {
        root: {
          "&.MuiTypography-body1": {
            fontSize: "0.875rem",
          },
        },
      },
    },
    // override the outlined input components css of MaterialUI
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          "& fieldset": {
            borderWidth: "0.5px !important",
          },
          "&:hover fieldset": {
            borderWidth: "1px !important",
          },
          "&.Mui-focused fieldset": {
            borderWidth: "1px !important",
          },
        },
      },
    },
  },
});

export default theme;
