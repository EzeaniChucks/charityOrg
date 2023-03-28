import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    event: eventSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
