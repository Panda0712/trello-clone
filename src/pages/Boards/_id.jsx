// Board Details

import { Container } from "@mui/material";
import BoardBar from "./BoardBar";
import BoardContent from "./BoardContent";
import AppBar from "~/components/AppBar";

const Board = () => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      style={{ height: "100vh", backgroundColor: "primary.main" }}
    >
      <AppBar />
      <BoardBar />
      <BoardContent />
    </Container>
  );
};

export default Board;
