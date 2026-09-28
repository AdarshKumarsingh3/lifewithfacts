/*// ===============================
// FIREBASE IMPORTS (Must be top-level)
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { 
    getDatabase, 
    ref, 
    get, 
    update 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// ===============================
// FIREBASE CONFIG & INIT
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyDaYTA8b0ZJ4zztyrzVaKqb6GdlDZJ57mw",
    authDomain: "life-with-facts.firebaseapp.com",
    projectId: "life-with-facts",
    storageBucket: "life-with-facts.firebasestorage.app",
    messagingSenderId: "53105789075",
    appId: "1:53105789075:web:63e5fc6df57a7d558e2566",
    measurementId: "G-NBD46F8KSJ"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ===============================
// DOM ELEMENTS
// ===============================
const rq = document.getElementById("nextQuestionBtn");
const ra = document.getElementById("answerBox");
const hii = document.querySelector(".hii");
const loginBtn = document.getElementById("loginBtn");

const profileName = document.getElementById("profileName");
const profilePopup = document.getElementById("profilePopup");
const closeProfile = document.getElementById("closeProfile");
const popupUsername = document.getElementById("popupUsername");
const popupUID = document.getElementById("popupUID");
const bio = document.getElementById("bio");
const saveBio = document.getElementById("saveBio");

// ===============================
// UTILITY: DECODE HTML ENTITIES
// ===============================
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// ===============================
// FACTS LOGIC
// ===============================
let currentAnswer = "";
let isFetching = false;

async function fetchFact() {
    if (isFetching) return;
    isFetching = true;

    rq.textContent = "Loading question...";
    ra.textContent = "Get answer";
    ra.classList.remove("open");

    try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&category=17");
        if (!response.ok) throw new Error("Failed to fetch question");

        const data = await response.json();
        if (!data.results || data.results.length === 0) throw new Error("No question received");

        const question = decodeHTML(data.results[0].question);
        currentAnswer = decodeHTML(data.results[0].correct_answer);

        rq.textContent = question;
    } catch (error) {
        console.error("Fact error:", error);
        rq.textContent = "Unable to load a question right now.";
        currentAnswer = "Please try again.";
    } finally {
        isFetching = false;
    }
}

// Toggle showing / hiding answer
ra.addEventListener("click", () => {
    if (ra.classList.contains("open")) {
        ra.textContent = "Get answer";
        ra.classList.remove("open");
    } else {
        ra.textContent = currentAnswer || "Click Random Question first.";
        ra.classList.add("open");
    }
});

// Fetch a new question on button click
rq.addEventListener("click", fetchFact);

// Fetch initial question on page load
fetchFact();

// ===============================
// NAVIGATION & AUTH SYNC
// ===============================
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        let username = user.displayName || "";
        let userBio = "";

        try {
            const snapshot = await get(ref(database, "users/" + uid));

            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.username) username = userData.username;
                if (userData.bio) userBio = userData.bio;
            }
        } catch (error) {
            console.warn("Database fetch warning:", error);
        }

        // Complete fallback hierarchy: DB -> Auth Profile -> Email Prefix -> "User"
        if (!username && user.email) {
            username = user.email.split("@")[0];
        }
        if (!username) {
            username = "User";
        }

        // Apply to UI
        profileName.textContent = "👨‍💻 " + username;
        hii.textContent = "Hii!! 👋 Welcome " + username;
        popupUsername.textContent = username;
        popupUID.textContent = uid;
        bio.value = userBio;

        // Configure logout
        loginBtn.textContent = "LOG OUT";
        loginBtn.onclick = async () => {
            try {
                await signOut(auth);
            } catch (err) {
                console.error("Sign out error:", err);
            }
        };

    } else {
        // Reset to Guest state
        profileName.textContent = "👨‍💻 Guest";
        hii.textContent = "Hii!! 👋 Welcome Guest";
        popupUsername.textContent = "Guest";
        popupUID.textContent = "";
        bio.value = "";

        loginBtn.textContent = "LOG IN";
        loginBtn.onclick = () => {
            window.location.href = "login.html";
        };
    }
});

// ===============================
// PROFILE POPUP INTERACTIONS
// ===============================
profileName.addEventListener("click", (event) => {
    event.stopPropagation();
    profilePopup.classList.toggle("show");
});

closeProfile.addEventListener("click", () => {
    profilePopup.classList.remove("show");
});

// Stop clicks inside popup from dismissing it
profilePopup.addEventListener("click", (event) => {
    event.stopPropagation();
});

// Close popup on click outside
document.addEventListener("click", (event) => {
    if (
        profilePopup.classList.contains("show") &&
        !profilePopup.contains(event.target) &&
        !profileName.contains(event.target)
    ) {
        profilePopup.classList.remove("show");
    }
});

// ===============================
// BIO UPDATE
// ===============================
saveBio.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("Please login first.");
        return;
    }

    saveBio.disabled = true;
    saveBio.textContent = "Saving...";

    try {
        await update(ref(database, "users/" + user.uid), {
            bio: bio.value.trim()
        });
        alert("Bio saved!");
    } catch (error) {
        console.error("Bio error:", error);
        alert("Could not save bio.");
    } finally {
        saveBio.disabled = false;
        saveBio.textContent = "Save Bio";
    }
});*/
// ===============================
// FIREBASE IMPORTS
// ===============================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signOut 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { 
    getDatabase, 
    ref, 
    get, 
    update 
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// ===============================
// FIREBASE CONFIG & INIT
// ===============================
const firebaseConfig = {
    apiKey: "AIzaSyDaYTA8b0ZJ4zztyrzVaKqb6GdlDZJ57mw",
    authDomain: "life-with-facts.firebaseapp.com",
    projectId: "life-with-facts",
    storageBucket: "life-with-facts.firebasestorage.app",
    messagingSenderId: "53105789075",
    appId: "1:53105789075:web:63e5fc6df57a7d558e2566",
    measurementId: "G-NBD46F8KSJ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// ===============================
// DOM ELEMENTS
// ===============================
const rq = document.getElementById("nextQuestionBtn");
const ra = document.getElementById("answerBox");
const hii = document.querySelector(".hii");
const loginBtn = document.getElementById("loginBtn");

const profileName = document.getElementById("profileName");
const profilePopup = document.getElementById("profilePopup");
const closeProfile = document.getElementById("closeProfile");
const popupUsername = document.getElementById("popupUsername");
const popupUID = document.getElementById("popupUID");
const bio = document.getElementById("bio");
const saveBio = document.getElementById("saveBio");

// ===============================
// UTILITY: DECODE HTML ENTITIES
// ===============================
function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

// ===============================
// FACTS LOGIC
// ===============================
let currentAnswer = "";
let isFetching = false;

async function fetchFact() {
    if (isFetching) return;
    isFetching = true;

    rq.textContent = "Loading question...";
    ra.textContent = "Get answer";
    ra.classList.remove("open");

    try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&category=17");
        if (!response.ok) throw new Error("Failed to fetch question");

        const data = await response.json();
        if (!data.results || data.results.length === 0) throw new Error("No question received");

        const question = decodeHTML(data.results[0].question);
        currentAnswer = decodeHTML(data.results[0].correct_answer);

        rq.textContent = question;
    } catch (error) {
        console.error("Fact error:", error);
        rq.textContent = "Unable to load a question right now.";
        currentAnswer = "Please try again.";
    } finally {
        isFetching = false;
    }
}

// Toggle showing / hiding answer
ra.addEventListener("click", () => {
    if (ra.classList.contains("open")) {
        ra.textContent = "Get answer";
        ra.classList.remove("open");
    } else {
        ra.textContent = currentAnswer || "Click Random Question first.";
        ra.classList.add("open");
    }
});

// Fetch a new question on button click
rq.addEventListener("click", fetchFact);

// Fetch initial question on page load
fetchFact();

// ===============================
// NAVIGATION & AUTH SYNC
// ===============================
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        let username = user.displayName || "";
        let userBio = "";

        try {
            const snapshot = await get(ref(database, "users/" + uid));

            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData.username) username = userData.username;
                if (userData.bio) userBio = userData.bio;
            }
        } catch (error) {
            console.warn("Database fetch warning:", error);
        }

        if (!username && user.email) {
            username = user.email.split("@")[0];
        }
        if (!username) {
            username = "User";
        }

        // Apply to UI
        profileName.textContent = "👨‍💻 " + username;
        hii.textContent = "Hii!! 👋 Welcome " + username;
        popupUsername.textContent = username;
        popupUID.textContent = uid;
        bio.value = userBio;

        loginBtn.textContent = "LOG OUT";
        loginBtn.onclick = async () => {
            try {
                await signOut(auth);
            } catch (err) {
                console.error("Sign out error:", err);
            }
        };

    } else {
        profileName.textContent = "👨‍💻 Guest";
        hii.textContent = "Hii!! 👋 Welcome Guest";
        popupUsername.textContent = "Guest";
        popupUID.textContent = "";
        bio.value = "";

        loginBtn.textContent = "LOG IN";
        loginBtn.onclick = () => {
            window.location.href = "login.html";
        };
    }
});

// ===============================
// PROFILE POPUP INTERACTIONS
// ===============================
profileName.addEventListener("click", (event) => {
    event.stopPropagation();
    profilePopup.classList.toggle("show");
});

closeProfile.addEventListener("click", () => {
    profilePopup.classList.remove("show");
});

profilePopup.addEventListener("click", (event) => {
    event.stopPropagation();
});

document.addEventListener("click", (event) => {
    if (
        profilePopup.classList.contains("show") &&
        !profilePopup.contains(event.target) &&
        !profileName.contains(event.target)
    ) {
        profilePopup.classList.remove("show");
    }
});

// ===============================
// BIO UPDATE
// ===============================
saveBio.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) {
        alert("Please login first.");
        return;
    }

    saveBio.disabled = true;
    saveBio.textContent = "Saving...";

    try {
        await update(ref(database, "users/" + user.uid), {
            bio: bio.value.trim()
        });
        alert("Bio saved!");
    } catch (error) {
        console.error("Bio error:", error);
        alert("Could not save bio.");
    } finally {
        saveBio.disabled = false;
        saveBio.textContent = "Save Bio";
    }
});