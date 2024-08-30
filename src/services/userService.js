import { doc, getDoc, getFirestore } from "firebase/firestore";

export const fetchUserData = async (uid) => {
  try {
    const db = getFirestore();
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      //console.log("USER SERVICE PAGE LOG: ", userDoc.data);

      return userDoc.data();
    } else {
      console.log("Belge Bulunamadi");
      return null;
    }
  } catch (error) {
    console.log("error usersevice 14. line", error);
    return null;
  }
};
