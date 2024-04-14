import { createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";
import { fetchFilmInfo } from "./filmInfoActions";

const initialState: TState = {
  filmById: {},
  status: "idle",
  error: null,
};

const filmInfoSlice = createSlice({
  name: "filmInfo",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilmInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.filmById[action.payload.id] = action.payload.filmInfo;
      })
      .addCase(fetchFilmInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default filmInfoSlice;
