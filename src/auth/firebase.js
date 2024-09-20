import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
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

const logginWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider:'local',
      email,
    });
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

const logout = () =>{
    signOut(auth);
}

export { auth, db, logginWithEmailAndPassword, registerWithEmailAndPassword, logout };
