// Board Details

import { Container } from "@mui/material";
// import { mockData } from "~/apis/mock-data";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import {
  createNewCardAPI,
  createNewColumnAPI,
  fetchBoardDetailsAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import { generatePlaceholderCard } from "~/utils/formatters";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

const Board = () => {
  // disableGutters to disable the horizontal padding of the container, allow them to spread out full of the screen
  // maxWidth={false} to allow the container to be full width
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "67dc23b5ecbf6cc167bb117d";

    fetchBoardDetailsAPI(boardId).then((data) => {
      data.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        }
      });
      setBoard(data);
    });
  }, []);

  const createNewColumn = async (newColumnData) => {
    if (!newColumnData) return;

    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id,
    });

    createdColumn.cards = [generatePlaceholderCard(createdColumn)];
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id];

    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);

    setBoard(newBoard);
  };

  const createNewCard = async (newCardData) => {
    if (!newCardData) return;

    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    const newBoard = { ...board };
    const newColumn = newBoard.columns.find(
      (c) => c._id.toString() === createdCard.columnId.toString()
    );
    if (newColumn) {
      newColumn.cards.push(createdCard);
      newColumn.cardOrderIds.push(createdCard._id);
    }

    setBoard(newBoard);
  };

  const updateColumns = async (dndOrderedColumns) => {};

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
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        updateColumns={updateColumns}
      />
    </Container>
  );
};

export default Board;
