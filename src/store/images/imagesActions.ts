import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFetchImagesPagePayload } from "./payloadTypes";
import { TFetchImagesPageProps, TImageResponse } from "./types";

export const fetchImagesPage = createAsyncThunk(
  "pagination/fetchImagesPage",
  async ({
    page,
    movieId,
  }: TFetchImagesPageProps): Promise<TFetchImagesPagePayload> => {
    const imagesResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/image?page=${page}&limit=10&movieId=${movieId}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const images: TImageResponse = await imagesResponse.json();
    return { movieId, images };
  }
);
