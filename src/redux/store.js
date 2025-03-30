import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { activeBoardReducer } from "~/redux/activeBoard/activeBoardSlice";
import { activeCardReducer } from "~/redux/activeCard/activeCardSlice";
import { userReducer } from "~/redux/user/userSlice";

const rootPersistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["user"],
};

const reducers = combineReducers({
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
  user: userReducer,
});

const persistedReducers = persistReducer(rootPersistConfig, reducers);

// state management tool
export const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
