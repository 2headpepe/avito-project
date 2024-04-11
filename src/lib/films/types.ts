export interface IFilm {
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
export interface IImage {
  movieId: number;
  type: string;
  language: string;
  url: string;
  previewUrl: string;
  height: number;
  width: number;
}

export interface IFilmResponse {
  docs: IFilm[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IImageResponse {
  docs: IImage[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}
interface IFilmWithImage extends IFilm {
  images: IImageResponse;
}
export interface IFilmWithImagesResponse {
  docs: IFilmWithImage[];
  total: number;
  limit: number;
  page: number;
  pages: number;
}

export interface IState {
  data: IFilm[];
  lastQueries: string[];
  currentPage: number;
  totalPages: number;
  limit: number;
  status: string;
  error: string | null;
}
