// --- Variablen ---
let score = 0;
let playerHp = 100;
let enemyHp = 100;
let isGameOver = false;

// --- Elemente holen ---
const scoreDisplay = document.getElementById('score');
const playerBar = document.getElementById('player-bar');
const enemyBar = document.getElementById('enemy-bar');
const enemyHpText = document.getElementById('enemy-hp-text');
const msgLog = document.getElementById('msg-log');
const keliFace = document.getElementById('keli-face');
const hitBtn = document.getElementById('hit-btn');
const resetBtn = document.getElementById('reset-btn');

// --- Events (Klick auf Button oder Gesicht) ---
hitBtn.addEventListener('click', fight);
keliFace.addEventListener('click', fight);
resetBtn.addEventListener('click', resetGame);

// --- Kampf Funktion ---
function fight() {
    if (isGameOver) return;

    // 1. Score hochzählen
    score++;
    scoreDisplay.innerText = score;

    // 2. Schaden berechnen (Zufall zwischen 8 und 15)
    const damage = Math.floor(Math.random() * 8) + 8;
    enemyHp -= damage;

    // 3. Eigene Ausdauer verlieren (klein bisschen)
    playerHp -= 2;

    // Werte begrenzen
    if (enemyHp < 0) enemyHp = 0;
    if (playerHp < 0) playerHp = 0;

    // 4. Update Bildschirm
    updateBars();
    animateFace();

    msgLog.innerText = `BAM! -${damage} Schaden!`;

    // 5. Spielende prüfen
    checkGameStatus();
}

// --- Status prüfen ---
function checkGameStatus() {
    if (enemyHp <= 0) {
        // GEWONNEN
        endGame(true);
    } else if (playerHp <= 0) {
        // VERLOREN
        endGame(false);
    }
}

// --- Ende ---
function endGame(won) {
    isGameOver = true;
    hitBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');

    if (won) {
        msgLog.innerText = "🏆 HELAL! Kelek yerde!";
        msgLog.style.color = "#2ed573";
        keliFace.innerText = "😵"; // K.O. Gesicht
        keliFace.classList.add('dead');
    } else {
        msgLog.innerText = "💀 Du bist zu müde...";
        msgLog.style.color = "#ff4757";
    }
}

// --- UI Updates ---
function updateBars() {
    enemyBar.style.width = enemyHp + "%";
    playerBar.style.width = playerHp + "%";
    enemyHpText.innerText = enemyHp + "%";
    
    // Farbe rot werden lassen bei wenig Leben
    if (enemyHp < 30) {
        enemyBar.style.backgroundColor = "#ff0000";
    }
}

// --- Gesichts-Animation ---
function animateFace() {
    keliFace.classList.add('hit');
    keliFace.innerText = "🤕"; // Aua Gesicht

    setTimeout(() => {
        keliFace.classList.remove('hit');
        // Nur zurück ändern, wenn noch nicht tot
        if (!isGameOver) {
            keliFace.innerText = "👨‍🦲";
        }
    }, 200);
}

// --- Neustart ---
function resetGame() {
    score = 0;
    playerHp = 100;
    enemyHp = 100;
    isGameOver = false;

    scoreDisplay.innerText = "0";
    msgLog.innerText = "Neuer Kampf!";
    msgLog.style.color = "#ccc";

    keliFace.innerText = "👨‍🦲";
    keliFace.classList.remove('dead');

    hitBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    
    // Balken zurücksetzen Farbe
    enemyBar.style.backgroundColor = "#ff4757";
    
    updateBars();
}
