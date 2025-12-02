// Status Variablen
let score = 0;
let playerHealth = 100;
let enemyHealth = 100;
let isGameOver = false;

// DOM Elemente holen
const scoreEl = document.getElementById('score');
const pHealthBar = document.getElementById('player-health');
const eHealthBar = document.getElementById('enemy-health');
const pHealthText = document.getElementById('player-health-text');
const eHealthText = document.getElementById('enemy-health-text');
const messageLog = document.getElementById('message-log');
const hitBtn = document.getElementById('hit-btn');
const resetBtn = document.getElementById('reset-btn');
const gameContainer = document.querySelector('.game-container');

// Sound Effekt (optional, simpler Web Audio API Piepton oder Platzhalter)
function playHitSound() {
    // Hier könnte man echte Sounds einfügen
}

// Hauptfunktion: Schlagen
hitBtn.addEventListener('click', () => {
    if (isGameOver) return;

    // 1. Schläge zählen
    score++;
    scoreEl.textContent = score;

    // 2. Schaden berechnen (Zufallswert zwischen 5 und 15)
    const damage = Math.floor(Math.random() * 10) + 5;
    enemyHealth -= damage;

    // 3. Eigene Energie verlieren (Anstrengung/Gegenschlag: 1-5)
    const recoil = Math.floor(Math.random() * 5) + 1;
    playerHealth -= recoil;

    // Werte begrenzen (nicht unter 0)
    if (enemyHealth < 0) enemyHealth = 0;
    if (playerHealth < 0) playerHealth = 0;

    // 4. Update UI
    updateUI();
    
    // Animation auslösen
    gameContainer.classList.add('shake');
    setTimeout(() => {
        gameContainer.classList.remove('shake');
    }, 500);

    messageLog.textContent = `BAM! -${damage} Schaden beim Gegner!`;

    // 5. Spielende prüfen
    checkGameOver();
});

// Neustart Funktion
resetBtn.addEventListener('click', () => {
    score = 0;
    playerHealth = 100;
    enemyHealth = 100;
    isGameOver = false;
    
    hitBtn.disabled = false;
    hitBtn.classList.remove('hidden');
    resetBtn.classList.add('hidden');
    messageLog.textContent = "Neues Spiel gestartet!";
    
    updateUI();
});

function updateUI() {
    // Balken Breite anpassen
    pHealthBar.style.width = playerHealth + '%';
    eHealthBar.style.width = enemyHealth + '%';
    
    // Text anpassen
    pHealthText.textContent = playerHealth + ' / 100';
    eHealthText.textContent = enemyHealth + ' / 100';

    // Farben ändern bei niedriger HP
    pHealthBar.style.backgroundColor = playerHealth < 30 ? '#ff9800' : '#4caf50';
}

function checkGameOver() {
    if (enemyHealth <= 0) {
        endGame(true);
    } else if (playerHealth <= 0) {
        endGame(false);
    }
}

function endGame(won) {
    isGameOver = true;
    hitBtn.disabled = true;
    hitBtn.classList.add('hidden');
    resetBtn.classList.remove('hidden');

    if (won) {
        messageLog.textContent = "🏆 SIEG! Du hast den Gegner besiegt!";
        messageLog.style.color = "#4caf50";
    } else {
        messageLog.textContent = "💀 NIEDERLAGE! Du bist erschöpft.";
        messageLog.style.color = "#f44336";
    }
}
