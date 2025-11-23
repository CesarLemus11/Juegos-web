// ===== NAVEGACIÓN PRINCIPAL =====
let currentScreen = 'menu';

function startGame(game) {
    document.getElementById('menu-screen').classList.remove('active');
    
    if (game === 'memory') {
        document.getElementById('memory-screen').classList.add('active');
        initMemoryGame();
    } else if (game === 'guess') {
        document.getElementById('guess-screen').classList.add('active');
        initGuessGame();
    }
}

function backToMenu() {
    document.querySelectorAll('.game-screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('menu-screen').classList.add('active');
}