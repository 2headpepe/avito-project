import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchCountryList } from "./countriesListActions";
import { TCountryResponse } from "./payloadTypes";
import { TState } from "./types";

const initialState: TState = {
  data: [],
  status: "idle",
  error: null,
};

const countriesListSlice = createSlice({
  name: "countriesList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCountryList.fulfilled,
        (state, action: PayloadAction<TCountryResponse>) => {
          state.status = "succeeded";
          state.data = action.payload;
        }
      )
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default countriesListSlice;
