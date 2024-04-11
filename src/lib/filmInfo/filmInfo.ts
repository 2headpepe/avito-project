import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFilmResponse, IState } from "./types";

const initialState: IState = {
  filmById: {},
  status: "idle",
  error: null,
};

const filmSlice = createSlice({
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

export const fetchFilmInfo = createAsyncThunk(
  "/fetchFilmInfo",
  async (id: number): Promise<{ filmInfo: IFilmResponse; id: number }> => {
    const filmInfoResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie/${id}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const filmInfo: IFilmResponse = await filmInfoResponse.json();
    return { id, filmInfo };
  }
);

export default filmSlice.reducer;
