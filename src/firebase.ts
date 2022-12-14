import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_BUCKET_ID,
//   messagingSenderId: import.meta.env.VITE_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MESS_ID,
// };

const firebaseConfig = {
  apiKey: "AIzaSyDD1qqFbXzO_-zOuroHXhU4q1rGuJY1uGA",

  authDomain: "todo-app-95242.firebaseapp.com",

  projectId: "todo-app-95242",

  storageBucket: "todo-app-95242.appspot.com",

  messagingSenderId: "1065385898997",

  appId: "1:1065385898997:web:8212e66e0ebc3f412d26bc",

  measurementId: "G-Z5R1ZW8GD7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export { db, auth };
