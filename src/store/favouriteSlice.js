import { createSlice } from "@reduxjs/toolkit";
import { addFavouriteToFirebase, auth, db } from "../auth/firebase";
import { collection, doc, query } from "firebase/firestore";

const initialState = {
  favourites: [],
};

export const favouriteSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    addFavourite(state, action) {
      state.favourites = [...state.favourites, action.payload];
      const user = auth.currentUser;
      if (user) {
        addFavouriteToFirebase(user.uid, action.payload);
      }
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
export const getFavouriteFromSource = () => async (dispatch)=>{
const user = auth.currentUser;
if (user) {
  const q = query(collection(db, `users/${user.uid}/favourites`));
  const favourits = q.docs.map((doc))
}
}
export const { addFavourite, clearFavourite, removeFavourit } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
