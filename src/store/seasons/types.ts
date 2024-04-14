export type TSeason = {
  movieId: number;
  number: number;
  episodesCount: number;
  episodes: {
    number: number;
    name: string;
    enName: string;
    description: string;
    still: {
      url: string;
      previewUrl: string;
    };
  }[];
  poster: {
    url: string;
    previewUrl: string;
  };
  name: string;
  enName: string;
  duration: number;
  description: string;
  enDescription: string;
};
export type TSeasonsResponse = {
  docs: TSeason[];
  total: number;
  limit: number;
  page: number;
  pages: number;
};

type TFilmState = {
  data: TSeason[];
  currentPage: number;
  totalPages: number;
};
export type TState = {
  seasonsByMovieId: Record<number, TFilmState>;
  status: string;
  error: string | null;
};

export type TFetchSeasonsPageProps = {
  page: number;
  movieId: number;
  limit: number;
};
