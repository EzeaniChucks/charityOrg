import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Obj } from "@/components/auth/register";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { config } from "process";

// const conString = "https://charityapp-381314.uc.r.appspot.com";
// const conString = "http://localhost:8080";
const conString = "https://charityapp2.uc.r.appspot.com";
export const register = createAsyncThunk(
  "auth/register",
  async (prop: Obj, thunk) => {
    try {
      // const data = await fetch(`${conString}/auth/register`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(prop),
      // });
      const { data }: { data: string } = await axios.post(
        `${conString}/auth/register`,
        prop,
        {}
      );
      return data;
    } catch (err: any) {
      return thunk.rejectWithValue(err.message);
    }
  }
);
export const verify = createAsyncThunk(
  "auth/verify",
  async (prop: ParsedUrlQuery, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/auth/verify-email`,
        prop
      );
      return data;
    } catch (err: any) {
      return thunk.rejectWithValue(err.message);
    }
  }
);

const initialState: Obj = {
  user: null,
  firstName: "",
  lastName: "",
  phoneNumber: "+234",
  email: "",
  password: "",
  confirmPass: "",
  dateOfBirth: Date(),
  promoCode: "",
  cardNumber: "",
  expirationDate: Date(),
  cvv: "",
  loading: false,
  error: { type: "", msg: "" },
  userState: "not registered",
  verification_status: "",
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    logError: (state: any, { payload }) => {
      state.error.type = payload.type;
      state.error.msg = payload.msg;
    },
    updateFormValues: (state: any, action: PayloadAction<any>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.userState = payload;
    });
    builder.addCase(register.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "server_response", msg: payload };
    });
    builder.addCase(verify.pending, (state: any) => {
      state.loading = true;
      state.verification_status = "";
    });
    builder.addCase(verify.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(verify.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Something went wrong. Please try again",
        code: payload,
      };
      // state.verification_status = payload;
    });
  },
});

export const { logError, updateFormValues } = userSlice.actions;
export default userSlice.reducer;
