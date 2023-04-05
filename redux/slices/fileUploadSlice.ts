import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { ParsedUrlQuery } from "querystring";

// const conString = "http://localhost:8080";

const conString = "https://charityorg.onrender.com";

export const uploadEventImage = createAsyncThunk(
  "event/uploadEventImage",
  async (prop: any, thunk) => {
    try {
      const { data }: { data: any } = await axios.post(
        `${conString}/upload_image`,
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

const initialState = {
  status: "",
  loading: "",
};

const uploadImageSlice = createSlice({
  name: "uploadImageSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    ///CREATE EVENT
    builder.addCase(uploadEventImage.pending, (state: any) => {
      state.loading = true;
    });
    builder.addCase(uploadEventImage.fulfilled, (state: any, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.status = payload;
    });
    builder.addCase(uploadEventImage.rejected, (state: any, { payload }) => {
      state.loading = false;
      state.status = payload;
    });
  },
});

export const {} = uploadImageSlice.actions;
export default uploadImageSlice.reducer;
