import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBlywUjnuT8FHeDEUUG1MiZQfd91-ReVg",
  authDomain: "bookstore-5a22f.firebaseapp.com",
  projectId: "bookstore-5a22f",
  storageBucket: "bookstore-5a22f.appspot.com",
  messagingSenderId: "276360965505",
  appId: "1:276360965505:web:e6a7c7281e09e5c6e7cc80"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth };