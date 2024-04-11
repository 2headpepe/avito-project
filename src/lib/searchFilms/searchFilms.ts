import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IFilmResponse, IState } from "./types";

const initialState: IState = {
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  data: [],
  status: "idle",
  error: null,
};

const filmSearchSlice = createSlice({
  name: "filmsSearch",
  initialState: initialState,
  reducers: {
    setFilmSearchPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilmSearchLimit: (state, action) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmSearchPage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFilmSearchPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.films.docs;

        state.totalPages = Math.ceil(
          action.payload.films.total / action.payload.films.limit
        );
      })
      .addCase(fetchFilmSearchPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Unknown error";
      });
  },
});

export const fetchFilmSearchPage = createAsyncThunk(
  "pagination/fetchFilmSearchPage",
  async ({
    page,
    limit,
    query,
  }: {
    page: number;
    limit: number;
    query: string;
  }): Promise<{ films: IFilmResponse; query: string }> => {
    const filmsResponse = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie?page=${page}&limit=${limit}&query=${query}`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );

    const films: IFilmResponse = await filmsResponse.json();
    return { films, query };
  }
);

export const { setFilmSearchLimit, setFilmSearchPage } =
  filmSearchSlice.actions;
export default filmSearchSlice.reducer;
