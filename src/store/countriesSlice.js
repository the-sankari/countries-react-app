import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  isLoading: true,
  search: "",
  error: null,
};

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  // Reducers are used for internal app state management (not from API or remote)
  reducers: {
    getCountries(state, action) {
      state.countries = action.payload;
      state.error = null; // Clear error on successful fetch
    },
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    search(state, action) {
      state.search = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },

  //Extra reducers are used for Async calls.
  extraReducers() {},
});

// This are actions to be used in components later
export const { getCountries, isLoading, search, setError } =
  countriesSlice.actions;

// This is the connection to store.js
export default countriesSlice.reducer;
