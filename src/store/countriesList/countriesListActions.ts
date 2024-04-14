import { createAsyncThunk } from "@reduxjs/toolkit";
import { TCountryResponse } from "./payloadTypes";
// import { getCountriesListMock } from "./mockData";

export const fetchCountryList = createAsyncThunk(
  "/fetchCountryList",
  async (): Promise<TCountryResponse> => {
    const countriesListResponse = await fetch(
      `https://api.kinopoisk.dev/v1/movie/possible-values-by-field?field=countries.name`,
      {
        headers: { "X-API-KEY": import.meta.env.VITE_KINOPOISK_API_KEY },
        method: "GET",
      }
    );
    // const countriesListResponse = await getCountriesListMock();
    const countriesList: TCountryResponse = await countriesListResponse.json();
    return countriesList;
  }
);
