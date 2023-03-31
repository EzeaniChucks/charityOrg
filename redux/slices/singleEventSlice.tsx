import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";
import { removeUser } from "@/utils/localstorage";

// const conString = "http://localhost:8080";

const conString = "https://charityorg.onrender.com";

interface Obj {}
const initialState: Obj = {};

const eventSlice = createSlice({
  name: "singleEventSlice",
  initialState,
  reducers: {},
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;
