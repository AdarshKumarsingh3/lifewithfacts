
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";


// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDaYTA8b0ZJ4zztyrzVaKqb6GdlDZJ57mw",
    authDomain: "life-with-facts.firebaseapp.com",
    projectId: "life-with-facts",
    storageBucket: "life-with-facts.firebasestorage.app",
    messagingSenderId: "53105789075",
    appId: "1:53105789075:web:63e5fc6df57a7d558e2566",
    measurementId: "G-NBD46F8KSJ"
};


const app= initializeApp(firebaseConfig);
const auth=getAuth(app);


// Get login form
const loginForm = document.getElementById("loginForm");


// When user submits the login form
loginForm.addEventListener("submit", (event) => {

    // Prevent page refresh
    event.preventDefault();


    // Get input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;


    // Check fields
    if (!email || !password) {

        alert("Please enter email and password");

        return;
    }


    // Login user
    signInWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {

            // User successfully logged in
            const user = userCredential.user;

            console.log("Logged in user:", user);

            alert("Login Successful");

            // Go to home page
            window.location.href = "index.html";

        })

        .catch((error) => {

            console.log(error.code);
            console.log(error.message);

            alert(error.message);

        });

});

