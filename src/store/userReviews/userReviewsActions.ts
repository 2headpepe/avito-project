import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUserReviewResponse } from "./payloadTypes";
import { TFetchUserReviewsProps } from "./types";

export const fetchUserReviews = createAsyncThunk(
  "pagination/userReviews",
  async ({
    page,
    limit,
    movieId,
  }: TFetchUserReviewsProps): Promise<IUserReviewResponse> => {
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
