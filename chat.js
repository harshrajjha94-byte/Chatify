// ==============================
// CHATIFY - chat.js
// (Firebase baad me add hoga)
// ==============================

// DOM Elements
const messagesDiv = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");

// TEMP user (baad me Firebase user hoga)
const currentUser = {
  id: "user_123",
  name: "You"
};

// ==============================
// Send Message
// ==============================
function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const message = {
    text,
    senderId: currentUser.id,
    senderName: currentUser.name,
    timestamp: new Date().toLocaleTimeString()
  };

  renderMessage(message, true);
  messageInput.value = "";
}

// ==============================
// Render Message
// ==============================
function renderMessage(message, isMine) {
  const div = document.createElement("div");
  div.classList.add("message");

  if (isMine) {
    div.classList.add("my-message");
  }

  div.innerHTML = `
    <div>${message.text}</div>
    <small style="opacity:0.6">${message.timestamp}</small>
  `;

  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// ==============================
// Enter key support
// ==============================
messageInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// ==============================
// Logout
// ==============================
function logout() {
  // Firebase signOut() baad me
  window.location.href = "index.html";
}

// ==============================
// FUTURE FIREBASE NOTES
// ==============================
/*
🔥 Firebase add karte time:
- sendMessage() me Firestore addDoc()
- onSnapshot() se messages load
- currentUser = auth.currentUser
*/
