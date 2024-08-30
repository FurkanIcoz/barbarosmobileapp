import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { thunk } from "redux-thunk";
import walletSlice from "./walletSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletSlice,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({ serializableCheck: false }),
});
