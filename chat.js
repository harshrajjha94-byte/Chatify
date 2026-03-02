// =======================
// Firebase Configuration
// =======================
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "chatify.firebaseapp.com",
  projectId: "chatify",
  storageBucket: "chatify.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// =======================
// DOM Elements
// =======================
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

const messageInput = document.getElementById("messageInput");
const sendBtn = document.getElementById("sendBtn");
const messagesDiv = document.getElementById("messages");

// =======================
// Authentication
// =======================
signupBtn.addEventListener("click", async () => {
  await createUserWithEmailAndPassword(
    auth,
    emailInput.value,
    passwordInput.value
  );
});

loginBtn.addEventListener("click", async () => {
  await signInWithEmailAndPassword(
    auth,
    emailInput.value,
    passwordInput.value
  );
});

// =======================
// Auth State Listener
// =======================
onAuthStateChanged(auth, (user) => {
  if (user) {
    loadMessages();
  }
});

// =======================
// Send Message
// =======================
sendBtn.addEventListener("click", async () => {
  if (!messageInput.value) return;

  await addDoc(collection(db, "messages"), {
    text: messageInput.value,
    senderId: auth.currentUser.uid,
    senderEmail: auth.currentUser.email,
    timestamp: serverTimestamp()
  });

  messageInput.value = "";
});

// =======================
// Receive Messages (Realtime)
// =======================
function loadMessages() {
  const q = query(
    collection(db, "messages"),
    orderBy("timestamp")
  );

  onSnapshot(q, (snapshot) => {
    messagesDiv.innerHTML = "";
    snapshot.forEach((doc) => {
      const msg = doc.data();
      const div = document.createElement("div");
      div.innerHTML = `<b>${msg.senderEmail}:</b> ${msg.text}`;
      messagesDiv.appendChild(div);
    });
  });
}
