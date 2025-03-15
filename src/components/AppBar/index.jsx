import { Box } from "@mui/material";
import ModeSelect from "../ModeSelect";

const AppBar = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.light",
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ModeSelect />
    </Box>
  );
};

export default AppBar;
