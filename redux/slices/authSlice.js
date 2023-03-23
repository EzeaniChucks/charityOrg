import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  error: { type: "", msg: "" },
};

const userSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    logError: (state, { payload }) => {
      state.error.type = payload.type;
      state.error.msg = payload.msg;
    },
  },
});

export const { logError } = userSlice.actions;
export default userSlice.reducer;
