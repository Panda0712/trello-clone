import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentActiveCard: null,
  showModalActiveCard: false,
};

export const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    toggleShowModalActiveCard: (state) => {
      state.showModalActiveCard = true;
    },

    clearCurrentActiveCard: (state) => {
      state.currentActiveCard = null;
      state.showModalActiveCard = false;
    },

    updateCurrentActiveCard: (state, action) => {
      const fullCard = action.payload;

      state.currentActiveCard = fullCard;
    },
  },

  //   extraReducers: {},
});

export const {
  clearCurrentActiveCard,
  toggleShowModalActiveCard,
  updateCurrentActiveCard,
} = activeCardSlice.actions;

export const selectCurrentActiveCard = (state) => {
  return state.activeCard.currentActiveCard;
};

export const selectShowModalActiveCard = (state) => {
  return state.activeCard.showModalActiveCard;
};

export const activeCardReducer = activeCardSlice.reducer;
