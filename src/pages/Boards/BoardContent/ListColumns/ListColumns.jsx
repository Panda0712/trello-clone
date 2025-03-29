import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Close, NoteAdd } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { cloneDeep } from "lodash";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createNewColumnAPI } from "~/apis";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";
import {
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import { generatePlaceholderCard } from "~/utils/formatters";

const ListColumns = ({ columns }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);
  const [columnTitle, setColumnTitle] = useState("");

  const board = useSelector(selectCurrentActiveBoard);

  const dispatch = useDispatch();

  const handleAddColumn = async () => {
    if (!columnTitle.trim()) {
      toast.error("Column title is required");
      return;
    }

    const newColumnData = {
      title: columnTitle,
    };

    // call api add new column
    // createNewColumn(newColumnData);
    if (!newColumnData) return;

    // add the new column data and the boardId
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    // after created new column, add the placeholder card
    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    // insert new column data
    // in redux, if we want to change the value of its data, we should clone deep
    // to avoid immutable rules
    // if we use spread operator, it will show error
    const newBoard = cloneDeep(board);
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);

    // other solution
    // use concat javascript
    // push will directly change the value of an array
    // but concat will merge and create a new array for us to assign value
    // const newBoard = { ...board };
    // newBoard.columns = newBoard.columns.concat([createdColumn]);
    // newBoard.columnOrderIds = newBoard.columnOrderIds.concat([
    //   createdColumn._id,
    // ]);

    dispatch(updateCurrentActiveBoard(newBoard));

    toggleOpenNewColumnForm();
    setColumnTitle("");
  };

  // We need an array of id of columns because the dnd kit library need that to
  //  perform animation about drag, drop.
  // If not, we still can drag and drop but it
  //  will not have any animation.

  return (
    <SortableContext
      items={columns?.map((c) => c._id)}
      strategy={horizontalListSortingStrategy}
    >
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
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}

        {!openNewColumnForm ? (
          <Box
            onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: 250,
              maxWidth: 250,
              mx: 2,
              borderRadius: "6px",
              height: "fit-content",
              bgcolor: "#ffffff3d",
            }}
          >
            <Button
              sx={{
                color: "white",
                width: "100%",
                justifyContent: "start",
                pl: 2.5,
                py: 1,
              }}
              startIcon={<NoteAdd />}
            >
              Add new column
            </Button>
          </Box>
        ) : (
          <Box
            sx={{
              minWidth: "250px",
              maxWidth: "250px",
              mx: 2,
              p: 1,
              borderRadius: "6px",
              height: "fit-content",
              bgColor: "#ffffff3d",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <TextField
              label="Enter column title"
              type="text"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              size="small"
              variant="outlined"
              autoFocus
              sx={{
                "& label": {
                  color: "white",
                },
                "& input": {
                  color: "white",
                },
                "& label.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white !important",
                  },
                  "&:hover fieldset": {
                    borderColor: "white !important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white !important",
                  },
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Button
                className="interceptor-loading"
                onClick={handleAddColumn}
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
                Add Column
              </Button>
              <Close
                fontSize="small"
                sx={{
                  color: "white",
                  cursor: "pointer",
                  "&:hover": {
                    color: (theme) => theme.palette.warning.light,
                  },
                }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        )}
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
