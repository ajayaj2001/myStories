import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCeMh5URyV2jIrK1oGG9pCo5dKua17O4dI",
  authDomain: "ajblog2001.firebaseapp.com",
  projectId: "ajblog2001",
  storageBucket: "ajblog2001.appspot.com",
  messagingSenderId: "315114001772",
  appId: "1:315114001772:web:c01e6076edc80dd5650f49",
  measurementId: "G-HP2J9WH5TJ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
