import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: "cs-401w.firebaseapp.com",
    projectId: "cs-401w",
    storageBucket: "cs-401w.appspot.com",
    messagingSenderId: "361889129810",
    appId: "1:361889129810:web:8f94eb6aa10b7a8e13068b"
  };

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
