import AppsIcon from "@mui/icons-material/Apps";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import {
  Badge,
  Box,
  Button,
  SvgIcon,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { ReactComponent as TrelloIcon } from "~/assets/trello.svg";
import Profiles from "~/components/AppBar/Menus/Profiles";
import Recent from "~/components/AppBar/Menus/Recent";
import Starred from "~/components/AppBar/Menus/Starred";
import Templates from "~/components/AppBar/Menus/Templates";
import Workspaces from "~/components/AppBar/Menus/Workspaces";
import ModeSelect from "../ModeSelect";

const AppBar = () => {
  return (
    <Box
      px={2}
      py={5}
      sx={{
        backgroundColor: "#fff",
        width: "100%",
        height: (theme) => theme.trelloCustom.appBarHeight,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <AppsIcon sx={{ color: "primary.main" }} />
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
            sx={{ color: "primary.main" }}
          />
          <Typography
            variant="span"
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "primary.main",
            }}
          >
            Trello
          </Typography>
        </Box>

        <Workspaces />
        <Recent />
        <Starred />
        <Templates />

        <Button variant="outlined">Create</Button>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <TextField
          id="outlined-search"
          label="Search..."
          type="search"
          size="small"
          variant="outlined"
        />
        <ModeSelect />

        <Tooltip title="Notifications">
          <Badge color="secondary" variant="dot" sx={{ cursor: "pointer" }}>
            <NotificationsNoneIcon sx={{ color: "primary.main" }} />
          </Badge>
        </Tooltip>

        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ cursor: "pointer" }} />
        </Tooltip>

        <Profiles />
      </Box>
    </Box>
  );
};

export default AppBar;
