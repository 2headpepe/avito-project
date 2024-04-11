export interface IImage {
  movieId: number;
  type: string;
  language: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
}
export interface IImageResponse {
  docs: IImage[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IState {
  imagesByMovieId: Record<number, IImage[]>;
  currentPage: number;
  totalPages: number;
  status: string;
  error: string | null;
}
