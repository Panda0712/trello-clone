import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FilterListIcon from "@mui/icons-material/FilterList";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import VpnLockIcon from "@mui/icons-material/VpnLock";
import { Avatar, AvatarGroup, Box, Button, Chip, Tooltip } from "@mui/material";
import { capitalizeFirstLetter } from "~/utils/formatters";

const MENU_STYLES = {
  color: "white",
  backgroundColor: "transparent",
  border: "none",
  paddingX: "5px",
  borderRadius: "4px",
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "&:hover": {
    bgcolor: "primary.50",
  },
};

const BoardBar = ({ board }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardBarHeight,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        paddingX: 2,
        overflowX: "auto",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={MENU_STYLES}
            icon={<DashboardIcon />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={`${capitalizeFirstLetter(board?.type)} Workspace`}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add to Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{
            color: "white",
            borderColor: "white",
            "&:hover": {
              borderColor: "white",
            },
          }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={7}
          sx={{
            gap: "5px",
            "& .MuiAvatar-root": {
              width: 34,
              height: 34,
              fontSize: 16,
              border: "none",
              color: "white",
              cursor: "pointer",
              "&:first-of-type": {
                bgcolor: "#a4b0de",
              },
            },
          }}
        >
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-9774ovWzYp6o-qiMg1_8Ok9OSPz_U135w&s"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfspNpKt3pFVymwHYTvXuxcVBv9WZElNYEEg&s"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC-gHiKauUmtjvDDF_JSEfRwxPFjVLMrxZ6A&s"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://happyshop.com.vn/wp-content/uploads/2022/03/do-ngu-sport-girl-sexy-TK3151-10.jpg"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://down-vn.img.susercontent.com/file/sg-11134201-7rcby-ltxl8d8yt2d86c"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://down-vn.img.susercontent.com/file/8634991060d3a47f534f02cbbaa73e88"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://cbu01.alicdn.com/img/ibank/O1CN01Lk6DnP1GfkSVE6YfQ_!!2216447950650-0-cib.jpg"
            />
          </Tooltip>
          <Tooltip title="Panda">
            <Avatar
              alt="Panda"
              src="https://cbu01.alicdn.com/img/ibank/O1CN01Lk6DnP1GfkSVE6YfQ_!!2216447950650-0-cib.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  );
};

export default BoardBar;
