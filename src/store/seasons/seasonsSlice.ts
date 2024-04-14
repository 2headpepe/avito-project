import { createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";
import { fetchSeasonsPage } from "./seasonsActions";

const initialState: TState = {
  seasonsByMovieId: {},
  status: "idle",
  error: null,
};

const seasonsSlice = createSlice({
  name: "seasons",
  initialState: initialState,
  reducers: {
    setSeasonsPage: (state, action) => {
      console.log(action.payload);
      state.seasonsByMovieId[action.payload.movieId].currentPage =
        action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasonsPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeasonsPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.seasonsByMovieId[action.payload.movieId] = {
          data: action.payload.seasons.docs,
          totalPages: Math.ceil(
            action.payload.seasons.total / action.payload.seasons.limit
          ),
          currentPage: 1,
        };
      })
      .addCase(fetchSeasonsPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default seasonsSlice;
export const { setSeasonsPage } = seasonsSlice.actions;
