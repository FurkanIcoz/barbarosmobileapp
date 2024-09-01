import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { thunk } from "redux-thunk";
import walletSlice from "./walletSlice";
import ridesSlice from "./ridesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletSlice,
    rides: ridesSlice
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware({ serializableCheck: false }),
});
