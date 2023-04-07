import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

interface Obj {
  event?: any;
  allEvents: any;
  eventName: String;
  eventDate: String;
  timeZone: String;
  hostStatus: String;
  currency: String;
  eventDescription: String;
  depositDeadline: String;
  completionDeadline: String;
  eventImageName?: String;
  eventImagePath?: String;
  invitationEmails?: String[];
  loading: Boolean;
  creationStatus: Boolean;
  showEventForm?: Boolean;
  createEventStep?: String;
}

// const conString = "http://localhost:8080";

const conString = "https://charityorg.onrender.com";

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/create_event`,
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
export const getAllEvents = createAsyncThunk(
  "event/getAllEvents",
  async (_, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/get_all_events`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);

const initialState: Obj = {
  event: null,
  allEvents: [],
  eventName: "",
  eventDate: Date(),
  timeZone: "Etc/GMT-12 (GMT-12:00)",
  hostStatus: "Depositor",
  currency: "Euro",
  eventDescription: "",
  depositDeadline: Date(),
  completionDeadline: Date(),
  eventImageName: "",
  eventImagePath: "",
  invitationEmails: [],
  loading: false,
  creationStatus: false,
  showEventForm: false,
  createEventStep: "step1",
};

const eventSlice = createSlice({
  name: "eventSlice",
  initialState,
  reducers: {
    handleEventModule: (state) => {
      state.showEventForm = !state.showEventForm;
    },
    updateEventForm: (state: any, action: PayloadAction<any>) => {
      const { name, value } = action.payload;
      state[name] = value;
      if (name === "depositDeadline") {
        const depDate = new Date(state.depositDeadline).getTime();
        const compDate = new Date(state.completionDeadline).getTime();
        if (depDate > compDate) {
          state["completionDeadline"] = value;
        }
      }
    },
    switchStep: (state, action: PayloadAction<any>) => {
      state.createEventStep = action.payload;
    },
  },
  extraReducers: (builder) => {
    ///CREATE EVENT
    builder.addCase(createEvent.pending, (state: any) => {
      state.loading = true;
      state.creationStatus = false;
    });
    builder.addCase(createEvent.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.event = payload;
      state.eventName = "";
      state.eventImageName = "";
      state.eventImagePath = "";
      state.invitationEmails = [];
      state.eventDescription = "";
      state.creationStatus = true;
    });
    builder.addCase(createEvent.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.creationStatus = false;
      state.error = {
        type: "server_error",
        msg: "please resubmision again",
        code: payload,
      };
    });
    builder.addCase(getAllEvents.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getAllEvents.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.allEvents = payload.allEvents;
    });
    builder.addCase(getAllEvents.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "please resubmit form again",
        code: payload,
      };
    });
  },
});

export const { handleEventModule, updateEventForm, switchStep } =
  eventSlice.actions;
export default eventSlice.reducer;
