import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { removeUser } from "@/utils/localstorage";
import { conString } from "@/utils/conString";


export const getWalletBalance = createAsyncThunk(
  "/getWalletBalance",
  async (prop: any, thunk) => {
    try {
      const { data } = await axios.get(
        `${conString}/${prop}/get_wallet_balance`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const getLatestTransactions = createAsyncThunk(
  "/getLatestTransactions",
  async (prop: any, thunk) => {
    try {
      const { data } = await axios.post(`${conString}/latest_transactions`, {
        userId: prop,
      });
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const paymentResponse = createAsyncThunk(
  "/paymentResponse",
  async (prop: any, thunk) => {
    try {
      const { data } = await axios.get(
        `${conString}/response?transaction_id=${prop.transaction_id}&tx_ref=${prop.tx_ref}&description=${prop.description}`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);

interface Obj {
  walletBalance: Number;
  latestTx: any;
  loading: Boolean;
  showWalletTopUp: Boolean;
  error: { type: String; msg: String };
  public_key: String;
  tx_ref: String;
  topup_amount: String;
  topup_currency: String;
  topup_country: String;
  topupStatus: String;
  payment_options: String;
}
const initialState: Obj = {
  walletBalance: 0,
  latestTx: [],
  loading: false,
  showWalletTopUp: false,
  error: { type: "", msg: "" },
  public_key: "FLWPUBK_TEST-31f261f02a971b32bd56cf4deff5e74a-X",
  tx_ref: `charityapp${Date.now()}${Math.random()}`,
  topup_amount: "0",
  topup_currency: "NGN",
  topup_country: "Nigeria",
  topupStatus: "",
  payment_options: "",
};

const walletSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {
    handleTopUpModule: (state: any) => {
      state.showWalletTopUp = !state.showWalletTopUp;
    },
    logError: (state: any, { payload }) => {
      state.error = payload;
    },
    updateWalletTopUpForm: (state: any, action: PayloadAction<any>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    //Wallet Balance
    builder.addCase(getWalletBalance.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(getWalletBalance.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.walletBalance = payload.balance;
    });
    builder.addCase(getWalletBalance.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "serverError", msg: payload };
    });

    //Latest Transactions
    builder.addCase(getLatestTransactions.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      getLatestTransactions.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.latestTx = payload.latestTransactions;
      }
    );
    builder.addCase(
      getLatestTransactions.rejected,
      (state: any, { payload }) => {
        state.loading = false;
        state.error = { type: "serverError", msg: payload };
      }
    );

    //Payment Response
    builder.addCase(paymentResponse.pending, (state: any) => {
      state.loading = false;
    });
    builder.addCase(paymentResponse.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.walletBalance = payload.balance;
      state.topupStatus = "successful";
    });
    builder.addCase(paymentResponse.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "serverError", msg: payload };
    });
  },
});

export const { handleTopUpModule, updateWalletTopUpForm, logError } =
  walletSlice.actions;
export default walletSlice.reducer;
