import { TFilmResponse } from "./types";

export type TFetchFilmPage = {
  page: number;
  limit: number;
  year?: string;
  country?: string;
  ageRating?: string;
  type?: string;
  query?: string;
};

export type TFetchFilmPageResponse = { films: TFilmResponse; query?: string };
