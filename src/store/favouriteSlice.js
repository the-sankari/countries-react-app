import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favourites: [],
};

export const favouriteSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
    },
    clearFavourite(state) {
      state.favourites = [];
    },
    removeFavourit(state, action) {
      state.favourites = state.favourites.filter(
        (favourite) => favourite !== action.payload
      );
    },
  },
});
export const { addFavourite, clearFavourite, removeFavourit } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
