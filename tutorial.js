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
        message: "Let's learn how to play! In this game, you'll transform numbers on a grid to reach a target value.",
        instruction: "Click 'Next' to begin the tutorial.",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 1,
        title: "Step 1: Understanding the Grid",
        message: "You have a grid of numbers. Your goal is to make ALL tiles show the same target number.",
        instruction: "Look at the grid below. The target is shown in the Game Info panel above.",
        level: null,
        showNext: true,
        highlightElements: ['gameGrid', 'targetDisplay']
    },
    {
        id: 2,
        title: "Step 2: Operations",
        message: "You transform tiles using math operations like +1, -1, ×2, or ÷2.",
        instruction: "The 'Next Operation' shows which operation you MUST use next. You must follow the exact sequence!",
        level: null,
        showNext: true,
        highlightElements: ['currentOperation']
    },
    {
        id: 3,
        title: "Step 3: Parity Constraints",
        message: "Here's the twist: Each operation only affects tiles that meet a parity rule (even or odd).",
        instruction: "For example, if the constraint is 'MUST BE EVEN', only tiles that become even numbers after the operation will change. Others stay the same!",
        level: null,
        showNext: true,
        highlightElements: ['constraintDisplay']
    },
    {
        id: 4,
        title: "Challenge 1: Simple Addition",
        message: "Let's practice! Make both tiles reach 2.",
        instruction: "Click the +1 button when ready. Watch how the operation affects the tiles!",
        level: {
            gridSize: 2,
            target: 2,
            initialGrid: [1, 1],
            sequence: ["+1"],
            constraints: ["even"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: ['currentOperation'],
        autoShowConstraint: true
    },
    {
        id: 5,
        title: "Great Job! 🎉",
        message: "You completed your first challenge! Notice how both tiles changed to 2 because they met the 'even' constraint after adding 1.",
        instruction: "Click 'Next' to continue.",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 6,
        title: "Challenge 2: Understanding Constraints",
        message: "Now let's see constraints in action. Make all tiles reach 4.",
        instruction: "You'll need to use two operations in sequence: +1, then +1 again. Notice how constraints affect different tiles!",
        level: {
            gridSize: 2,
            target: 4,
            initialGrid: [2, 3],
            sequence: ["+1", "+1"],
            constraints: ["even", "odd"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: ['currentOperation', 'moveDisplay'],
        autoShowConstraint: true
    },
    {
        id: 7,
        title: "Excellent! ⭐",
        message: "Did you notice? The first +1 only changed the tile that became even (3→4). The second +1 only changed tiles that became odd (2→3).",
        instruction: "This is the core mechanic of Atomic Chain!",
        level: null,
        showNext: true,
        highlightElements: []
    },
    {
        id: 8,
        title: "Challenge 3: Using Multiplication",
        message: "Let's try multiplication! Make all tiles reach 4.",
        instruction: "Use the sequence: ×2, then ×2 again. Watch how multiplication interacts with constraints!",
        level: {
            gridSize: 2,
            target: 4,
            initialGrid: [1, 1],
            sequence: ["×2", "×2"],
            constraints: ["even", "even"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: ['currentOperation'],
        autoShowConstraint: true
    },
    {
        id: 9,
        title: "Challenge 4: Division Practice",
        message: "Now let's practice division. Make all tiles reach 1.",
        instruction: "Use ÷2 to divide the tiles. Remember the parity constraint!",
        level: {
            gridSize: 2,
            target: 1,
            initialGrid: [2, 2],
            sequence: ["÷2"],
            constraints: ["odd"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: ['currentOperation'],
        autoShowConstraint: true
    },
    {
        id: 10,
        title: "Challenge 5: Complex Sequence",
        message: "Ready for a bigger challenge? Make all 4 tiles reach 0.",
        instruction: "This requires a 3-step sequence. Think carefully about how each operation and constraint affects the tiles!",
        level: {
            gridSize: 2,
            target: 0,
            initialGrid: [1, 2, 3, 4],
            sequence: ["-1", "+1", "-1"],
            constraints: ["even", "odd", "even"],
            powerUpReward: null
        },
        showNext: false,
        highlightElements: ['currentOperation', 'moveDisplay'],
        autoShowConstraint: true
    },
    {
        id: 11,
        title: "Power-Ups Overview",
        message: "You'll earn power-ups as you progress! Let me show you what they do:",
        instruction: "🔮 Parity Peek: Reveals constraints for 10 seconds\n⏪ Rewind: Undo your last move\n🧮 Calculator: Shows how each tile will transform",
        level: null,
        showNext: true,
        highlightElements: ['peekBtn', 'rewindBtn', 'calculatorBtn']
    },
    {
        id: 12,
        title: "Final Challenge: Put It All Together!",
        message: "One last challenge before you're ready! Make all 9 tiles reach 0.",
        instruction: "This is similar to Level 1, but you've got this! Use the 3-step sequence shown.",
        level: {
            gridSize: 3,
            target: 0,
            initialGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
            sequence: ["-1", "-1", "+3"],
            constraints: ["odd", "even", "odd"],
            powerUpReward: "peek"
        },
        showNext: false,
        highlightElements: [],
        autoShowConstraint: true
    },
    {
        id: 13,
        title: "Tutorial Complete! 🎊",
        message: "Congratulations! You've mastered the basics of Atomic Chain!",
        instruction: "You're now ready to tackle all 15 levels. Good luck, and remember:\n• Follow the exact operation sequence\n• Pay attention to parity constraints\n• Use power-ups wisely!",
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
    gameState.operationSequence = [...tutorialLevel.sequence];
    gameState.currentStepIndex = 0;
    gameState.targetNumber = tutorialLevel.target;
    gameState.gridSize = tutorialLevel.gridSize;
    gameState.constraints = [...tutorialLevel.constraints];
    gameState.lastState = null;
    gameState.calculatorMode = false;

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
