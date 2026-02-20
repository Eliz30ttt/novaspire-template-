// Confirm file is loading
console.log("Login JS Loaded");

// Import Firebase Auth
import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } 
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Get form and error container
const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

if (!form) {
  console.error("Login form not found.");
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  errorMessage.textContent = "";

  if (!email || !password) {
    errorMessage.textContent = "Please enter email and password.";
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log("Login successful");
    window.location.href = "dashboard.html";
  } catch (error) {
    console.error("Login Error:", error);

    switch (error.code) {
      case "auth/user-not-found":
        errorMessage.textContent = "User not found.";
        break;
      case "auth/wrong-password":
        errorMessage.textContent = "Incorrect password.";
        break;
      case "auth/invalid-email":
        errorMessage.textContent = "Invalid email format.";
        break;
      case "auth/invalid-api-key":
        errorMessage.textContent = "Firebase API key is invalid.";
        break;
      case "auth/domain-not-authorized":
        errorMessage.textContent = "Domain not authorized in Firebase.";
        break;
      default:
        errorMessage.textContent = error.message;
    }
  }
});
