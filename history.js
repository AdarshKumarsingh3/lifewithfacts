const fcard1 = document.getElementById("fcard1");
const fcard2 = document.getElementById("fcard2");
const fcard3 = document.getElementById("fcard3");
const fcard4 = document.getElementById("fcard4");
const fcard5 = document.getElementById("fcard5");
const fcard6 = document.getElementById("fcard6");

const factext1 = document.getElementById("factText1");
const factext2 = document.getElementById("factText2");
const factext3 = document.getElementById("factText3");
const factext4 = document.getElementById("factText4");
const factext5 = document.getElementById("factText5");
const factext6 = document.getElementById("factText6");


const topics = ['war', 'revolution', 'empire', 'battle', 'king', 'space', 'discovery', 'treaty'];


let facts1 = [];
let isReady = false;

async function getHistoricalEvents(topic) {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/historicalevents?text=' + encodeURIComponent(topic), {
            method: 'GET',
            headers: {
                'X-Api-Key': 'CmK9IOAylAqFooNF2WzqClFLWnGBMGcMb1wSzyjb',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (error) {
        console.error('Error fetching topic: ' + topic, error.message);
        return [];
    }
}

async function run() {
    let collectedFacts = [];
    let attempts = 0;
    const maxAttempts = 6; 

    while (collectedFacts.length < 6 && attempts < maxAttempts) {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const fetched = await getHistoricalEvents(randomTopic);

        if (Array.isArray(fetched) && fetched.length > 0) {
            collectedFacts = collectedFacts.concat(fetched);
        }
        attempts++;
    }

    // Save exactly the first 6 facts
    facts1 = collectedFacts.slice(0, 6);
    isReady = true;
    console.log("Successfully loaded 6 facts:", facts1);
}

run();

function displayFact(card, index) {
    if (!isReady) {
        card.innerHTML = `<p style="color: gold; font-weight: 600;">Loading facts... please wait</p>`;
        return;
    }

    if (facts1[index]) {
        const yr = facts1[index].year || "N/A";
        const day = facts1[index].day || "N/A";
        const event = facts1[index].event || "No description";

        card.innerHTML = `
            <div class="fact-detail">
                <span class="fact-badge">Year: ${yr} • Day: ${day}</span>
                <p class="fact-event">${event}</p>
            </div>
        `;
    }
}

// Card 1
fcard1.addEventListener("click", function() {
    displayFact(fcard1, 0);
});

// Card 2
fcard2.addEventListener("click", function() {
    displayFact(fcard2, 1);
});

// Card 3
fcard3.addEventListener("click", function() {
    displayFact(fcard3, 2);
});

// Card 4
fcard4.addEventListener("click", function() {
    displayFact(fcard4, 3);
});

// Card 5
fcard5.addEventListener("click", function() {
    displayFact(fcard5, 4);
});

// Card 6
fcard6.addEventListener("click", function() {
    displayFact(fcard6, 5);
});