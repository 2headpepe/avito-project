import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IState, IUserReviewResponse } from "./types";

const initialState: IState = {
  data: [],
  currentPage: 1,
  totalPages: 0,
  status: "idle",
  error: null,
  limit: 1,
  movieId: null,
};

const userReviewsSlice = createSlice({
  name: "userReviews",
  initialState: initialState,
  reducers: {
    setUserReviewsPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setUserReviewsMovieId: (state, action) => {
      state.movieId = action.payload;
    },
    setUserReviewsLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.docs;
        state.totalPages = Math.ceil(
          action.payload.total / action.payload.limit
        );
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const fetchUserReviews = createAsyncThunk(
  "pagination/userReviews",
  async ({
    page,
    limit,
    movieId,
  }: {
    page: number;
    limit: number;
    movieId: number;
  }): Promise<IUserReviewResponse> => {
    const userReviewsResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/review?page=${page}&limit=${limit}&movieId=${movieId}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const userReviews: IUserReviewResponse = await userReviewsResponse.json();
    return userReviews;
  }
);

export const {
  setUserReviewsPage,
  setUserReviewsLimit,
  setUserReviewsMovieId,
} = userReviewsSlice.actions;
export default userReviewsSlice.reducer;
