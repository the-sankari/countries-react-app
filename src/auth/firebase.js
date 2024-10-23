import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "countries-react-24k.firebaseapp.com",
  projectId: "countries-react-24k",
  storageBucket: "countries-react-24k.appspot.com",
  messagingSenderId: "42483464868",
  appId: "1:42483464868:web:4573e3bdd6cb8c338c8431",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

// Logging with email and password

const logginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

// Registration
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const logout = () => {
  signOut(auth);
};

// Add favourite to firebase
const addFavouriteToFirebase = async (uid, name) => {
  try {
    await addDoc(collection(db, `users/${uid}/favourite`), { name });
    console.log("Favourites added to firebase");
  } catch (error) {
    console.log("Error adding fourite from firebase", error);
  }
};

// Mange favourite in firebase
const manageFavouriteInFirebase = async (uid, name) => {
  try {
    const q = name
      ? query(
          collection(db, `users/${uid}/favourites`),
          where("name", "==", name)
        )
      : query(collection(db, `users/${uid}/favourites`));
    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));

    await Promise.all(deletePromises);
    console.log(
      name
        ? "Favourite removed from firebase "
        : "Favourites cleared from firebase"
    );
  } catch (error) {
    console.log(
      name
        ? "Error removing favourite from firebase"
        : "Error clearing favourite from firebas"
    );
    console.error(error);
  }
};
// Remove favourite from firebase
const removeFavouriteFromFirebase = (uid, name) => {
  manageFavouriteInFirebase(uid, name);
};
const clearFavouriteFromFirebase = (uid) => {
  manageFavouriteInFirebase(uid);
};
// const removeFavouriteFromFirebase = async (uid, name) => {
//   if (!name) {
//     console.error(
//       "Error removing favourite from firebase: Name parameter undefined"
//     );
//     return;
//   }
//   try {
//     const q = query(
//       collection(db, `users/${uid}/favourites`),
//       where("name", "==", name)
//     );

//     const querySnapshot = await getDocs(q);
//     // querySnapshot.forEach((doc) => {
//     //   deleteDoc(doc.ref);
//     //   console.log("Favourite  removed from firebase");
//     // });
//     if (querySnapshot.empty) {
//       console.log("No matchin documents found for removing");
//       return;
//     }
//     const deltePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
//     await Promise.all(deltePromises);
//     console.log("Favourite removed from firebase");
//   } catch (error) {
//     console.error("Error removing favourite from firebase", error);
//   }
// };

// Clear favourite from firebase
// const clearFavouriteFromFirebase = async (uid) => {
//   try {
//     const q = query(collection(db, `users/${uid}/favourites`));
//     const querySnapshot = await getDocs(q);
//     querySnapshot.forEach((doc) => {
//       deleteDoc(doc.ref);
//       console.log("Favourites  cleared from firebase");
//     });
//     console.log("Favourites cleared from firebase");
//   } catch (error) {
//     console.log("Error clearing favourite from firebase", error);
//   }
// };

export {
  auth,
  db,
  logginWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
  addFavouriteToFirebase,
  removeFavouriteFromFirebase,
  clearFavouriteFromFirebase,
  manageFavouriteInFirebase,
};
