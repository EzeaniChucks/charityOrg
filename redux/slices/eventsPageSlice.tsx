import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { conString } from "@/utils/conString";


interface Obj {
  tabState: String;
}
const initialState: Obj = {
  tabState: "deposit",
};

const eventPageSlice = createSlice({
  name: "eventPageSlice",
  initialState,
  reducers: {
    updateEventForm: (state: any, action: PayloadAction<any>) => {},
  },
  extraReducers: (builder) => {},
});

export const {} = eventPageSlice.actions;
export default eventPageSlice.reducer;
