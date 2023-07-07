import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/authSlice";
import eventSlice from "./slices/eventSlice";
import walletSlice from "./slices/walletSlice";
import eventsPageSlice from "./slices/eventsPageSlice";
import notificationsSlice from "./slices/notificationsSlice";
import adminSettingsSlice from "./slices/adminSettingsSlice";
import themeSlice from "./slices/themeSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    event: eventSlice,
    wallet: walletSlice,
    eventPage: eventsPageSlice,
    notifications: notificationsSlice,
    adminsettings: adminSettingsSlice,
    theme: themeSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
