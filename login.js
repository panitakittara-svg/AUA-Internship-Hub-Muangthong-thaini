import { auth } from "./firebase.js";

import {
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    errorMessage.textContent = "";

    try {

        await signInWithEmailAndPassword(auth, email, password);

        window.location.href = "dashboard.html";

    } catch (error) {

        errorMessage.textContent = error.message;

    }

});

const forgotPassword = document.getElementById("forgotPassword");

if (forgotPassword) {

    forgotPassword.addEventListener("click", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        if (!email) {
            alert("Please enter your email first.");
            return;
        }

        try {

            await sendPasswordResetEmail(auth, email);

            alert("Password reset email has been sent.");

        } catch (error) {

            alert(error.message);

        }

    });

}