import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isEmpty } from "lodash";
import authorizedAxiosInstance from "~/utils/authorizeAxios";
import { API_ROOT } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";

const initialState = {
  currentActiveBoard: null,
};

export const fetchBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId) => {
    const res = await authorizedAxiosInstance.get(
      `${API_ROOT}/v1/boards/${boardId}`
    );
    return res.data;
  }
);

const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      state.currentActiveBoard = action.payload;
    },
    updateCardInBoard: (state, action) => {
      const incomingCard = action.payload;

      const updateColumn = state.currentActiveBoard.columns.find(
        (c) => c._id.toString() === incomingCard.columnId.toString()
      );
      if (updateColumn) {
        const updateCard = updateColumn.cards.find(
          (c) => c._id.toString() === incomingCard._id.toString()
        );

        if (updateCard) {
          Object.keys(updateCard).forEach(
            (key) => (updateCard[key] = incomingCard[key])
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload;

      // board member will be merged by memberIds and ownerIds array
      board.FE_allUsers = board.owners.concat(board.members);

      board.columns = mapOrder(board.columns, board.columnOrderIds, "_id");

      board.columns.forEach((column) => {
        // if the column is empty, add the placeholder card
        if (isEmpty(column.cards)) {
          column.cards = [generatePlaceholderCard(column)];
          column.cardOrderIds = [generatePlaceholderCard(column)._id];
        } else {
          // else sort the cards data
          column.cards = mapOrder(column.cards, column.cardOrderIds, "_id");
        }
      });

      state.currentActiveBoard = board;
    });
  },
});

export const { updateCurrentActiveBoard, updateCardInBoard } =
  activeBoardSlice.actions;

// Selectors
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export const activeBoardReducer = activeBoardSlice.reducer;
