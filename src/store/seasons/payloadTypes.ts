import { TSeason } from "./types";

export type TFetchSeasonsPagePayload = {
  movieId: number;
  seasons: TSeasonsResponse;
};

export type TSeasonsResponse = {
  docs: TSeason[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};
