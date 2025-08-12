import { configureStore } from "@reduxjs/toolkit";
import brainSnackReducer from "./reducer";

export const store = configureStore({
  reducer: {
    brainSnack: brainSnackReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
