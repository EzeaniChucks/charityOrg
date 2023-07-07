import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { removeUser } from "@/utils/localstorage";
import { conString } from "@/utils/conString";


export const getWalletBalance = createAsyncThunk(
  "/getWalletBalance",
  async (prop: any, thunk: any) => {
    try {
      const { data } = await axios.get(
        `${conString}/${prop.userId}/${prop.currency}/get_wallet_balance`
      );
      return data.balance;
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
        `${conString}/response?transaction_id=${prop.transaction_id}&tx_ref=${prop.tx_ref}&description=${prop.description}&chargeAmount=${prop.chargeAmount}`
      );
      return data.balance;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const get_country_banks = createAsyncThunk(
  "/get_country_banks",
  async (prop: any, thunk) => {
    try {
      const { data } = await axios.get(
        `${conString}/fetch_country_banks/${prop}`
      );
      const sort = data?.response?.data;
      return sort;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);

interface Obj {
  walletBalance: Number;
  walletSummary: any[];
  wallet_currency: String;
  latestTx: any;
  loading: Boolean;
  showWalletTopUp: Boolean;
  showFillAccounts: Boolean;
  error: { type: String; msg: String };
  public_key: String;
  tx_ref: String;
  topup_amount: String | Number;
  topup_currency: String;
  topup_country: String;
  account_number: String;
  topupStatus: String;
  payment_options: String;
  country_banks: any;
  chargeAmount: Number;
}
const initialState: Obj = {
  walletBalance: 0,
  wallet_currency: "NGN",
  walletSummary: [
    {
      id: 1,
      type: "Total topUps",
      amount: 0,
      uptrend: true,
      percent: 0,
    },
    {
      id: 2,
      type: "Total Outflow",
      amount: 0,
      uptrend: false,
      percent: 0,
    },
    {
      id: 3,
      type: "Total Events Income",
      amount: 0,
      uptrend: true,
      percent: 0,
    },
    {
      id: 4,
      type: "Event income plus topups",
      amount: 0,
      uptrend: true,
      percent: 0,
    },
  ],
  latestTx: [],
  loading: false,
  showWalletTopUp: false,
  showFillAccounts: false,
  error: { type: "", msg: "" },
  public_key: "FLWPUBK_TEST-31f261f02a971b32bd56cf4deff5e74a-X",
  tx_ref: `charityapp${Date.now()}${Math.random()}`,
  topup_amount: "0",
  topup_currency: "NGN",
  account_number: "",
  topup_country: "Nigeria",
  topupStatus: "",
  payment_options: "",
  country_banks: [],
  chargeAmount: 0,
};

const walletSlice = createSlice({
  name: "walletSlice",
  initialState,
  reducers: {
    handleTopUpModule: (state: any) => {
      state.showWalletTopUp = !state.showWalletTopUp;
    },
    handleFillAccountsModule: (state: any) => {
      state.showFillAccounts = !state.showFillAccounts;
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
      state.walletSummary[0].amount = payload.total_topup;
      state.walletSummary[0].percent = payload.total_topup_percent_inc;
      state.walletSummary[1].amount = payload.total_outflow;
      state.walletSummary[1].percent = payload.total_outflow_percent_dec;
      state.walletSummary[2].amount = payload.total_income_from_events;
      state.walletSummary[2].percent =
        payload.total_income_from_events_percent_inc;
      state.walletSummary[3].amount =
        payload.total_income_from_events + payload.total_topup;
      state.walletSummary[3].percent =
        payload.total_income_from_events_percent_inc +
        payload.total_topup_percent_inc;
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
      state.topupStatus = "successful";
      state.walletBalance = payload.balance;
      state.walletSummary[0].amount = payload.total_topup;
      state.walletSummary[0].percent = payload.total_topup_percent_inc;
      state.walletSummary[1].amount = payload.total_outflow;
      state.walletSummary[1].percent = payload.total_outflow_percent_dec;
      state.walletSummary[2].amount = payload.total_income_from_events;
      state.walletSummary[2].percent =
        payload.total_income_from_events_percent_inc;
      state.walletSummary[3].amount =
        payload.total_income_from_events + payload.total_topup;
      state.walletSummary[3].percent =
        payload.total_income_from_events_percent_inc +
        payload.total_topup_percent_inc;
    });
    builder.addCase(paymentResponse.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "serverError", msg: payload };
    });

    //Get Country Banks
    builder.addCase(get_country_banks.pending, (state: any) => {
      state.loading = false;
    });
    builder.addCase(get_country_banks.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      // console.log(payload);
      state.country_banks = payload;
      // state.topupStatus = "successful";
    });
    builder.addCase(get_country_banks.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "serverError", msg: payload };
    });
  },
});

export const {
  handleTopUpModule,
  handleFillAccountsModule,
  updateWalletTopUpForm,
  logError,
} = walletSlice.actions;
export default walletSlice.reducer;
