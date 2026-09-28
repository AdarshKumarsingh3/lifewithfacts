let result = [];
let isFetching = true;

async function getPlanet() {
    try {
        const response = await fetch("https://science.nasa.gov/wp-json/wp/v2/apod-basic");
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        result = await response.json();
    } catch (error) {
        console.error("NASA API fetch error:", error);
    } finally {
        isFetching = false;
    }
}

getPlanet();

const cardsConfig = [
    {
        card: document.getElementById("fcard1"),
        text: document.getElementById("factText1"),
        image: document.getElementById("factImage") 
    },
    {
        card: document.getElementById("fcard2"),
        text: document.getElementById("factText2"),
        image: document.getElementById("factImage2")
    },
    {
        card: document.getElementById("fcard3"),
        text: document.getElementById("factText3"),
        image: document.getElementById("factImage3")
    },
    {
        card: document.getElementById("fcard4"),
        text: document.getElementById("factText4"),
        image: document.getElementById("factImage4")
    }
];

cardsConfig.forEach(({ card, text, image }) => {
    if (!card) return;

    let isOpen = false;

    card.addEventListener("click", function () {
        if (isFetching) {
            if (text) text.textContent = "Loading science facts... please wait.";
            return;
        }

        if (!result || result.length === 0) {
            if (text) text.textContent = "Unable to load facts. Please refresh.";
            return;
        }

        if (!isOpen) {
            const random = Math.floor(Math.random() * result.length);
            const factItem = result[random];

            // 1. Set fact explanation
            if (text) {
                const cleanedText = (factItem.explanation || factItem.description || "No description provided.")
                    .replace(/<[^>]*>/g, "")
                    .trim();
                text.textContent = cleanedText;
            }

            // 2. Load APOD image cleanly
            const imgUrl = factItem.hdurl || factItem.url || "";
            if (image && imgUrl) {
                image.src = imgUrl;
                image.style.display = "block";
            }

            card.classList.add("expanded");
            isOpen = true;
        } else {
            // Revert to initial state
            if (text) {
                text.textContent = "GET fact";
            }
            if (image) {
                image.src = "";
                image.style.display = "none";
            }

            card.classList.remove("expanded");
            isOpen = false;
        }
    });
});