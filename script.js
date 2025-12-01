document.addEventListener('DOMContentLoaded', () => {
    // 1. Alle Elemente aus dem HTML holen
    const dummy = document.getElementById('dummy-hitbox');
    const healthBar = document.getElementById('health-bar');
    const healthText = document.getElementById('health-count');
    const strikeText = document.getElementById('strike-count');
    const hitEffect = document.getElementById('hit-effect');
    const messageArea = document.getElementById('message-area');
    const restartBtn = document.getElementById('restart-btn');

    // 2. Sound laden (Online-Link)
    const punchSound = new Audio('https://www.myinstants.com/media/sounds/punch-gaming.mp3'); 

    // 3. Spiel-Werte
    let health = 100;
    let strikes = 0;
    let gameActive = true;

    // 4. Klick-Event: Was passiert beim Schlag?
    dummy.addEventListener('click', () => {
        // Wenn Spiel vorbei ist, Schlag ignorieren
        if (!gameActive) return; 

        punch();
    });

    // --- Die Schlag-Funktion ---
    function punch() {
        // A) Sound abspielen (Klonen für schnelles Klicken)
        const soundClone = punchSound.cloneNode();
        soundClone.volume = 0.5; 
        soundClone.play();

        // B) Zähler erhöhen
        strikes++;
        strikeText.innerText = strikes;

        // C) Leben abziehen (Zufall zwischen 5 und 12)
        const damage = Math.floor(Math.random() * 8) + 5;
        health -= damage;
        if (health < 0) health = 0;

        // D) Alles aktualisieren
        updateDisplay();
        animateDummy();
        showHitText();

        // E) Prüfen ob tot
        if (health <= 0) {
            gameOver();
        }
    }

    // --- Hilfs-Funktionen ---

    function updateDisplay() {
        healthText.innerText = health;
        healthBar.style.width = health + "%";

        // Farbe ändern: Grün -> Orange -> Rot
        if (health < 30) {
            healthBar.style.backgroundColor = "#ff5555";
        } else if (health < 60) {
            healthBar.style.backgroundColor = "#ffb86c";
        } else {
            healthBar.style.backgroundColor = "#50fa7b";
        }
    }

    function animateDummy() {
        // Wackeln lassen
        dummy.classList.add('punched');
        setTimeout(() => {
            dummy.classList.remove('punched');
        }, 100);
    }

    function showHitText() {
        // Text-Animation neu starten
        hitEffect.classList.remove('show-bam');
        void hitEffect.offsetWidth; // Trick für Neustart
        hitEffect.classList.add('show-bam');

        // Deine türkischen Sprüche!
        const words = ["VUR!", "BITIR!", "SIK!", "ÖLDÜR!", "HELAL!"];
        hitEffect.innerText = words[Math.floor(Math.random() * words.length)];
    }

    function gameOver() {
        gameActive = false;
        
        // Fügt die Klasse für die "toten Augen" hinzu (X X)
        dummy.classList.add('dead'); 
        dummy.style.opacity = "0.8";
        
        // Nachricht & Button zeigen
        messageArea.innerHTML = `🏆 K.O.! ${strikes} vuruşta indirdin!`;
        messageArea.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
    }

    // --- Neustart ---
    restartBtn.addEventListener('click', () => {
        health = 100;
        strikes = 0;
        gameActive = true;
        
        dummy.classList.remove('dead'); // Augen wieder normal
        dummy.style.opacity = "1";
        
        messageArea.classList.add('hidden');
        restartBtn.classList.add('hidden');
        
        updateDisplay();
    });
});
