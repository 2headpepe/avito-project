import { configureStore } from "@reduxjs/toolkit";
import filmsSlice from "./films/films";
import imagesSlice from "./images/images";
import filmInfoSlice from "./filmInfo/filmInfo";
import userReviewsSlice from "./userReviews/userReviews";
import countriesListSlice from "./countriesList/countriesList";

export const store = configureStore({
  reducer: {
    films: filmsSlice,
    images: imagesSlice,
    filmInfo: filmInfoSlice,
    userReviews: userReviewsSlice,
    countriesListSlice: countriesListSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;