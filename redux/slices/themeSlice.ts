import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { conString } from "@/utils/conString";

interface Obj {}
const initialState: Obj = {
  theme: "light-theme",
};

const themeSlice = createSlice({
  name: "themeSlice",
  initialState,
  reducers: {
    changeTheme: (state: any, { payload }) => {
      state.theme = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const {} = themeSlice.actions;
export default themeSlice.reducer;
