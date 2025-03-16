import {
  AddCard,
  Attachment,
  Cloud,
  Comment,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  DragHandle,
  ExpandMore,
  Group,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

const COLUMN_HEADER_HEIGHT = "50px";
const COLUMN_FOOTER_HEIGHT = "50px";

const BoardContent = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: (theme) => theme.trelloCustom.boardContentHeight,
        display: "flex",
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
        overflowX: "auto",
        overflowY: "hidden",
        padding: "10px 0",
        "&::-webkit-scrollbar-track": { m: 2 },
      }}
    >
      {/* Column */}
      <Box
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
              5
            )})`,
        }}
      >
        {/* Box Column Header */}
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Column Title
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMore
                sx={{ color: "text.primary", cursor: "pointer" }}
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCard fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForever fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Box List Card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: "0 5px",
            m: "0 5px",
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: (theme) =>
              `calc(
            ${theme.trelloCustom.boardContentHeight} - 
            ${theme.spacing(5)} - 
            ${COLUMN_HEADER_HEIGHT} - 
            ${COLUMN_FOOTER_HEIGHT})`,
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ced0da",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#bfc2cf",
            },
          }}
        >
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-9774ovWzYp6o-qiMg1_8Ok9OSPz_U135w&s"
              title="green iguana"
            />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
            <CardActions sx={{ p: "0 4px 8px 4px" }}>
              <Button size="small" startIcon={<Group />}>
                20
              </Button>
              <Button size="small" startIcon={<Comment />}>
                15
              </Button>
              <Button size="small" startIcon={<Attachment />}>
                10
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
        </Box>
        {/* Box Column Footer */}
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button startIcon={<AddCard />}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandle sx={{ cursor: "pointer" }} />
          </Tooltip>
        </Box>
      </Box>

      {/* Column */}
      <Box
        sx={{
          minWidth: 300,
          maxWidth: 300,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
          ml: 2,
          borderRadius: "6px",
          height: "fit-content",
          maxHeight: (theme) =>
            `calc(${theme.trelloCustom.boardContentHeight} - ${theme.spacing(
              5
            )})`,
        }}
      >
        {/* Box Column Header */}
        <Box
          sx={{
            height: COLUMN_HEADER_HEIGHT,
            p: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontSize: "1rem",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Column Title
          </Typography>
          <Box>
            <Tooltip title="More options">
              <ExpandMore
                sx={{ color: "text.primary", cursor: "pointer" }}
                id="basic-column-dropdown"
                aria-controls={open ? "basic-menu-column-dropdown" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem>
                <ListItemIcon>
                  <AddCard fontSize="small" />
                </ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCut fontSize="small" />
                </ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentCopy fontSize="small" />
                </ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <ContentPaste fontSize="small" />
                </ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>

              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <DeleteForever fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
        {/* Box List Card */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            p: "0 5px",
            m: "0 5px",
            overflowX: "hidden",
            overflowY: "auto",
            maxHeight: (theme) =>
              `calc(
            ${theme.trelloCustom.boardContentHeight} - 
            ${theme.spacing(5)} - 
            ${COLUMN_HEADER_HEIGHT} - 
            ${COLUMN_FOOTER_HEIGHT})`,
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#ced0da",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#bfc2cf",
            },
          }}
        >
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardMedia
              sx={{ height: 140 }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSD-9774ovWzYp6o-qiMg1_8Ok9OSPz_U135w&s"
              title="green iguana"
            />
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
            <CardActions sx={{ p: "0 4px 8px 4px" }}>
              <Button size="small" startIcon={<Group />}>
                20
              </Button>
              <Button size="small" startIcon={<Comment />}>
                15
              </Button>
              <Button size="small" startIcon={<Attachment />}>
                10
              </Button>
            </CardActions>
          </Card>
          <Card
            sx={{
              cursor: "pointer",
              boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
              overflow: "unset",
            }}
          >
            <CardContent
              sx={{
                p: 1.5,
                "&:last-child": {
                  p: 1.5,
                },
              }}
            >
              <Typography>Panda MERN Stack</Typography>
            </CardContent>
          </Card>
        </Box>
        {/* Box Column Footer */}
        <Box
          sx={{
            height: COLUMN_FOOTER_HEIGHT,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button startIcon={<AddCard />}>Add new card</Button>
          <Tooltip title="Drag to move">
            <DragHandle sx={{ cursor: "pointer" }} />
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default BoardContent;
