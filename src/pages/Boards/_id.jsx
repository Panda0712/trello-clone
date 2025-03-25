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
      // sort the columns data when first called api
      data.columns = mapOrder(data.columns, data.columnOrderIds, "_id");

      data.columns.forEach((column) => {
        // if the column is empty, add the placeholder card
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // else sort the cards data
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });
      setBoard(data);
    });
  }, []);

  // handle create new column
  const createNewColumn = async (newColumnData) => {
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
    const newBoard = { ...board };
    newBoard.columns.push(createdColumn);
    newBoard.columnOrderIds.push(createdColumn._id);

    setBoard(newBoard);
  };

  // handle create new card
  const createNewCard = async (newCardData) => {
    if (!newCardData) return;

    // send the new card data and the boardId to the api
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id,
    });

    const newBoard = { ...board };
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

    setBoard(newBoard);
  };

  // handle update the columns
  const updateColumns = (dndOrderedColumns) => {
    // get the columnOrderIds
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);

    // set the new column
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;

    setBoard(newBoard);

    // call api
    updateBoardDetailsAPI(newBoard._id, {
      columnOrderIds: dndOrderedColumnIds,
    });
  };

  // handle update cards in the same column
  const updateCardsSameColumn = (
    dndOrderedCards,
    dndOrderedCardIds,
    columnId
  ) => {
    const newBoard = { ...board };
    // find the column that needs to update
    const updateColumn = newBoard.columns.find(
      (c) => c._id.toString() === columnId.toString()
    );

    // override the new data to the cards and cardOrderIds array
    if (updateColumn) {
      updateColumn.cards = dndOrderedCards;
      updateColumn.cardOrderIds = dndOrderedCardIds;
    }

    setBoard(newBoard);

    // call api
    updateColumnDetailsAPI(columnId, {
      cardOrderIds: dndOrderedCardIds,
    });
  };

  // handle update cards in different columns
  const updateCardsDifferentColumns = (
    currentCardId,
    prevColumnId,
    nextColumnId,
    dndOrderedColumns
  ) => {
    // get the orderIds array of columns
    const dndOrderedColumnsIds = dndOrderedColumns.map((c) => c._id);
    // update the board data
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    setBoard(newBoard);

    // find the previous cardOrderIds in the previous columns
    let prevCardOrderIds = dndOrderedColumns.find(
      (c) => c._id.toString() === prevColumnId.toString()
    )?.cardOrderIds;
    // delete the placeholder card if it exists, because if not, when we send the previous card data to backend
    // it will be error because the ObjectID will not match the pattern
    if (prevCardOrderIds[0].includes("placeholder-card")) prevCardOrderIds = [];

    // call api
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

  // handle delete column details
  const deleteColumnDetails = (columnId) => {
    const newBoard = { ...board };
    // find the column and the columnOrderIds array
    newBoard.columns = newBoard.columns.filter(
      (c) => c._id.toString() !== columnId.toString()
    );
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(
      (id) => id.toString() !== columnId.toString()
    );
    setBoard(newBoard);

    // call api
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
