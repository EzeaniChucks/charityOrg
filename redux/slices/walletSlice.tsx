import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { removeUser } from "@/utils/localstorage";

// const conString = "http://localhost:8080";

const conString = "https://charityorg.onrender.com";

export const getWalletBalance = createAsyncThunk(
  "/getWalletBalance",
  async (prop: any, thunk) => {
    try {
      const { data } = await axios.get(
        `${conString}/${prop}/get_wallet_balance`
      );
      return data;
    } catch (err: any) {
      thunk.rejectWithValue(err.response.data.msg) || "Something went wrong";
    }
  }
);

interface Obj {
  walletBalance: Number;
  loading: Boolean;
}
const initialState: Obj = {
  walletBalance: 0,
  loading: false,
};

const walletSlice = createSlice({
  name: "singleEventSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWalletBalance.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getWalletBalance.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.walletBalance = payload;
    });
    builder.addCase(getWalletBalance.rejected, (state: any) => {});
  },
});

export const {} = walletSlice.actions;
export default walletSlice.reducer;
