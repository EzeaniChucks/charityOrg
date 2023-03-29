import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { removeUser } from "@/utils/localstorage";

// const conString = "https://charityapp-381314.uc.r.appspot.com";
// const conString = "http://localhost:8080";
// const conString = "https://charityapp2.uc.r.appspot.com";

const conString = "https://charityorg.onrender.com";
// export const register = createAsyncThunk(
//   "auth/register",
//   async (prop: Obj, thunk) => {
//     try {
//       const { data }: { data: string } = await axios.post(
//         `${conString}/auth/register`,
//         prop,
//         {}
//       );
//       return data;
//     } catch (err: any) {
//       return (
//         thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
//       );
//     }
//   }
// );
// export const login = createAsyncThunk(
//   "auth/login",
//   async (prop: { email: string; password: string }, thunk) => {
//     try {
//       const { data }: { data: string } = await axios.post(
//         `${conString}/auth/login`,
//         prop,
//         {}
//       );
//       return data;
//     } catch (err: any) {
//       return (
//         thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
//       );
//     }
//   }
// );
// export const verify = createAsyncThunk(
//   "auth/verify",
//   async (prop: ParsedUrlQuery, thunk) => {
//     try {
//       const { data }: { data: any } = await axios.post(
//         `${conString}/auth/verify-email`,
//         prop
//       );
//       return data;
//     } catch (err: any) {
//       return (
//         thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
//       );
//     }
//   }
// );

interface Obj {
  eventName: String;
  eventDate: String;
  timeZone: String;
  hostStatus: String;
  currency: String;
  eventDescription: String;
  depositDeadline: String;
  completionDeadline: String;
  showEventForm: Boolean;
  createEventStep: String;
}
const initialState: Obj = {
  eventName: "",
  eventDate: Date(),
  timeZone: "Etc/GMT-12 (GMT-12:00)",
  hostStatus: "Depositor",
  currency: "Euro",
  eventDescription: "",
  depositDeadline: Date(),
  completionDeadline: Date(),
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
  //   reducers: {
  //     logError: (state: any, { payload }) => {
  //       state.error.type = payload.type;
  //       state.error.msg = payload.msg;
  //     },
  //     updateFormValues: (state: any, action: PayloadAction<any>) => {
  //       const { name, value } = action.payload;
  //       state[name] = value;
  //     },
  //     logout: (state: any) => {
  //       removeUser();
  //       state.user = null;
  //     },
  //     setUser: (state: any, action: PayloadAction<any>) => {
  //       state.user = action.payload;
  //     },
  //   },
  //   extraReducers: (builder) => {
  //     ///REGISTER
  //     builder.addCase(register.pending, (state: any) => {
  //       state.loading = true;
  //       state.afterRegistration = "";
  //     });
  //     builder.addCase(register.fulfilled, (state: any, { payload }) => {
  //       state.loading = false;
  //       state.afterRegistration = payload;
  //       state.firstName = "";
  //       state.password = "";
  //       state.confirmPass = "";
  //       state.phoneNumber = "+234";
  //       state.cardNumber = "";
  //       state.cvv = "";
  //       state.promoCode = "";
  //     });
  //     builder.addCase(register.rejected, (state: any, { payload }) => {
  //       state.loading = false;
  //       state.error = { type: "server_error", msg: payload };
  //       state.afterRegistration = "";
  //     });

  //     ///LOGIN
  //     builder.addCase(login.pending, (state: any) => {
  //       state.loading = true;
  //       state.user = null;
  //     });
  //     builder.addCase(login.fulfilled, (state: any, { payload }) => {
  //       state.loading = false;
  //       state.user = payload;
  //     });
  //     builder.addCase(login.rejected, (state: any, { payload }) => {
  //       state.loading = false;
  //       state.user = null;
  //       state.error = { type: "server_error", msg: payload, code: payload };
  //     });

  //     ///VERIFY
  //     builder.addCase(verify.pending, (state: any) => {
  //       state.loading = true;
  //       state.verification_status = "";
  //     });
  //     builder.addCase(verify.fulfilled, (state: any, { payload }) => {
  //       state.loading = false;
  //       state.user = payload;
  //     });
  //     builder.addCase(verify.rejected, (state: any, { payload }) => {
  //       state.loading = false;
  //       state.error = {
  //         type: "server_error",
  //         msg: "Something went wrong. Please try again",
  //         code: payload,
  //       };
  //     });
  //   },
});

export const { handleEventModule, updateEventForm, switchStep } =
  eventSlice.actions;
export default eventSlice.reducer;
