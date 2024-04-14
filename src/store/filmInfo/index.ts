import filmInfoSlice from "./filmInfoSlice";
import { fetchFilmInfo } from "./filmInfoActions";
import { RootState } from "../store";

export { fetchFilmInfo };
export const selectFilmInfo = (state: RootState) => state.filmInfo;

export default filmInfoSlice.reducer;
