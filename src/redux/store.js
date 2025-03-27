import { configureStore } from "@reduxjs/toolkit";
import { activeBoardReducer } from "~/redux/activeBoard/activeBoardSlice";

// state management tool
export const store = configureStore({
  reducer: { activeBoard: activeBoardReducer },
});
