import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import filmsSlice from "./films";
import imagesSlice from "./images";
import filmInfoSlice from "./filmInfo";
import countriesListSlice from "./countriesList";
import userReviewsSlice from "./userReviews";
import seasonsSlice from "./seasons";

export const store = configureStore({
  reducer: {
    films: filmsSlice,
    images: imagesSlice,
    filmInfo: filmInfoSlice,
    userReviews: userReviewsSlice,
    countriesList: countriesListSlice,
    seasons: seasonsSlice,
  },
});

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
