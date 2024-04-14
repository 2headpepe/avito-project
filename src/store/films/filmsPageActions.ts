import { createAsyncThunk } from "@reduxjs/toolkit";
import { TFetchFilmPage, TFetchFilmPageResponse } from "./payloadTypes";
import { TFilmResponse } from "./types";

export const fetchFilmsPage = createAsyncThunk(
  "pagination/fetchFilmsPage",
  async ({
    page,
    limit,
    year,
    country,
    ageRating,
    type,
    query,
  }: TFetchFilmPage): Promise<TFetchFilmPageResponse> => {
    if (query) {
      const filmsResponse = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limit}&query=${query}`,
        {
          headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
          method: "GET",
        }
      );

      const films: TFilmResponse = await filmsResponse.json();
      return { films, query };
    }
    const filmsResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}${
        type ? `&type=${type}` : ""
      }${year ? `&year=${year}` : ""}${
        ageRating ? `&ageRating=${ageRating}` : ""
      }${country ? `&countries.name=${country}` : ""}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );

    const films: TFilmResponse = await filmsResponse.json();
    return { films, query };
  }
);
