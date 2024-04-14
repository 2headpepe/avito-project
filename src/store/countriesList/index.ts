import { RootState } from "../store";
import countriesListSlice from "./countriesListSlice";

export default countriesListSlice.reducer;
export { fetchCountryList } from "./countriesListActions";
export type { TCountryResponse } from "./payloadTypes";
export const selectCountriesList = (state: RootState) => state.countriesList;
