import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { NoteAdd } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";

const ListColumns = ({ columns }) => {
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

        <Box
          sx={{
            minWidth: 200,
            maxWidth: 200,
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
      </Box>
    </SortableContext>
  );
};

export default ListColumns;
