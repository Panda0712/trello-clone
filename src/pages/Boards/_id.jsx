// Board Details

import { Box, CircularProgress, Container, Typography } from "@mui/material";
// import { mockData } from "~/apis/mock-data";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createNewCardAPI,
  createNewColumnAPI,
  deleteColumnDetailsAPI,
  fetchBoardDetailsAPI,
  moveCardToDifferentColumnsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";

const Board = () => {
  // disableGutters to disable the horizontal padding of the container, allow them to spread out full of the screen
  // maxWidth={false} to allow the container to be full width
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const boardId = "67dc23b5ecbf6cc167bb117d";

    fetchBoardDetailsAPI(boardId).then((data) => {
      data.columns = mapOrder(data.columns, data.columnOrderIds, "_id");

      data.columns.forEach((column) => {
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
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
      if (newColumn.cards.some((card) => card.FE_PlaceholderCard)) {
        newColumn.cards = [createdCard];
        newColumn.cardOrderIds = [createdCard._id];
      } else {
        newColumn.cards.push(createdCard);
        newColumn.cardOrderIds.push(createdCard._id);
      }
    }

    setBoard(newBoard);
  };

  const updateColumns = (dndOrderedColumns) => {
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);

    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;

    setBoard(newBoard);

    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds,
    });
  };

  const updateCardsSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    const newBoard = { ...board };
    const updateColumn = newBoard.columns.find(
      (c) => c._id.toString() === columnId.toString()
    );

    if (updateColumn) {
      updateColumn.cards = dndOrderedCards;
      updateColumn.cardOrderIds = dndOrderedCardIds;
    }

    setBoard(newBoard);

    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  const updateCardsDifferentColumns = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id.toString() === prevColumnId.toString()
    )?.cardOrderIds;
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    moveCardToDifferentColumnsAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(
        (c) => c._id.toString() === nextColumnId.toString()
      )?.cardOrderIds,
    });
  };

  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board };
    newBoard.columns = newBoard.columns.filter(
      (c) => c._id.toString() !== columnId.toString()
    );
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id.toString() !== columnId.toString()
    );
    setBoard(newBoard);

    deleteColumnDetailsAPI(columnId).then((res) => {
      toast.success(res?.deleteResult);
    });
  };

  if (!board) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
          gap: 2,
        }}
      >
        <CircularProgress />
        <Typography>Loading Board...</Typography>
      </Box>
    );
  }

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
        updateCardsSameColumn={updateCardsSameColumn}
        updateCardsDifferentColumns={updateCardsDifferentColumns}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  );
};

export default Board;
