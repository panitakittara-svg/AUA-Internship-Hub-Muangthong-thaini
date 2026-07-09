import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");

loginBtn.addEventListener("click", () => {

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if(email === "" || password === ""){
        alert("Please enter email and password");
        return;
    }

    signInWithEmailAndPassword(auth,email,password)

    .then(() => {

        alert("Login Successful");

        window.location.href = "dashboard.html";

    })

    .catch((error)=>{

        alert(error.message);

    });

});

registerBtn.addEventListener("click",()=>{

    const email=document.getElementById("email").value.trim();

    const password=document.getElementById("password").value.trim();

    if(email===""||password===""){

        alert("Please enter email and password");

        return;

    }

    createUserWithEmailAndPassword(auth,email,password)

    .then(()=>{

        alert("Register Successful");

    })

    .catch((error)=>{

        alert(error.message);

    });

});
