 
 


import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";


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


// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Authentication
const auth = getAuth(app);


// Initialize Realtime Database
const database = getDatabase(app);


// Get the registration form
const registerForm = document.getElementById("registerForm");


// When the Register button is clicked
registerForm.addEventListener("submit", (event) => {

    // Stop the page from refreshing
    event.preventDefault();


    // Get input values
    const username = document.querySelector(".username").value.trim();
    const email = document.querySelector(".email").value.trim();
    const password = document.querySelector(".password").value;


    // Check if fields are empty
    if (!username || !email || !password) {

        alert("Please fill all the fields");

        return;
    }


    // Create Firebase Authentication account
    createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {

            // Get the newly created user
            const user = userCredential.user;


            // Save username and email in Realtime Database
            return set(
                ref(database, "users/" + user.uid),
                {
                    username: username,
                    email: email
                }
            );

        })

        .then(() => {

            // Registration successful
            alert("Registration Successful");

            // Go to login page
            window.location.href = "login.html";

        })

        .catch((error) => {

            // Show Firebase error
            console.log(error.code);
            console.log(error.message);

            alert(error.message);

        });

});
