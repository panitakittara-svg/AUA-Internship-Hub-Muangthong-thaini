import { auth, db } from "./firebase.js";

import {
createUserWithEmailAndPassword,
updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
doc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("registerForm");
const error = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const password = document.getElementById("password").value;
const confirmPassword = document.getElementById("confirmPassword").value;

error.textContent = "";

if (password !== confirmPassword) {
    error.textContent = "Passwords do not match.";
    return;
}

try {

    const userCredential =
        await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

    await updateProfile(userCredential.user,{
        displayName:name
    });

    await setDoc(doc(db,"ผู้ใช้",userCredential.user.uid),{

        ชื่อ:name,
        อีเมล:email,
        createdAt:serverTimestamp()

    });

    alert("Register Successful");

    window.location.href="dashboard.html";

}catch(err){

    error.textContent=err.message;

}

});