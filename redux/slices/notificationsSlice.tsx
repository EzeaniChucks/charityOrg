import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { conString } from "@/utils/conString";

export const log_Notification = createAsyncThunk(
  "notifications/log_Notification",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/log_notification`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const get_Notification = createAsyncThunk(
  "notifications/get_Notification",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/get_notifications/${prop}`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const message_checked_status = createAsyncThunk(
  "notifications/message_checked_status",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/mark_message_as_read`,
        prop
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);

const initialState = {
  notifLogStatus: "",
  loading: "",
  notifications: [],
  notifModalIsOpen: false,
};

const notificationsSlice = createSlice({
  name: "notificationsSlice",
  initialState,
  reducers: {
    handleNotifModal: (state: any) => {
      state.notifModalIsOpen = !state.notifModalIsOpen;
    },
  },
  extraReducers: (builder) => {
    ///Notif Logger
    builder.addCase(log_Notification.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(log_Notification.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.notifLogStatus = payload.msg;
    });
    builder.addCase(log_Notification.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to get event datails. Please try again",
        code: payload,
      };
      state.notifLogStatus = "success";
    });

    ///Notif Getter
    builder.addCase(get_Notification.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(get_Notification.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.notifications = payload.notifs;
    });
    builder.addCase(get_Notification.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to get event datails. Please try again",
        code: payload,
      };
    });

    ///Message Read Status
    builder.addCase(message_checked_status.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      message_checked_status.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.notifications = payload.notifs;
      }
    );
    builder.addCase(
      message_checked_status.rejected,
      (state: any, { payload }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to get event datails. Please try again",
          code: payload,
        };
      }
    );
  },
});

export const { handleNotifModal } = notificationsSlice.actions;
export default notificationsSlice.reducer;
