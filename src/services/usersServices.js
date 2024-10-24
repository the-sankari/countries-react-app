import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from "../auth/firebase";

export const fetchUserData = async (uid) => {
  try {
    const userDocRef = doc(db, "users", uid); // Reference to the user's document in Firestore
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // User document exists, return the data
      const userData = userDoc.data();
      console.log("User data:", userData);
      return userData;
    } else {
      console.log("No such user document in Firestore!");
    }
  } catch (error) {
    console.log("Error fetching user data from Firestore:", error);
  }
};
