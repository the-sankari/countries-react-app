import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouriteSlice from "./favouriteSlice";

export const store = configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouriteSlice,
  },
});
