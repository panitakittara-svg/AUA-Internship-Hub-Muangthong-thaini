const form = document.getElementById("loginForm");

const roleCards = document.querySelectorAll(".role-card");

roleCards.forEach(card => {

    card.addEventListener("click", () => {

        card.querySelector("input").checked = true;

    });

});

form.addEventListener("submit", function(e){

    e.preventDefault();

    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value.trim();

    const error = document.getElementById("errorMessage");

    error.textContent = "";

    if(email === "" || password === ""){

        error.textContent = "Please enter your email and password.";

        return;

    }

    // ไปหน้า Dashboard หน้าเดียว
    window.location.href = "dashboard.html";

});