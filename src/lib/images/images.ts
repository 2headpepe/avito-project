import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IImageResponse, IState } from "./types";

const initialState: IState = {
  currentPage: 1,
  totalPages: 0,
  imagesByMovieId: {},
  status: "idle",
  error: null,
};

export const fetchImagesPage = createAsyncThunk(
  "pagination/fetchImagesPage",
  async ({
    page,
    movieId,
  }: {
    page: number;
    movieId: number;
  }): Promise<{ movieId: number; images: IImageResponse }> => {
    const imagesResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/image?page=${page}&limit=10&movieId=${movieId}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const images: IImageResponse = await imagesResponse.json();
    return { movieId, images };
  }
);

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

export const { setImagesPage } = imagesSlice.actions;
export default imagesSlice.reducer;
