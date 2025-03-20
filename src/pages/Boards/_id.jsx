// Board Details

import { Container } from "@mui/material";
// import { mockData } from "~/apis/mock-data";
import AppBar from "~/components/AppBar/AppBar";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useEffect, useState } from "react";
import { fetchBoardDetailsAPI } from "~/apis";

const Board = () => {
  // disableGutters to disable the horizontal padding of the container, allow them to spread out full of the screen
  // maxWidth={false} to allow the container to be full width
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "67dc23b5ecbf6cc167bb117d";

    fetchBoardDetailsAPI(boardId).then((data) => {
      setBoard(data);
    });
  }, []);

  return (
    <Container
      disableGutters
      maxWidth={false}
      style={{
        height: "100vh",
        backgroundColor: "primary.main",
        overflowY: "hidden",
      }}
    >
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  );
};

export default Board;
