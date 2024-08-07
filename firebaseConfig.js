import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtKnDFWk7zm9yl0YSd_zQ5fjFHiugTT7w",
  authDomain: "barbaros-402c7.firebaseapp.com",
  projectId: "barbaros-402c7",
  storageBucket: "barbaros-402c7.appspot.com",
  messagingSenderId: "1092351349779",
  appId: "1:1092351349779:web:0464f8e438be3481981be6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
export const db = getFirestore(app);

export default app;
