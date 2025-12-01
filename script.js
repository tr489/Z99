document.addEventListener('DOMContentLoaded', () => {
    // Elemente holen
    const dummy = document.getElementById('dummy-hitbox');
    const healthBar = document.getElementById('health-bar');
    const healthText = document.getElementById('health-count');
    const strikeText = document.getElementById('strike-count');
    const hitEffect = document.getElementById('hit-effect');
    const messageArea = document.getElementById('message-area');
    const restartBtn = document.getElementById('restart-btn');

    // Sound laden
    const punchSound = new Audio('https://www.myinstants.com/media/sounds/punch-gaming.mp3'); 

    // Spiel-Variablen
    let health = 100;
    let strikes = 0;
    let gameActive = true;

    // Klick-Event (Der Schlag)
    dummy.addEventListener('click', () => {
        if (!gameActive) return; // Wenn Spiel vorbei, keine Schläge mehr
        punch();
    });

    function punch() {
        // --- 1. SOUND ABSPIELEN (Sofort!) ---
        const soundClone = punchSound.cloneNode();
        soundClone.volume = 0.5; // Lautstärke 50%
        soundClone.play();

        // --- 2. LOGIK ---
        // Zähler hochzählen
        strikes++;
        strikeText.innerText = strikes;

        // Leben abziehen (zufällig zwischen 5 und 12 Schaden)
        const damage = Math.floor(Math.random() * 8) + 5;
        health -= damage;

        // Nicht unter 0 gehen
        if (health < 0) health = 0;

        // --- 3. OPTIK ---
        updateDisplay();
        animateDummy();
        showHitText();

        // --- 4. PRÜFEN OB K.O. ---
        if (health <= 0) {
            gameOver();
        }
    }

    function updateDisplay() {
        healthText.innerText = health;
        healthBar.style.width = health + "%";

        // Farbe ändern je nach Schaden
        if (health < 30) {
            healthBar.style.backgroundColor = "#ff5555"; // Rot (Kritisch)
        } else if (health < 60) {
            healthBar.style.backgroundColor = "#ffb86c"; // Orange
        } else {
            healthBar.style.backgroundColor = "#50fa7b"; // Grün
        }
    }

    function animateDummy() {
        // Klasse für Wackeln hinzufügen
        dummy.classList.add('punched');
        // Nach 100ms wieder entfernen
        setTimeout(() => {
            dummy.classList.remove('punched');
        }, 100);
    }

    function showHitText() {
        // Text Animation neustarten
        hitEffect.classList.remove('show-bam');
        void hitEffect.offsetWidth; // Trigger Reflow (Trick um Animation neu zu starten)
        hitEffect.classList.add('show-bam');

        // Deine Sprüche!
        const words = ["VUR!", "BITIR!", "SIK!", "ÖLDÜR!", "HELAL OLSUN!"];
        hitEffect.innerText = words[Math.floor(Math.random() * words.length)];
    }

    function gameOver() {
        gameActive = false;
        
        // Dummy wird "tot" (Augen werden zu X X, falls du das CSS von vorhin drin hast)
        dummy.classList.add('dead'); 
        dummy.style.opacity = "0.7";
        
        // Nachricht anzeigen
        messageArea.innerHTML = `🏆 K.O.! Du hast ihn in ${strikes} Schlägen erledigt!`;
        messageArea.classList.remove('hidden');
        
        // Neustart Button zeigen
        restartBtn.classList.remove('hidden');
    }

    // Neustart Funktion
    restartBtn.addEventListener('click', () => {
        health = 100;
        strikes = 0;
        gameActive = true;
        
        // Toten-Status entfernen
        dummy.classList.remove('dead');
        dummy.style.opacity = "1";
        
        messageArea.classList.add('hidden');
        restartBtn.classList.add('hidden');
        
        updateDisplay();
    });
});
