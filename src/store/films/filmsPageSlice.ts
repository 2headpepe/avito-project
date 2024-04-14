import { createSlice } from "@reduxjs/toolkit";
import { TState } from "./types";
import { fetchFilmPage } from "./filmsPageActions";

const initialState: TState = {
  currentPage: 1,
  totalPages: 0,
  limit: 10,
  data: [],
  status: "idle",
  error: null,
  lastQueries: [],
};

const filmsPageSlice = createSlice({
  name: "films",
  initialState: initialState,
  reducers: {
    setFilmPage: (state, action) => {
      console.log(action.payload);
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

export default filmsPageSlice;
export const { setFilmPage, setFilmLimit } = filmsPageSlice.actions;
