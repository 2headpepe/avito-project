import { RootState } from "../store";
import seasonsSlice from "./seasonsSlice";

export const { setSeasonsPage } = seasonsSlice.actions;
export { fetchSeasonsPage } from "./seasonsActions";
export default seasonsSlice.reducer;
export const selectAllSeasons = (state: RootState) => state.seasons;
