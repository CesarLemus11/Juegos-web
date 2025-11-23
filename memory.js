// ===== JUEGO DE MEMORIA =====
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

const emojis = ['🎮', '🎯', '🎲', '🎨', '🎭', '🎪', '🎸', '🎺'];

function initMemoryGame() {
    memoryCards = [...emojis, ...emojis];
    memoryCards.sort(() => Math.random() - 0.5);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;

    updateMemoryStats();
    renderMemoryGrid();
}

function renderMemoryGrid() {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';

    memoryCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.emoji = emoji;
        card.addEventListener('click', flipCard);
        grid.appendChild(card);
    });
}

function flipCard(e) {
    if (!canFlip) return;

    const card = e.target;
    const index = card.dataset.index;

    if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
    }

    card.classList.add('flipped');
    card.textContent = card.dataset.emoji;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        updateMemoryStats();
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.emoji === card2.dataset.emoji) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        canFlip = true;
        updateMemoryStats();

        if (matchedPairs === 8) {
            setTimeout(() => {
                showMemoryMessage(`¡Felicidades! Completaste el juego en ${moves} movimientos`, 'success');
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            card1.textContent = '';
            card2.textContent = '';
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function updateMemoryStats() {
    document.getElementById('moves').textContent = moves;
    document.getElementById('pairs').textContent = `${matchedPairs}/8`;
}

function showMemoryMessage(text, type) {
    const message = document.getElementById('memory-message');
    message.textContent = text;
    message.className = `message ${type}`;
}

function resetMemoryGame() {
    initMemoryGame();
    showMemoryMessage('¡Voltea dos cartas para comenzar!', 'info');
}