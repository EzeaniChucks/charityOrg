import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Obj } from "@/components/auth/register";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { removeUser } from "@/utils/localstorage";
import { conString } from "@/utils/conString";

export const register = createAsyncThunk(
  "auth/register",
  async (prop: Obj, thunk) => {
    try {
      const { data }: { data: string } = await axios.post(
        `${conString}/auth/register`,
        prop,
        {}
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (prop: { email: string; password: string }, thunk) => {
    try {
      const { data }: { data: string } = await axios.post(
        `${conString}/auth/login`,
        prop,
        {}
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
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
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const fetchCompleteUserDetails = createAsyncThunk(
  "auth/fetchCompleteUserDetails",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.get(
        `${conString}/auth/complete_user/${prop}`
      );
      return data;
    } catch (err: any) {
      return (
        thunk.rejectWithValue(err.response.data.msg) || "Something went wrong"
      );
    }
  }
);
export const setUserSubscription = createAsyncThunk(
  "auth/editUserSubType",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/auth/editUserSubType`,
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
export const setUserBundle = createAsyncThunk(
  "auth/editUserBundleAmount",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/auth/editUserBundleAmount`,
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
  error: { type: "", msg: "", code: "" },
  afterRegistration: "",
  verification_status: false,
  userBundleName: "",
  userBundlePrice: "",
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
      console.log("called", name, value);
      state[name] = value;
    },
    logout: (state: any) => {
      removeUser();
      state.user = null;
    },
    setUser: (state: any, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    ///REGISTER
    builder.addCase(register.pending, (state: any) => {
      state.loading = true;
      state.afterRegistration = "";
    });
    builder.addCase(register.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.afterRegistration = payload;
      state.firstName = "";
      state.password = "";
      state.confirmPass = "";
      state.phoneNumber = "";
      state.cardNumber = "";
      state.cvv = "";
      state.promoCode = "";
    });
    builder.addCase(register.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = { type: "server_error", msg: payload };
      state.afterRegistration = "";
    });

    ///LOGIN
    builder.addCase(login.pending, (state: any) => {
      state.loading = true;
      state.user = null;
    });
    builder.addCase(login.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(login.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.user = null;
      state.error = { type: "server_error", msg: payload, code: payload };
    });

    ///VERIFY
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
    });

    //Fetch Complete User Details
    builder.addCase(fetchCompleteUserDetails.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      fetchCompleteUserDetails.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.user = payload;
      }
    );
    builder.addCase(
      fetchCompleteUserDetails.rejected,
      (state: any, { payload }) => {
        state.loading = false;
        state.error = {
          type: "server_error",
          msg: "Something went wrong. Please try again",
          code: payload,
        };
      }
    );

    //Edit user subscription type
    builder.addCase(setUserSubscription.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(
      setUserSubscription.fulfilled,
      (state: any, { payload }) => {
        state.loading = false;
        state.user = payload;
      }
    );
    builder.addCase(setUserSubscription.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Something went wrong. Please try again",
        code: payload,
      };
    });

    //Edit user bundle
    builder.addCase(setUserBundle.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(setUserBundle.fulfilled, (state: any, { payload }) => {
      state.loading = false;
      state.user = payload;
    });
    builder.addCase(setUserBundle.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.error = {
        type: "server_error",
        msg: "Something went wrong. Please try again",
        code: payload,
      };
    });
  },
});

export const { logError, updateFormValues, setUser, logout } =
  userSlice.actions;
export default userSlice.reducer;
