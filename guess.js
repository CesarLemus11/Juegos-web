// ===== JUEGO ADIVINA EL NÚMERO =====
let secretNumber;
let attemptsCount = 0;
let bestScore = localStorage.getItem('bestScore') || '-';

function initGuessGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attemptsCount = 0;
    updateGuessStats();
    document.getElementById('guess-input').value = '';
    showGuessMessage('Ingresa un número entre 1 y 100', 'info');
}

function makeGuess() {
    const input = document.getElementById('guess-input');
    const guess = parseInt(input.value);

    if (!guess || guess < 1 || guess > 100) {
        showGuessMessage('Por favor ingresa un número válido entre 1 y 100', 'warning');
        return;
    }

    attemptsCount++;
    updateGuessStats();

    if (guess === secretNumber) {
        showGuessMessage(`¡CORRECTO! El número era ${secretNumber}. Lo adivinaste en ${attemptsCount} intentos`, 'success');
        updateBestScore();
    } else if (guess < secretNumber) {
        showGuessMessage('📈 El número es MÁS ALTO. Intenta de nuevo', 'warning');
    } else {
        showGuessMessage('📉 El número es MÁS BAJO. Intenta de nuevo', 'warning');
    }

    input.value = '';
    input.focus();
}

function updateGuessStats() {
    document.getElementById('attempts').textContent = attemptsCount;
    document.getElementById('best-score').textContent = bestScore;
}

function updateBestScore() {
    if (bestScore === '-' || attemptsCount < parseInt(bestScore)) {
        bestScore = attemptsCount;
        localStorage.setItem('bestScore', bestScore);
        updateGuessStats();
    }
}

function showGuessMessage(text, type) {
    const message = document.getElementById('guess-message');
    message.textContent = text;
    message.className = `message ${type}`;
}

function resetGuessGame() {
    initGuessGame();
}

// Permitir Enter para adivinar
document.addEventListener('DOMContentLoaded', () => {
    const guessInput = document.getElementById('guess-input');
    if (guessInput) {
        guessInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });
    }
});