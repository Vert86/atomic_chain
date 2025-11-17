/**
 * Atomic Chain - Game Logic
 * Main game state management and core mechanics
 */

// ===== GAME STATE =====
class GameState {
    constructor() {
        this.currentLevel = 0;
        this.grid = [];
        this.operationSequence = [];
        this.currentStepIndex = 0;
        this.targetNumber = 0;
        this.gridSize = 3;
        this.constraints = [];
        this.powerUps = {
            peek: 0,
            rewind: 0,
            calculator: 0
        };
        this.lastState = null;
        this.totalStars = 0;
        this.calculatorMode = false;
        this.peekActive = false;
        this.peekTimeout = null;
    }

    loadLevel(levelIndex) {
        const level = LEVELS[levelIndex];
        if (!level) return false;

        this.currentLevel = levelIndex;
        this.grid = [...level.initialGrid];
        this.operationSequence = [...level.sequence];
        this.currentStepIndex = 0;
        this.targetNumber = level.target;
        this.gridSize = level.gridSize;
        this.constraints = [...level.constraints];
        this.lastState = null;
        this.calculatorMode = false;
        this.peekActive = false;

        return true;
    }

    saveState() {
        this.lastState = {
            grid: [...this.grid],
            currentStepIndex: this.currentStepIndex
        };
    }

    restoreState() {
        if (!this.lastState) return false;
        this.grid = [...this.lastState.grid];
        this.currentStepIndex = this.lastState.currentStepIndex;
        this.lastState = null;
        return true;
    }

    addPowerUp(type) {
        if (this.powerUps[type] !== undefined) {
            this.powerUps[type]++;
        }
    }

    usePowerUp(type) {
        if (this.powerUps[type] > 0) {
            this.powerUps[type]--;
            return true;
        }
        return false;
    }
}

const gameState = new GameState();

// ===== OPERATION LOGIC =====
function parseOperation(opStr) {
    // Convert display symbols to internal format
    opStr = opStr.replace('×', '*').replace('÷', '/');

    const match = opStr.match(/([+\-*/])(\d+)/);
    if (!match) return null;

    const operator = match[1];
    const value = parseInt(match[2]);

    return { operator, value };
}

function applyOperation(number, opStr) {
    const op = parseOperation(opStr);
    if (!op) return number;

    switch (op.operator) {
        case '+': return number + op.value;
        case '-': return number - op.value;
        case '*': return number * op.value;
        case '/': return Math.floor(number / op.value);
        default: return number;
    }
}

function isEven(n) {
    return n % 2 === 0;
}

function isOdd(n) {
    return n % 2 !== 0;
}

function checkConstraint(result, constraint) {
    if (constraint === "even") return isEven(result);
    if (constraint === "odd") return isOdd(result);
    return true;
}

// ===== CORE GAME LOGIC =====
function handleMove(selectedOperation) {
    // CHECK 1: Sequence Match
    const requiredOperation = gameState.operationSequence[gameState.currentStepIndex];
    if (selectedOperation !== requiredOperation) {
        showFailure("Wrong operation! Expected: " + requiredOperation);
        return false;
    }

    // Save state for rewind
    gameState.saveState();

    // CHECK 2: Parity/Constraint Match & Execution
    const constraint = gameState.constraints[gameState.currentStepIndex];
    const newGrid = [];
    let validMoves = 0;
    let invalidMoves = 0;

    for (let i = 0; i < gameState.grid.length; i++) {
        const oldValue = gameState.grid[i];
        const newValue = applyOperation(oldValue, selectedOperation);

        if (checkConstraint(newValue, constraint)) {
            newGrid[i] = newValue;
            validMoves++;
            highlightTile(i, true);
        } else {
            newGrid[i] = oldValue; // Don't modify this tile
            invalidMoves++;
            highlightTile(i, false);
        }
    }

    // Update grid
    gameState.grid = newGrid;
    gameState.currentStepIndex++;

    // Wait for animation, then check win/loss
    setTimeout(() => {
        updateUI();

        // CHECK 3: Win/Loss
        const allTarget = gameState.grid.every(n => n === gameState.targetNumber);

        if (allTarget) {
            showWin();
            return true;
        }

        if (gameState.currentStepIndex >= gameState.operationSequence.length) {
            showFailure("Sequence exhausted! Not all tiles reached the target.");
            return false;
        }

        AudioSystem.playSuccess();
    }, 600);

    return true;
}

// ===== UI RENDERING =====
function renderGrid() {
    const gridElement = document.getElementById('gameGrid');
    gridElement.innerHTML = '';

    // Set grid class based on size
    gridElement.className = `grid gap-2 md:gap-3 mb-6 grid-${gameState.gridSize}x${gameState.gridSize}`;

    gameState.grid.forEach((value, index) => {
        const tile = document.createElement('div');
        tile.className = 'tile bg-white rounded-xl flex items-center justify-center font-bold orbitron shadow-lg';

        // Responsive sizing
        const sizeClass = gameState.gridSize === 3 ? 'text-3xl md:text-4xl p-6 md:p-8' :
                         gameState.gridSize === 4 ? 'text-2xl md:text-3xl p-4 md:p-6' :
                         'text-xl md:text-2xl p-3 md:p-4';
        tile.className += ' ' + sizeClass;

        // Color based on value
        if (value === gameState.targetNumber) {
            tile.className += ' bg-gradient-to-br from-green-400 to-emerald-500 text-white';
        } else if (value < 0) {
            tile.className += ' bg-gradient-to-br from-red-400 to-rose-500 text-white';
        } else {
            tile.className += ' bg-gradient-to-br from-purple-400 to-pink-500 text-white';
        }

        tile.textContent = value;
        tile.dataset.index = index;

        // Calculator mode click handler
        if (gameState.calculatorMode) {
            tile.style.cursor = 'pointer';
            tile.addEventListener('click', () => showCalculatorPath(index));
        }

        gridElement.appendChild(tile);
    });
}

function updateUI() {
    // Update level and move display
    document.getElementById('levelDisplay').textContent = gameState.currentLevel + 1;
    document.getElementById('moveDisplay').textContent =
        `${gameState.currentStepIndex + 1}/${gameState.operationSequence.length}`;
    document.getElementById('targetDisplay').textContent = gameState.targetNumber;
    document.getElementById('starsDisplay').textContent = '⭐' + gameState.totalStars;

    // Update current operation
    const currentOp = gameState.operationSequence[gameState.currentStepIndex];
    if (currentOp) {
        document.getElementById('currentOperation').textContent = currentOp;

        // Show constraint if peek is active
        if (gameState.peekActive) {
            const constraint = gameState.constraints[gameState.currentStepIndex];
            document.getElementById('constraintDisplay').textContent =
                `MUST BE ${constraint.toUpperCase()}`;
        } else {
            document.getElementById('constraintDisplay').textContent = '';
        }
    } else {
        document.getElementById('currentOperation').textContent = '—';
        document.getElementById('constraintDisplay').textContent = '';
    }

    // Update power-up counts
    document.getElementById('peekCount').textContent = gameState.powerUps.peek;
    document.getElementById('rewindCount').textContent = gameState.powerUps.rewind;
    document.getElementById('calculatorCount').textContent = gameState.powerUps.calculator;

    // Enable/disable power-up buttons
    document.getElementById('peekBtn').disabled = gameState.powerUps.peek === 0;
    document.getElementById('rewindBtn').disabled = gameState.powerUps.rewind === 0 || !gameState.lastState;
    document.getElementById('calculatorBtn').disabled = gameState.powerUps.calculator === 0;

    // Render grid
    renderGrid();
}

function highlightTile(index, isValid) {
    const tiles = document.querySelectorAll('.tile');
    if (tiles[index]) {
        tiles[index].classList.add(isValid ? 'tile-valid' : 'tile-invalid');
        setTimeout(() => {
            tiles[index].classList.remove('tile-valid', 'tile-invalid');
        }, 600);
    }
}

// ===== MODALS =====
function showWin() {
    AudioSystem.playWin();

    const level = LEVELS[gameState.currentLevel];
    gameState.totalStars += 3;

    // Award power-up
    if (level.powerUpReward) {
        gameState.addPowerUp(level.powerUpReward);
        document.getElementById('powerUpReward').classList.remove('hidden');

        const rewardNames = {
            peek: '🔮 Parity Peek',
            rewind: '⏪ Rewind',
            calculator: '🧮 Sequence Calculator'
        };
        document.getElementById('powerUpRewardText').textContent = rewardNames[level.powerUpReward];
    } else {
        document.getElementById('powerUpReward').classList.add('hidden');
    }

    const modal = document.getElementById('winModal');
    const content = document.getElementById('winModalContent');
    modal.classList.remove('hidden');
    setTimeout(() => content.style.transform = 'scale(1)', 10);
}

function showFailure(reason) {
    AudioSystem.playFailure();

    document.getElementById('failureReason').textContent = reason;

    const modal = document.getElementById('loseModal');
    const content = document.getElementById('loseModalContent');
    modal.classList.remove('hidden');
    setTimeout(() => content.style.transform = 'scale(1)', 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    const content = modal.querySelector('div[id$="Content"]') || modal.querySelector('div');
    content.style.transform = 'scale(0)';
    setTimeout(() => modal.classList.add('hidden'), 300);
}

// ===== POWER-UPS =====
function usePeek() {
    if (!gameState.usePowerUp('peek')) return;

    AudioSystem.playClick();
    gameState.peekActive = true;

    // Clear existing timeout
    if (gameState.peekTimeout) clearTimeout(gameState.peekTimeout);

    // Show constraints for next 3 steps
    updateUI();

    // Show floating indicator
    showParityIndicator();

    // Auto-disable after 10 seconds
    gameState.peekTimeout = setTimeout(() => {
        gameState.peekActive = false;
        updateUI();
    }, 10000);
}

function useRewind() {
    if (!gameState.usePowerUp('rewind')) return;
    if (!gameState.restoreState()) return;

    AudioSystem.playClick();
    updateUI();
}

function useCalculator() {
    if (!gameState.usePowerUp('calculator')) return;

    AudioSystem.playClick();
    gameState.calculatorMode = true;

    const modal = document.getElementById('calculatorModal');
    modal.classList.remove('hidden');

    // Update grid to show clickable tiles
    renderGrid();
}

function showCalculatorPath(tileIndex) {
    const startValue = gameState.grid[tileIndex];
    let currentValue = startValue;
    const path = [currentValue];

    // Simulate remaining operations
    for (let i = gameState.currentStepIndex; i < gameState.operationSequence.length; i++) {
        const op = gameState.operationSequence[i];
        const constraint = gameState.constraints[i];
        const newValue = applyOperation(currentValue, op);

        if (checkConstraint(newValue, constraint)) {
            currentValue = newValue;
        } // else keep same value

        path.push(currentValue);
    }

    // Display path
    const resultDiv = document.getElementById('calculatorResult');
    resultDiv.innerHTML = `
        <div class="text-center">
            <div class="text-sm text-gray-600 mb-2">Transformation Path:</div>
            <div class="text-2xl font-bold orbitron text-purple-600">
                ${path.join(' → ')}
            </div>
            <div class="mt-4 text-sm ${path[path.length - 1] === gameState.targetNumber ? 'text-green-600' : 'text-red-600'}">
                ${path[path.length - 1] === gameState.targetNumber ? '✓ Reaches Target!' : '✗ Does Not Reach Target'}
            </div>
        </div>
    `;
}

function closeCalculator() {
    gameState.calculatorMode = false;
    document.getElementById('calculatorModal').classList.add('hidden');
    document.getElementById('calculatorResult').innerHTML = '<div class="text-gray-500 text-center">Select a tile to begin</div>';
    renderGrid();
}

function showParityIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'parity-indicator bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl text-2xl font-bold orbitron shadow-2xl';
    indicator.textContent = '🔮 PARITY PEEK ACTIVE (10s)';
    document.body.appendChild(indicator);

    setTimeout(() => {
        indicator.style.opacity = '0';
        indicator.style.transform = 'translate(-50%, -50%) scale(0)';
        setTimeout(() => indicator.remove(), 500);
    }, 2000);
}

// ===== EVENT HANDLERS =====
function initEventHandlers() {
    // Operation buttons
    document.querySelectorAll('.operation-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            AudioSystem.playClick();
            const operation = btn.dataset.op;
            handleMove(operation);
        });
    });

    // Power-up buttons
    document.getElementById('peekBtn').addEventListener('click', usePeek);
    document.getElementById('rewindBtn').addEventListener('click', useRewind);
    document.getElementById('calculatorBtn').addEventListener('click', useCalculator);
    document.getElementById('closeCalculatorBtn').addEventListener('click', closeCalculator);

    // Reset button
    document.getElementById('resetBtn').addEventListener('click', () => {
        AudioSystem.playClick();
        gameState.loadLevel(gameState.currentLevel);
        updateUI();
    });

    // Next level button
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        closeModal('winModal');
        if (gameState.currentLevel < LEVELS.length - 1) {
            gameState.loadLevel(gameState.currentLevel + 1);
        } else {
            // Game completed!
            alert('🎉 Congratulations! You completed all levels! Total Stars: ' + gameState.totalStars);
            gameState.loadLevel(0); // Reset to first level
            gameState.totalStars = 0;
            gameState.powerUps = { peek: 0, rewind: 0, calculator: 0 };
        }
        updateUI();
    });

    // Retry button
    document.getElementById('retryBtn').addEventListener('click', () => {
        closeModal('loseModal');
        gameState.loadLevel(gameState.currentLevel);
        updateUI();
    });

    // Prevent pull-to-refresh on mobile
    document.body.addEventListener('touchmove', (e) => {
        if (e.target.closest('.tile, .operation-btn, .power-up-btn')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ===== INITIALIZATION =====
function initGame() {
    gameState.loadLevel(0);
    updateUI();
    initEventHandlers();
}

// Start the game when page loads
window.addEventListener('load', initGame);
