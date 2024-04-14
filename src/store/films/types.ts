export interface TFilm {
  status: string | null;
  rating: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
  votes: {
    kp: number | null;
    imdb: number | null;
    filmCritics: number | null;
    russianFilmCritics: number | null;
    await: number | null;
  };
  backdrop: {
    url: string | null;
    previewUrl: string | null;
  };
  movieLength: number | null;
  id: number;
  type: string | null;
  name: string | null;
  description: string | null;
  year: number | null;
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  typeNumber: number | null;
  alternativeName: string | null;
  enName: string | null;
  names: {
    name: string;
    language: string | null;
    type: string | null;
  }[];
  ratingMpaa: string | null;
  shortDescription: string | null;
  ticketsOnSale: boolean;
  ageRating: number | null;
  logo: {
    url: string;
  };
  top10: number | null;
  top250: number | null;
  isSeries: boolean;
  seriesLength: number | null;
  totalSeriesLength: number | null;
}


export interface TFilmResponse {
  docs: TFilm[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export type TState = {
  data: TFilm[];
  lastQueries: string[];
  currentPage: number;
  totalPages: number;
  limit: number;
  status: string;
  error: string | null;
};
