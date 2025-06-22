// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAg7_Up9HWkq6P5tEB_ELEFEqd1EobveUk",
  authDomain: "escritorio-direito-b6bb8.firebaseapp.com",
  projectId: "escritorio-direito-b6bb8",
  storageBucket: "escritorio-direito-b6bb8.firebasestorage.app",
  messagingSenderId: "922868836048",
  appId: "1:922868836048:web:01de4dbcc12ab8523960d5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
