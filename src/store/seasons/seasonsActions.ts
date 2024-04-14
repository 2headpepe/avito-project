import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFetchSeasonsPageProps, TSeasonsResponse } from "./types";
import { TFetchSeasonsPagePayload } from "./payloadTypes";

export const fetchSeasonsPage = createAsyncThunk(
  "pagination/fetchSeasonsPage",
  async ({
    page,
    movieId,
    limit,
  }: TFetchSeasonsPageProps): Promise<TFetchSeasonsPagePayload> => {
    const seasonsResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/season?page=${page}&limit=${limit}&movieId=${movieId}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const seasons: TSeasonsResponse = await seasonsResponse.json();
    return { movieId, seasons };
  }
);
