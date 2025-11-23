/**
 * Tutorial System for Atomic Chain
 * Guides first-time players through game mechanics with step-by-step challenges
 */

// ===== TUTORIAL STATE =====
class TutorialState {
    constructor() {
        this.active = false;
        this.currentStep = 0;
        this.completed = this.loadProgress();
    }

    saveProgress() {
        localStorage.setItem('atomicChainTutorialCompleted', 'true');
        this.completed = true;
    }

    loadProgress() {
        return localStorage.getItem('atomicChainTutorialCompleted') === 'true';
    }

    reset() {
        this.currentStep = 0;
        this.active = true;
    }

    nextStep() {
        this.currentStep++;
        if (this.currentStep >= TUTORIAL_STEPS.length) {
            this.complete();
            return false;
        }
        return true;
    }

    complete() {
        this.active = false;
        this.saveProgress();
        showTutorialComplete();
    }
}

const tutorialState = new TutorialState();

// ===== TUTORIAL STEPS =====
const TUTORIAL_STEPS = [
    {
        id: 0,
        title: "Welcome to Atomic Chain! ⚛️",
        message: "A strategic math puzzle where you choose your own path to victory!",
        instruction: "Click 'Next' to begin the tutorial.",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 1,
        title: "Step 1: The Goal",
        message: "Your goal is to make ALL tiles on the grid show the same target number.",
        instruction: "Look at the grid below and the 'Target' in the info panel. You need to transform all tiles to match that target.",
        level: null,
        showNext: true,
        highlightElements: ['gameGrid', 'targetDisplay']
    },
    {
        id: 2,
        title: "Step 2: Choose Your Operations",
        message: "You can choose ANY operation from the buttons below! No fixed sequence - you create your own strategy.",
        instruction: "Operations include +1, -1, ×2, ÷2, and more. You decide which ones to use and when!",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 3,
        title: "Step 3: Move Limit",
        message: "Each level has a move limit. You must reach the target before running out of moves!",
        instruction: "The 'Moves' counter shows how many moves you have left. Plan carefully!",
        level: null,
        showNext: true,
        highlightElements: ['moveDisplay']
    },
    {
        id: 4,
        title: "Step 4: Parity Constraints",
        message: "Here's the twist: Each move has a parity constraint (EVEN or ODD).",
        instruction: "A tile only changes if the RESULT is the required parity.\n\nExample: Parity is ODD, you use +1\n• Tile 2 → 3 (odd) ✓ Changes!\n• Tile 3 → 4 (even) ✗ Stays at 3",
        level: null,
        showNext: true,
        highlightElements: ['constraintDisplay']
    },
    {
        id: 5,
        title: "Challenge 1: Your First Strategy",
        message: "Make both tiles reach 2. You have 2 moves!",
        instruction: "Try +1 first. Watch which tiles change based on the parity constraint. Choose your operations wisely!",
        level: {
            gridSize: 2,
            target: 2,
            initialGrid: [1, 1],
            maxMoves: 2,
            constraintPattern: ["even", "odd"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: [],
        autoShowConstraint: false
    },
    {
        id: 6,
        title: "Great Job! 🎉",
        message: "You created your first strategy! Notice how the parity constraint changed after your first move.",
        instruction: "The constraint cycles through a pattern. Learn the pattern to plan ahead!",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 7,
        title: "Challenge 2: Strategic Thinking",
        message: "Make all tiles reach 4. You have 3 moves.",
        instruction: "This time you need to think strategically about WHICH operations to use. There are multiple solutions!",
        level: {
            gridSize: 2,
            target: 4,
            initialGrid: [2, 3],
            maxMoves: 3,
            constraintPattern: ["even", "odd", "even"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: [],
        autoShowConstraint: false
    },
    {
        id: 8,
        title: "Excellent! ⭐",
        message: "You're mastering the art of strategic planning!",
        instruction: "Different operations can lead to the same goal. The key is understanding how parity affects each tile.",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 9,
        title: "Challenge 3: Multiple Strategies",
        message: "Make all tiles reach 0. You have 4 moves.",
        instruction: "Think about how different operations interact with the parity constraints. Plan your strategy!",
        level: {
            gridSize: 2,
            target: 0,
            initialGrid: [1, 2, 3, 4],
            maxMoves: 4,
            constraintPattern: ["even", "odd", "even", "odd"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: [],
        autoShowConstraint: false
    },
    {
        id: 10,
        title: "Power-Ups: Your Strategic Tools",
        message: "You'll earn power-ups as you progress! They help you solve tougher puzzles:",
        instruction: "🔮 Parity Peek: Reveals exact constraint details\n⏪ Rewind: Undo your last move\n🧮 Calculator: Shows how each operation affects a tile",
        level: null,
        showNext: true,
        highlightElements: ['peekBtn', 'rewindBtn', 'calculatorBtn']
    },
    {
        id: 11,
        title: "Final Challenge: Put It All Together!",
        message: "Make all 9 tiles reach 0. You have 5 moves!",
        instruction: "This is your final test. Use strategic thinking to find an efficient solution!",
        level: {
            gridSize: 3,
            target: 0,
            initialGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            maxMoves: 5,
            constraintPattern: ["odd", "even", "odd", "even"],
            powerUpReward: "peek"
        },
        showNext: false,
        highlightElements: [],
        autoShowConstraint: false
    },
    {
        id: 12,
        title: "Tutorial Complete! 🎊",
        message: "Congratulations! You've mastered the strategic gameplay of Atomic Chain!",
        instruction: "You're now ready to tackle all 15 levels. Remember:\n• Choose operations strategically\n• Pay attention to parity patterns\n• Complete within the move limit!",
        level: null,
        showNext: true,
        highlightElements: [],
        isComplete: true
    }
];

// ===== TUTORIAL UI FUNCTIONS =====
function showTutorialPanel(step) {
    const panel = document.getElementById('tutorialPanel');
    const title = document.getElementById('tutorialTitle');
    const message = document.getElementById('tutorialMessage');
    const instruction = document.getElementById('tutorialInstruction');
    const nextBtn = document.getElementById('tutorialNextBtn');
    const skipBtn = document.getElementById('tutorialSkipBtn');
    const progress = document.getElementById('tutorialProgress');

    title.textContent = step.title;
    message.textContent = step.message;
    instruction.textContent = step.instruction;

    // Show/hide next button
    if (step.showNext) {
        nextBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.add('hidden');
    }

    // Update progress
    const currentStepNum = step.id + 1;
    const totalSteps = TUTORIAL_STEPS.length;
    progress.textContent = `Step ${currentStepNum}/${totalSteps}`;

    // Show skip button only if not on last step
    if (step.isComplete) {
        skipBtn.classList.add('hidden');
    } else {
        skipBtn.classList.remove('hidden');
    }

    // Highlight elements
    clearHighlights();
    step.highlightElements.forEach(elementId => {
        highlightElement(elementId);
    });

    panel.classList.remove('hidden');

    // If this step has a level, load it
    if (step.level) {
        loadTutorialLevel(step.level, step.autoShowConstraint);
    }
}

function hideTutorialPanel() {
    const panel = document.getElementById('tutorialPanel');
    panel.classList.add('hidden');
    clearHighlights();
}

function highlightElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('tutorial-highlight');
    }
}

function clearHighlights() {
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
    });
}

function loadTutorialLevel(levelData, autoShowConstraint = false) {
    // Create a temporary level object
    const tutorialLevel = {
        id: 999,
        name: "Tutorial",
        ...levelData
    };

    // Load into game state (using global gameState from game.js)
    gameState.grid = [...tutorialLevel.initialGrid];
    gameState.movesUsed = 0;
    gameState.maxMoves = tutorialLevel.maxMoves || 3;
    gameState.targetNumber = tutorialLevel.target;
    gameState.gridSize = tutorialLevel.gridSize;
    gameState.constraintPattern = tutorialLevel.constraintPattern || ["even", "odd"];
    gameState.lastState = null;
    gameState.calculatorMode = false;
    gameState.moveHistory = [];

    // Auto-show constraint if requested
    if (autoShowConstraint) {
        gameState.peekActive = true;
    } else {
        gameState.peekActive = false;
    }

    // Don't show level number during tutorial
    gameState.currentLevel = -1;

    updateUI();
}

function showTutorialComplete() {
    const modal = document.getElementById('tutorialCompleteModal');
    const content = document.getElementById('tutorialCompleteContent');
    modal.classList.remove('hidden');
    setTimeout(() => content.style.transform = 'scale(1)', 10);
}

function closeTutorialComplete() {
    const modal = document.getElementById('tutorialCompleteModal');
    const content = document.getElementById('tutorialCompleteContent');
    content.style.transform = 'scale(0)';
    setTimeout(() => {
        modal.classList.add('hidden');
        // Start the actual game at level 1
        startMainGame();
    }, 300);
}

// ===== TUTORIAL FLOW CONTROL =====
function startTutorial() {
    tutorialState.reset();
    tutorialState.active = true;

    // Hide main menu
    const menu = document.getElementById('mainMenu');
    if (menu) {
        menu.classList.add('hidden');
    }

    // Show first step
    showTutorialPanel(TUTORIAL_STEPS[0]);
}

function nextTutorialStep() {
    if (tutorialState.nextStep()) {
        const step = TUTORIAL_STEPS[tutorialState.currentStep];
        showTutorialPanel(step);
    }
}

function skipTutorial() {
    if (confirm('Are you sure you want to skip the tutorial? You can always replay it from the main menu.')) {
        tutorialState.active = false;
        hideTutorialPanel();
        startMainGame();
    }
}

function startMainGame() {
    tutorialState.active = false;
    hideTutorialPanel();
    gameState.loadLevel(0);
    updateUI();
}

// ===== TUTORIAL WIN HANDLER =====
// This function is called instead of the normal showWin() during tutorial
function handleTutorialWin() {
    AudioSystem.playWin();

    const step = TUTORIAL_STEPS[tutorialState.currentStep];

    // Award power-up if this step has one
    if (step.level && step.level.powerUpReward) {
        gameState.addPowerUp(step.level.powerUpReward);
    }

    // Show success message and automatically advance
    setTimeout(() => {
        nextTutorialStep();
    }, 1000);
}

// ===== MAIN MENU =====
function showMainMenu() {
    const menu = document.getElementById('mainMenu');
    if (menu) {
        menu.classList.remove('hidden');
    }
}

function hideMainMenu() {
    const menu = document.getElementById('mainMenu');
    if (menu) {
        menu.classList.add('hidden');
    }
}

// ===== INITIALIZATION =====
function initTutorial() {
    // Check if this is first time playing
    if (!tutorialState.completed) {
        // Show main menu with tutorial option
        showMainMenu();
    } else {
        // Start main game directly
        startMainGame();
    }
}

// Export functions for use in game.js
window.TutorialSystem = {
    state: tutorialState,
    start: startTutorial,
    next: nextTutorialStep,
    skip: skipTutorial,
    handleWin: handleTutorialWin,
    init: initTutorial,
    showMenu: showMainMenu,
    hideMenu: hideMainMenu,
    loadTutorialLevel: loadTutorialLevel
};

// Export tutorial steps for access from game.js
window.TUTORIAL_STEPS = TUTORIAL_STEPS;
