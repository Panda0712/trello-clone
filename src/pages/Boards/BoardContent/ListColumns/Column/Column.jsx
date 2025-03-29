import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddCard,
  Close,
  Cloud,
  ContentCopy,
  ContentCut,
  ContentPaste,
  DeleteForever,
  DragHandle,
  ExpandMore,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { cloneDeep } from "lodash";
import { useConfirm } from "material-ui-confirm";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewCardAPI, deleteColumnDetailsAPI } from "~/apis";

import ListCards from "~/pages/Boards/BoardContent/ListColumns/Column/ListCards/ListCards";
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";

const Column = ({ column }) => {
  const [openNewCardForm, setOpenNewCardForm] = useState(false);
  const [cardTitle, setCardTitle] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const board = useSelector(selectCurrentActiveBoard);

  const dispatch = useDispatch();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddCard = async () => {
    if (!cardTitle.trim()) {
      toast.error("Card title is required", {
        position: "bottom-right",
      });

      return;
    }

    // new card data includes title and columnId
    const newCardData = {
      title: cardTitle,
      columnId: column._id,
    };

    // call api create new card
    // handle create new card
    if (!newCardData) return;

    // send the new card data and the boardId to the api
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    // use cloneDeep or concat like createNewColumn
    const newBoard = cloneDeep(board);
    // find the column that the new card belongs to
    const newColumn = newBoard.columns.find(
      (c) => c._id.toString() === createdCard.columnId.toString()
    );
    if (newColumn) {
      // delete placeholder card if it exists
      if (newColumn.cards.some((card) => card.FE_PlaceholderCard)) {
        newColumn.cards = [createdCard];
        newColumn.cardOrderIds = [createdCard._id];
      } else {
        // else push the new card data to that column
        newColumn.cards.push(createdCard);
        newColumn.cardOrderIds.push(createdCard._id);
      }
    }

    dispatch(updateCurrentActiveBoard(newBoard));

    toggleOpenNewCardForm();
    setCardTitle("");
  };

  const confirmDeleteColumn = useConfirm();
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: "Delete Column",
      description:
        "This action will permanently delete your column and its cards! Are you sure?",
      confirmationText: "Confirm",
      cancellationText: "Cancel",

      // allowClose: false,
      // dialogProps: {
      //   maxWidth: "xs",
      // },
      // confirmationButtonProps: {
      //   color: "secondary",
      //   variant: "outlined",
      // },
      // cancellationButtonProps: {
      //   color: "inherit",
      // },
      // description: "Please enter Pussy to delete a column =)))",
      // confirmationKeyword: "Panda",
    })
      .then(() => {
        // call api delete column with the column id
        const newBoard = { ...board };
        // find the column and the columnOrderIds array
        newBoard.columns = newBoard.columns.filter(
          (c) => c._id.toString() !== column._id.toString()
        );
        newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
          (id) => id.toString() !== column._id.toString()
        );
        dispatch(updateCurrentActiveBoard(newBoard));

        // call api
        deleteColumnDetailsAPI(column._id).then((res) => {
          toast.success(res?.deleteResult);
        });
      })
      .catch(() => {});
  };

  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column._id, data: { ...column } });

  const dndKitColumnStyles = {
    // touchAction: "none",
    transform: CSS.Translate.toString(transform),
    transition,
    height: "100%",
    opacity: isDragging ? 0.5 : undefined,
  };

  const orderedCards = column.cards;

  return (
    <div ref={setNodeRef} style={dndKitColumnStyles} {...attributes}>
      <Box
        {...listeners}
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
            height: (theme) => theme.trelloCustom.columnHeaderHeight,
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
            {column?.title}
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
              onClick={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-column-dropdown",
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
                sx={{
                  "&:hover": {
                    color: "success.light",
                    "& .addIcon": { color: "success.light" },
                  },
                }}
              >
                <ListItemIcon>
                  <AddCard className="addIcon" fontSize="small" />
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
              <MenuItem
                onClick={handleDeleteColumn}
                sx={{
                  "&:hover": {
                    color: "warning.dark",
                    "& .deleteIcon": { color: "warning.dark" },
                  },
                }}
              >
                <ListItemIcon>
                  <DeleteForever className="deleteIcon" fontSize="small" />
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

        <ListCards cards={orderedCards} />

        {/* Box Column Footer */}

        <Box
          sx={{
            height: (theme) => theme.trelloCustom.columnFooterHeight,
            p: 2,
          }}
        >
          {!openNewCardForm ? (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={toggleOpenNewCardForm} startIcon={<AddCard />}>
                Add new card
              </Button>
              <Tooltip title="Drag to move">
                <DragHandle sx={{ cursor: "pointer" }} />
              </Tooltip>
            </Box>
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                label="Enter card title"
                type="text"
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
                size="small"
                variant="outlined"
                autoFocus
                data-no-dnd="true"
                sx={{
                  "& label": {
                    color: "text.primary",
                  },
                  "& input": {
                    color: (theme) => theme.palette.primary.main,
                    bgcolor: (theme) =>
                      theme.palette.mode === "dark" ? "#333643" : "white",
                  },
                  "& label.Mui-focused": {
                    color: (theme) => theme.palette.primary.main,
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&:hover fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: (theme) => theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    borderRadius: 1,
                  },
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Button
                  className="interceptor-loading"
                  onClick={handleAddCard}
                  variant="contained"
                  color="success"
                  size="small"
                  sx={{
                    boxShadow: "none",
                    border: "0.5px solid",
                    borderColor: (theme) => theme.palette.success.main,
                    "&:hover": {
                      bgcolor: (theme) => theme.palette.success.main,
                    },
                  }}
                >
                  Add
                </Button>
                <Close
                  fontSize="small"
                  sx={{
                    color: (theme) => theme.palette.warning.light,
                    cursor: "pointer",
                  }}
                  onClick={toggleOpenNewCardForm}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Column;
