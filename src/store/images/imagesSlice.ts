import { createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";
import { fetchImagesPage } from "./imagesActions";

const initialState: TState = {
  currentPage: 1,
  totalPages: 0,
  imagesByMovieId: {},
  status: "idle",
  error: null,
};

const imagesSlice = createSlice({
  name: "images",
  initialState: initialState,
  reducers: {
    setImagesPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImagesPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchImagesPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload.images);
        state.imagesByMovieId[action.payload.movieId] =
          action.payload.images.docs;
        state.totalPages = Math.ceil(
          action.payload.images.total / action.payload.images.limit
        );
      })
      .addCase(fetchImagesPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default imagesSlice;
export const { setImagesPage } = imagesSlice.actions;
