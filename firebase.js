// ==============================
// CHATIFY - firebase.js
// Simple base setup (no usage yet)
// ==============================

// Firebase SDKs (Web v9 modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// Firebase configuration
// 🔑 Replace values later from Firebase Console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services (future use)
export const auth = getAuth(app);
export const db = getFirestore(app);

// NOTE:
// Abhi koi Firebase feature use nahi ho raha.
// Baad me chat.js me import karke use karenge.
