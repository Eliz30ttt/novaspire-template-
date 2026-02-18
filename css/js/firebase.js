// Firebase CDN imports (WORKS in normal HTML projects)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔹 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDDEqYWqiK0LhyqoZBix2I9jM3IPVpAIjc",
  authDomain: "novaspirebank-6ddf3.firebaseapp.com",
  projectId: "novaspirebank-6ddf3",
  storageBucket: "novaspirebank-6ddf3.firebasestorage.app",
  messagingSenderId: "943003513813",
  appId: "1:943003513813:web:6fa745d41fb31b0a03435c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export helpers
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc
};
