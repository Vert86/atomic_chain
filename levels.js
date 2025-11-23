/**
 * Level Definitions for Atomic Chain
 * Each level contains:
 * - id: Level number
 * - name: Level name
 * - gridSize: Size of the grid (3, 4, or 5)
 * - target: The number all tiles must reach
 * - initialGrid: Starting numbers for each tile
 * - maxMoves: Maximum number of operations allowed
 * - constraintPattern: Parity constraints that cycle (even/odd)
 * - powerUpReward: Power-up awarded upon completion
 */

const LEVELS = [
    {
        id: 1,
        name: "Foundation",
        gridSize: 3,
        target: 0,
        initialGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        maxMoves: 5,
        constraintPattern: ["odd", "even", "odd", "even"],
        powerUpReward: "peek"
    },
    {
        id: 2,
        name: "Double Down",
        gridSize: 3,
        target: 0,
        initialGrid: [2, 4, 6, 8, 10, 12, 14, 16, 18],
        maxMoves: 6,
        constraintPattern: ["odd", "even", "odd", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 3,
        name: "Triple Threat",
        gridSize: 3,
        target: 1,
        initialGrid: [3, 6, 9, 12, 15, 18, 21, 24, 27],
        maxMoves: 5,
        constraintPattern: ["odd", "odd", "even", "odd"],
        powerUpReward: "calculator"
    },
    {
        id: 4,
        name: "Odd One Out",
        gridSize: 3,
        target: 0,
        initialGrid: [5, 7, 9, 11, 13, 15, 17, 19, 21],
        maxMoves: 6,
        constraintPattern: ["even", "even", "odd", "even"],
        powerUpReward: "peek"
    },
    {
        id: 5,
        name: "Parity Swap",
        gridSize: 4,
        target: 1,
        initialGrid: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
        maxMoves: 6,
        constraintPattern: ["odd", "even", "odd", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 6,
        name: "The Gauntlet",
        gridSize: 4,
        target: 0,
        initialGrid: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
        maxMoves: 7,
        constraintPattern: ["odd", "even", "even", "even"],
        powerUpReward: "calculator"
    },
    {
        id: 7,
        name: "Prime Time",
        gridSize: 4,
        target: 1,
        initialGrid: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112],
        maxMoves: 6,
        constraintPattern: ["odd", "odd", "even", "odd"],
        powerUpReward: "peek"
    },
    {
        id: 8,
        name: "Chain Reaction",
        gridSize: 4,
        target: 0,
        initialGrid: [16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256],
        maxMoves: 7,
        constraintPattern: ["odd", "even", "even", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 9,
        name: "The Nexus",
        gridSize: 4,
        target: 1,
        initialGrid: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135, 144],
        maxMoves: 6,
        constraintPattern: ["odd", "odd", "even", "odd"],
        powerUpReward: "calculator"
    },
    {
        id: 10,
        name: "Division Trap",
        gridSize: 5,
        target: 0,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 5),
        maxMoves: 8,
        constraintPattern: ["odd", "even", "odd", "even", "even"],
        powerUpReward: "peek"
    },
    {
        id: 11,
        name: "The Matrix",
        gridSize: 5,
        target: 1,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 4),
        maxMoves: 8,
        constraintPattern: ["odd", "even", "even", "odd", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 12,
        name: "Infinity Loop",
        gridSize: 5,
        target: 0,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 6),
        maxMoves: 9,
        constraintPattern: ["odd", "even", "even", "odd", "even", "odd"],
        powerUpReward: "calculator"
    },
    {
        id: 13,
        name: "Quantum State",
        gridSize: 5,
        target: 1,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 8),
        maxMoves: 8,
        constraintPattern: ["odd", "even", "even", "odd", "even"],
        powerUpReward: "peek"
    },
    {
        id: 14,
        name: "The Singularity",
        gridSize: 5,
        target: 0,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 12),
        maxMoves: 10,
        constraintPattern: ["odd", "even", "even", "odd", "odd", "even", "odd"],
        powerUpReward: "rewind"
    },
    {
        id: 15,
        name: "Atomic Finale",
        gridSize: 5,
        target: 1,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 10),
        maxMoves: 10,
        constraintPattern: ["odd", "even", "even", "odd", "odd", "odd", "even", "odd"],
        powerUpReward: "calculator"
    }
];
