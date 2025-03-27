// Board Details

import { Box, CircularProgress, Container, Typography } from "@mui/material";
// import { mockData } from "~/apis/mock-data";
import { cloneDeep } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  moveCardToDifferentColumnsAPI,
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
} from "~/apis";
import AppBar from "~/components/AppBar/AppBar";
import {
  fetchBoardDetailsAPI,
  selectCurrentActiveBoard,
  updateCurrentActiveBoard,
} from "~/redux/activeBoard/activeBoardSlice";
import BoardBar from "./BoardBar/BoardBar";
import BoardContent from "./BoardContent/BoardContent";
import { useParams } from "react-router-dom";

const Board = () => {
  // disableGutters to disable the horizontal padding of the container, allow them to spread out full of the screen
  // maxWidth={false} to allow the container to be full width
  const board = useSelector(selectCurrentActiveBoard);

  const { boardId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    // const boardId = "67dc23b5ecbf6cc167bb117d";

    dispatch(fetchBoardDetailsAPI(boardId));
  }, [dispatch, boardId]);

  // handle update the columns
  const updateColumns = (dndOrderedColumns) => {
    // get the columnOrderIds
    const dndOrderedColumnIds = dndOrderedColumns.map((c) => c._id);

    // set the new column
    // here we don't need to cloneDeep the board array
    // because we didn't use the push method of javascript to directly change the value of an array
    // so it's free to use spread operator
    const newBoard = { ...board };
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnIds;

    dispatch(updateCurrentActiveBoard(newBoard));

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
    // here we didn't use the push method
    // but the cards array is so deep in the board array
    // so it will be set to read-only mode
    // and touched the immutable rule
    const newBoard = cloneDeep(board);
    // find the column that needs to update
    const updateColumn = newBoard.columns.find(
      (c) => c._id.toString() === columnId.toString()
    );

    // override the new data to the cards and cardOrderIds array
    if (updateColumn) {
      updateColumn.cards = dndOrderedCards;
      updateColumn.cardOrderIds = dndOrderedCardIds;
    }

    dispatch(updateCurrentActiveBoard(newBoard));

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
    // no need to clone deep, you can understand:)
    newBoard.columns = dndOrderedColumns;
    newBoard.columnOrderIds = dndOrderedColumnsIds;
    dispatch(updateCurrentActiveBoard(newBoard));

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
        updateColumns={updateColumns}
        updateCardsSameColumn={updateCardsSameColumn}
        updateCardsDifferentColumns={updateCardsDifferentColumns}
      />
    </Container>
  );
};

export default Board;
