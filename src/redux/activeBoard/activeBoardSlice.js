import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { isEmpty } from "lodash";
import { API_ROOT } from "~/utils/constants";
import { generatePlaceholderCard } from "~/utils/formatters";
import { mapOrder } from "~/utils/sorts";

const initialState = {
  currentActiveBoard: null,
};

export const fetchBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId) => {
    const res = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
      let board = action.payload;

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

export const { updateCurrentActiveBoard } = activeBoardSlice.actions;

// Selectors
export const selectCurrentActiveBoard = (state) => {
  return state.activeBoard.currentActiveBoard;
};

export const activeBoardReducer = activeBoardSlice.reducer;
