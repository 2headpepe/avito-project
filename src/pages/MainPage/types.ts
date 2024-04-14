import { fetchFilmPage } from "../../store/films";

export type ActionType = ReturnType<typeof fetchFilmPage>;

export type TFilmType =
  | "year"
  | "country"
  | "ageRating"
  | "all"
  | "movie"
  | "tv-series";
