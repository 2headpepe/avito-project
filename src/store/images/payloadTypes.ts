import { TImage } from "./types";

export type TFetchImagesPagePayload = {
  movieId: number;
  images: TImageResponse;
};

export type TImageResponse = {
  docs: TImage[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};
