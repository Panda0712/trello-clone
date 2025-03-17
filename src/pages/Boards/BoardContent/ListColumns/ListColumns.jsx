import { NoteAdd } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Column from "~/pages/Boards/BoardContent/ListColumns/Column/Column";

const ListColumns = () => {
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
      <Column />
      <Column />

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
  );
};

export default ListColumns;
