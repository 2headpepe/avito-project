export type TImage = {
  movieId: number;
  type: string;
  language: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
};
export type TImageResponse = {
  docs: TImage[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type TState = {
  imagesByMovieId: Record<number, TImage[]>;
  currentPage: number;
  totalPages: number;
  status: string;
  error: string | null;
};

export type TFetchImagesPageProps = {
  page: number;
  movieId: number;
};
