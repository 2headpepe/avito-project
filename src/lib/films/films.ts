import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFilmResponse, IState } from "./types";

const initialState: IState = {
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  data: [],
  status: "idle",
  error: null,
  lastQueries: [],
};

const filmSlice = createSlice({
  name: "films",
  initialState: initialState,
  reducers: {
    setFilmPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilmLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilmPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.films.docs;
        if (action.payload.query) {
          if (state.lastQueries.length === 20) {
            state.lastQueries.shift();
          }
          state.lastQueries.push(action.payload.query);
        }

        state.totalPages = Math.ceil(
          action.payload.films.total / action.payload.films.limit
        );
      })
      .addCase(fetchFilmPage.rejected, (state, action) => {
        console.log(action.payload);

        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const fetchFilmPage = createAsyncThunk(
  "pagination/fetchFilmPage",
  async ({
    page,
    limit,
    year,
    country,
    ageRating,
    type,
    query,
  }: {
    page: number;
    limit: number;
    year?: string;
    country?: string;
    ageRating?: string;
    type?: string;
    query?: string;
  }): Promise<{ films: IFilmResponse; query?: string }> => {
    if (query) {
      const filmsResponse = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=${page}&limit=${limit}&query=${query}`,
        {
          headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
          method: "GET",
        }
      );

      const films: IFilmResponse = await filmsResponse.json();
      return { films, query };
    }
    const filmsResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}${
        type ? `&type=${type}` : ""
      }${year ? `&year=${year}` : ""}${
        ageRating ? `&ageRating=${ageRating}` : ""
      }${country ? `&countries.name=${country}` : ""}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );

    const films: IFilmResponse = await filmsResponse.json();
    return { films, query };
  }
);

export const { setFilmPage, setFilmLimit } = filmSlice.actions;
export default filmSlice.reducer;
