import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { conString } from "@/utils/conString";

export const addWalletChargeRange = createAsyncThunk(
  "addWalletChargeRange",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/set_wallet_charge_amount`,
        prop
      );
      return data;
    } catch (err: any) {
      console.log(err);
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const chargeRangeDeletion = createAsyncThunk(
  "ChargeRangeDeletion",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.put(
        `${conString}/charge_range_deletion`,
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

export const fetchChargeRange = createAsyncThunk(
  "fetchChargeRange",
  async (_, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/get_all_charge_range`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const setSubscription = createAsyncThunk(
  "setSubscription",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/set_subscription`,
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
export const setBundles = createAsyncThunk(
  "setBundles",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/set_bundles`,
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
export const fetchSubAndBundles = createAsyncThunk(
  "fetchSubAndBundles",
  async (_, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/fetch_sub_and_bundles`
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
  walletChargeRangeArray: [],
  notifLogStatus: "",
  loading: "",
  error: {
    type: "",
    msg: "",
    code: "",
  },
  notifications: [],
  notifModalIsOpen: false,
  free: {},
  gold: {},
  platinum: {},
  platinum_price_v: 0,
  platinum_price_c: "NGN",
  gold_price_v: 0,
  gold_price_c: "NGN",
  subs_expiration_value: 0,
  subs_expiration_quantifier: "",
  bundle: [],
  can_use_crypto_bp: 0,
  can_use_crypto_bc: "USD",
  can_use_currency_conversion_bp: 0,
  can_use_currency_conversion_bc: "USD",
  dep_in_multi_eventCategories_bp: 0,
  dep_in_multi_eventCategories_bc: "USD",
  extend_dep_comp_deadlines_bp: 0,
  extend_dep_comp_deadlines_bc: "USD",
  can_use_pledge_forms_bp: 0,
  can_use_pledge_forms_bc: "USD",
  bundle_type_variable: "",
  bundle_type_desc: "",
  bundle_quantity_to_buy: 1,
  selected_bundle_price: 0,
  selected_bundle_currency: "",
  total_bundle_price: 0,
};

const adminSettingsSlice = createSlice({
  name: "adminSettingSlice",
  initialState,
  reducers: {
    addToSub: (state: any, { payload }: { payload: any }) => {
      const { name, value } = payload;
      let obj: any = {};
      // let index = Object.values(state[name]).length;
      obj[value] = true;
      if (!state[name][value]) state[name] = { ...state[name], ...obj };
    },
    substractFromSub: (state: any, { payload }: { payload: any }) => {
      const { name, value } = payload;
      let newObj = { ...state[name] };
      if (newObj[value]) delete newObj[value];
      state[name] = { ...newObj };
    },
    editValues: (state: any, { payload }: { payload: any }) => {
      const { name, value } = payload;
      state[name] = value;
    },
  },
  extraReducers: (builder) => {
    //Wallet Charge Range
    builder.addCase(addWalletChargeRange.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      addWalletChargeRange.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.walletChargeRangeArray = payload.chargeRange.chargeRanges;
      }
    );
    builder.addCase(
      addWalletChargeRange.rejected,
      (state: any, { payload }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Not able to add wallet charge range. Please try again",
          code: payload,
        };
      }
    );

    //Wallet Charge Range Deletion
    builder.addCase(chargeRangeDeletion.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      chargeRangeDeletion.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.walletChargeRangeArray = payload.chargeRange.chargeRanges;
      }
    );
    builder.addCase(chargeRangeDeletion.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to add wallet charge range. Please try again",
        code: payload,
      };
    });

    //Fetch All Wallet Charge Range
    builder.addCase(fetchChargeRange.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(fetchChargeRange.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.walletChargeRangeArray = payload.chargeRange.chargeRanges;
    });
    builder.addCase(fetchChargeRange.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to add wallet charge range. Please try again",
        code: payload,
      };
    });

    //Set Subscription Packages
    builder.addCase(setSubscription.pending, (state: any) => {
      state.loading = true;
      state.error = { type: "", msg: "", code: "" };
    });
    builder.addCase(setSubscription.fulfilled, (state: any, { payload }) => {
      const { subscription } = payload;
      state.loading = false;
      state.error = { type: "", msg: "", code: "" };
      state.free = subscription.free;
      state.gold = subscription.gold;
      state.platinum = subscription.platinum;
      state.platinum_price_v = subscription.platinumprice.value;
      state.platinum_price_c = subscription.platinumprice.currency;
      state.gold_price_v = subscription.goldprice.value;
      state.gold_price_c = subscription.goldprice.currency;
      state.subs_expiration_value = subscription.expiration.value;
      state.subs_expiration_quantifier = subscription.expiration.identifier;
    });
    builder.addCase(setSubscription.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to add wallet charge range. Please try again",
        code: payload,
      };
    });

    //Set Package Bundles
    builder.addCase(setBundles.pending, (state: any) => {
      state.loading = true;
      state.error = { type: "", msg: "", code: "" };
    });
    builder.addCase(setBundles.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "", msg: "", code: "" };
      const { bundle } = payload;
      state.can_use_crypto_bp = bundle.can_use_crypto.value;
      state.can_use_crypto_bc = bundle.can_use_crypto.currency;
      state.can_use_currency_conversion_bp =
        bundle.can_use_currency_conversion.value;
      state.can_use_currency_conversion_bc =
        bundle.can_use_currency_conversion.currency;
      state.dep_in_multi_eventCategories_bp =
        bundle.dep_in_multi_eventCategories.value;
      state.dep_in_multi_eventCategories_bc =
        bundle.dep_in_multi_eventCategories.currency;
      state.extend_dep_comp_deadlines_bp =
        bundle.extend_dep_comp_deadlines.value;
      state.extend_dep_comp_deadlines_bc =
        bundle.extend_dep_comp_deadlines.currency;
      state.can_use_pledge_forms_bp = bundle.can_use_pledge_forms.value;
      state.can_use_pledge_forms_bc = bundle.can_use_pledge_forms.currency;
      // state.walletChargeRangeArray = payload.chargeRange.chargeRanges;
    });
    builder.addCase(setBundles.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to add wallet charge range. Please try again",
        code: payload,
      };
    });

    //Fetch Sub and Bundles
    builder.addCase(fetchSubAndBundles.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(fetchSubAndBundles.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      const { subscription, bundle, bundlenew } = payload;
      state.loading = false;
      state.error = { type: "", msg: "", code: "" };
      state.free = subscription.free;
      state.gold = subscription.gold;
      state.platinum = subscription.platinum;
      state.platinum_price_v = subscription.platinumprice.value;
      state.platinum_price_c = subscription.platinumprice.currency;
      state.gold_price_v = subscription.goldprice.value;
      state.gold_price_c = subscription.goldprice.currency;
      state.subs_expiration_value = subscription.expiration.value;
      state.subs_expiration_quantifier = subscription.expiration.quantifier;
      state.bundle = bundlenew;
      state.can_use_crypto_bp = bundle.can_use_crypto.value;
      state.can_use_crypto_bc = bundle.can_use_crypto.currency;
      state.can_use_currency_conversion_bp =
        bundle.can_use_currency_conversion.value;
      state.can_use_currency_conversion_bc =
        bundle.can_use_currency_conversion.currency;
      state.dep_in_multi_eventCategories_bp =
        bundle.dep_in_multi_eventCategories.value;
      state.dep_in_multi_eventCategories_bc =
        bundle.dep_in_multi_eventCategories.currency;
      state.extend_dep_comp_deadlines_bp =
        bundle.extend_dep_comp_deadlines.value;
      state.extend_dep_comp_deadlines_bc =
        bundle.extend_dep_comp_deadlines.currency;
      state.can_use_pledge_forms_bp = bundle.can_use_pledge_forms.value;
      state.can_use_pledge_forms_bc = bundle.can_use_pledge_forms.currency;
    });
    builder.addCase(fetchSubAndBundles.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Not able to add wallet charge range. Please try again",
        code: payload,
      };
    });
  },
});

export const { addToSub, substractFromSub, editValues } =
  adminSettingsSlice.actions;
export default adminSettingsSlice.reducer;
