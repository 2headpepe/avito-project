import filmsPageSlice from "./filmsPageSlice";
import { RootState } from "../store";
import { TFetchFilmPage } from "./payloadTypes";
import { TFilm } from "./types";
import { setFilmPage, setFilmLimit } from "./filmsPageSlice";

export { fetchFilmsPage } from "./filmsPageActions";
export { setFilmPage, setFilmLimit };
export default filmsPageSlice.reducer;

export type { TFetchFilmPage, TFilm };

export const selectAllFilms = (state: RootState) => state.films;
