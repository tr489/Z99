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

    // Klick-Event
    dummy.addEventListener('click', () => {
        if (!gameActive) return;
        punch();
    });

    function punch() {
        // Sound abspielen (Klonen für schnelle Klicks)
        try {
            const soundClone = punchSound.cloneNode();
            soundClone.volume = 0.5;
            soundClone.play();
        } catch (e) {
            console.log("Sound konnte nicht abgespielt werden (Browser blockiert oft Audio ohne Interaktion).");
        }

        // Zähler erhöhen
        strikes++;
        strikeText.innerText = strikes;

        // Leben abziehen
        const damage = Math.floor(Math.random() * 8) + 5;
        health -= damage;
        if (health < 0) health = 0;

        // Update
        updateDisplay();
        animateDummy();
        showHitText();

        // Check ob tot
        if (health <= 0) {
            gameOver();
        }
    }

    function updateDisplay() {
        healthText.innerText = health;
        healthBar.style.width = health + "%";

        if (health < 30) {
            healthBar.style.backgroundColor = "#ff5555";
        } else if (health < 60) {
            healthBar.style.backgroundColor = "#ffb86c";
        } else {
            healthBar.style.backgroundColor = "#50fa7b";
        }
    }

    function animateDummy() {
        dummy.classList.add('punched');
        setTimeout(() => {
            dummy.classList.remove('punched');
        }, 100);
    }

    function showHitText() {
        hitEffect.classList.remove('show-bam');
        void hitEffect.offsetWidth; // Reset Animation
        hitEffect.classList.add('show-bam');

        const words = ["VUR!", "BITIR!", "SIK!", "ÖLDÜR!", "HELAL!"];
        hitEffect.innerText = words[Math.floor(Math.random() * words.length)];
    }

    function gameOver() {
        gameActive = false;
        dummy.classList.add('dead');
        dummy.style.opacity = "0.8";
        
        messageArea.innerHTML = `🏆 K.O.! ${strikes} vuruşta indirdin!`;
        messageArea.classList.remove('hidden');
        restartBtn.classList.remove('hidden');
    }

    restartBtn.addEventListener('click', () => {
        health = 100;
        strikes = 0;
        gameActive = true;
        
        dummy.classList.remove('dead');
        dummy.style.opacity = "1";
        
        messageArea.classList.add('hidden');
        restartBtn.classList.add('hidden');
        
        updateDisplay();
    });
});
