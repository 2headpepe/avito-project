import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";
import { fetchUserReviews } from "./userReviewsActions";
import { IUserReviewResponse } from "./payloadTypes";

const initialState: TState = {
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
    setUserReviewsPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setUserReviewsMovieId: (state, action: PayloadAction<number>) => {
      state.movieId = action.payload;
    },
    setUserReviewsLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchUserReviews.fulfilled,
        (state, action: PayloadAction<IUserReviewResponse>) => {
          state.status = "succeeded";
          state.data = action.payload.docs;
          state.totalPages = Math.ceil(
            action.payload.total / action.payload.limit
          );
        }
      )
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export default userReviewsSlice;
export const {
  setUserReviewsPage,
  setUserReviewsLimit,
  setUserReviewsMovieId,
} = userReviewsSlice.actions;
