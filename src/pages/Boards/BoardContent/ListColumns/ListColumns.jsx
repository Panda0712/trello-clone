import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Close, NoteAdd } from "@mui/icons-material";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";

const ListColumns = ({
  columns,
  createNewColumn,
  createNewCard,
  deleteColumnDetails,
}) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
  const toggleOpenNewColumnForm = () =>
    setOpenNewColumnForm(!openNewColumnForm);
  const [columnTitle, setColumnTitle] = useState("");

  const handleAddColumn = () => {
    if (!columnTitle.trim()) {
      toast.error("Column title is required");
      return;
    }

    const newColumnData = {
      title: columnTitle,
    };

    createNewColumn(newColumnData);

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
          <Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />
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
