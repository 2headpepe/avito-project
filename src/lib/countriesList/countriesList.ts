import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICountryResponse, IState } from "./types";

const initialState: IState = {
  data: [],
  status: "idle",
  error: null,
};

const countriesListSlicer = createSlice({
  name: "countriesList",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountryList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCountryList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCountryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const fetchCountryList = createAsyncThunk(
  "/fetchCountryList",
  async (): Promise<ICountryResponse> => {
    const countriesListResponse = await fetch(
      `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const countriesList: ICountryResponse = await countriesListResponse.json();
    return countriesList;
  }
);

export default countriesListSlicer.reducer;
