let reactionTimes = [];
let round = 0;
let maxRounds = 5;
let startTime;

const startButton = document.getElementById("startButton");
const clickButton = document.getElementById("clickButton");
const infoText = document.getElementById("infoText");
const gameArea = document.getElementById("gameArea");
const resultArea = document.getElementById("resultArea");
const resultsList = document.getElementById("resultsList");
const avgTimeSpan = document.getElementById("avgTime");
const restartButton = document.getElementById("restartButton");

startButton.addEventListener("click", () => {
    startButton.classList.add("d-none");
    gameArea.classList.remove("d-none");
    startGame();
});

function startGame() {
    reactionTimes = [];
    round = 0;
    resultArea.classList.add("d-none");
    nextRound();
}

function nextRound() {
    round++;
    infoText.textContent = `Runde ${round}... Warte auf den Knopf.`;
    clickButton.classList.add("d-none");

    const delay = Math.random() * 3000 + 2000; // 2-5 Sekunden

    setTimeout(() => {
        infoText.textContent = "JETZT!";
        clickButton.classList.remove("d-none");
        startTime = performance.now();
    }, delay);
}

clickButton.addEventListener("click", () => {
    const reactionTime = Math.round(performance.now() - startTime);
    reactionTimes.push(reactionTime);
    clickButton.classList.add("d-none");

    if (round < maxRounds) {
        nextRound();
    } else {
        showResults();
    }
});

restartButton.addEventListener("click", () => {
    resultArea.classList.add("d-none");
    startButton.classList.remove("d-none");
});

function showResults() {
    gameArea.classList.add("d-none");
    resultArea.classList.remove("d-none");
    resultsList.innerHTML = "";

    reactionTimes.forEach((time, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `Runde ${index + 1}: ${time} ms`;
        resultsList.appendChild(li);
    });

    const avg = Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length);
    avgTimeSpan.textContent = avg;

    // Nach Spielende Highscore speichern
    saveScore(avg);
}

function saveScore(avg) {
    if (isNaN(avg) || avg <= 0) {
        console.error("Ungültiger Score, wird nicht gespeichert:", avg);
        return;
    }

    const playerName = prompt("Gib deinen Namen ein für den Highscore:", "Anonym");

    fetch("api/save_score.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: playerName || "Anonym",
            score: avg
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Serverfehler: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        loadHighscores();
    })
    .catch(error => {
        console.error("Fehler beim Speichern des Scores:", error);
    });
}

function loadHighscores() {
    fetch("api/get_scores.php")
        .then(response => {
            if (!response.ok) {
                throw new Error(`Serverfehler: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const highscoreArea = document.createElement("div");
            highscoreArea.className = "mt-4";
            highscoreArea.innerHTML = "<h4>🏆 Highscores (Top 10)</h4>";

            const list = document.createElement("ol");
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `${item.name}: ${item.score} ms (${item.timestamp})`;
                list.appendChild(li);
            });

            highscoreArea.appendChild(list);
            resultArea.appendChild(highscoreArea);
        })
        .catch(error => {
            console.error("Fehler beim Laden der Highscores:", error);
        });
}
