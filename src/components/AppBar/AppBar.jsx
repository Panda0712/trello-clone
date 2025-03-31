import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Box, Button, SvgIcon, Tooltip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TrelloIcon from "~/assets/trello.svg?react";
import Profiles from "~/components/AppBar/Menus/Profiles";
import Recent from "~/components/AppBar/Menus/Recent";
import Starred from "~/components/AppBar/Menus/Starred";
import Templates from "~/components/AppBar/Menus/Templates";
import Workspaces from "~/components/AppBar/Menus/Workspaces";
import Notifications from "~/components/AppBar/Notifications/Notifications";
import AutoCompleteSearchBoard from "~/components/AppBar/SearchBoards/AutoCompleteSearchBoard";
import ModeSelect from "../ModeSelect/ModeSelect";

const AppBar = () => {
  return (
    <Box
      px={2}
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        // custom app bar height, access to the theme of theme.js
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Link to="/boards">
          <Tooltip title="Board List">
            <AppsIcon sx={{ color: "white", verticalAlign: "middle" }} />
          </Tooltip>
        </Link>
        <Link to="/">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
            }}
          >
            <SvgIcon
              component={TrelloIcon}
              inheritViewBox
              fontSize="small"
              sx={{ color: "white" }}
            />
            <Typography
              variant="span"
              sx={{
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Trello
            </Typography>
          </Box>
        </Link>

        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
          <Workspaces />
          <Recent />
          <Starred />
          <Templates />
          <Button sx={{ color: "white" }} startIcon={<LibraryAddIcon />}>
            Create
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AutoCompleteSearchBoard />
        <ModeSelect />

        <Notifications />

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
