import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFetchFilmInfoPayload } from "./payloadTypes";
import { TFilmResponse } from "./types";

export const fetchFilmInfo = createAsyncThunk(
  "/fetchFilmInfo",
  async (id: number): Promise<TFetchFilmInfoPayload> => {
    const filmInfoResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie/${id}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    const filmInfo: TFilmResponse = await filmInfoResponse.json();
    return { id, filmInfo };
  }
);
