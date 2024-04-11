interface IFilmInfo {
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
  enName: string | null;
  alternativeName: string | null;
  description: string | null;
  year: number | null;
  images: {
    postersCount: number;
    backdropsCount: number;
    framesCount: number;
  };
  productionCompanies: {
    name: string;
    url: string;
    previewUrl: string;
  }[];
  spokenLanguages: {
    name: string;
    nameEn: string;
  }[];
  distributors: {
    distributor: string;
    distributorRelease: string;
  };
  premiere: {
    world: string;
    russia: string;
    bluray: string;
    dvd: string;
  };
  slogan: string;
  budget: {
    value: number;
    currency: string;
  };
  poster: {
    url: string | null;
    previewUrl: string | null;
  };
  facts: {
    value: string;
    type: string;
    spoiler: boolean;
  }[];
  genres: {
    name: string;
  }[];
  countries: {
    name: string;
  }[];
  persons: {
    id: number;
    photo: string;
    name: string;
    enName: string;
    description: string;
  }[];
  reviewInfo: {
    count: number;
    positiveCount: number;
    percentage: string;
  };
  ratingMpaa: string;
  ageRating: string;
  similarMovies: {
    id: number;
    name: string;
    enName: string;
    alternativeName: string;
    type: string;
    poster: {
      url: string;
      previewUrl: string;
    };
    rating: {
      kp: number | null;
      imdb: number | null;
      filmCritics: number | null;
      russianFilmCritics: number | null;
      await: number | null;
    };
    year: number;
  }[];
}

export interface IState {
  filmById: Record<number, IFilmInfo>;
  status: string;
  error: string | null;
}

export type IFilmResponse = IFilmInfo;
