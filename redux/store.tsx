import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";
import walletSlice from "./slices/walletSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    event: eventSlice,
    wallet: walletSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
