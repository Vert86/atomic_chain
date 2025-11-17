/**
 * Level Definitions for Atomic Chain
 * Each level contains:
 * - id: Level number
 * - name: Level name
 * - gridSize: Size of the grid (3, 4, or 5)
 * - target: The number all tiles must reach
 * - initialGrid: Starting numbers for each tile
 * - sequence: The exact sequence of operations players must use
 * - constraints: Parity constraints (even/odd) for each operation
 * - powerUpReward: Power-up awarded upon completion
 */

const LEVELS = [
    {
        id: 1,
        name: "Foundation",
        gridSize: 3,
        target: 0,
        initialGrid: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        sequence: ["-1", "-1", "+3"],
        constraints: ["odd", "even", "odd"],
        powerUpReward: "peek"
    },
    {
        id: 2,
        name: "Double Down",
        gridSize: 3,
        target: 0,
        initialGrid: [2, 4, 6, 8, 10, 12, 14, 16, 18],
        sequence: ["÷2", "-1", "+3", "-2"],
        constraints: ["odd", "even", "odd", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 3,
        name: "Triple Threat",
        gridSize: 3,
        target: 1,
        initialGrid: [3, 6, 9, 12, 15, 18, 21, 24, 27],
        sequence: ["÷3", "+2", "-1"],
        constraints: ["odd", "odd", "even"],
        powerUpReward: "calculator"
    },
    {
        id: 4,
        name: "Odd One Out",
        gridSize: 3,
        target: 0,
        initialGrid: [5, 7, 9, 11, 13, 15, 17, 19, 21],
        sequence: ["-5", "+2", "÷2", "-1"],
        constraints: ["even", "even", "odd", "even"],
        powerUpReward: "peek"
    },
    {
        id: 5,
        name: "Parity Swap",
        gridSize: 4,
        target: 1,
        initialGrid: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
        sequence: ["÷2", "-5", "+3", "÷2"],
        constraints: ["odd", "even", "odd", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 6,
        name: "The Gauntlet",
        gridSize: 4,
        target: 0,
        initialGrid: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160],
        sequence: ["÷10", "+1", "×2", "-4"],
        constraints: ["odd", "even", "even", "even"],
        powerUpReward: "calculator"
    },
    {
        id: 7,
        name: "Prime Time",
        gridSize: 4,
        target: 1,
        initialGrid: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70, 77, 84, 91, 98, 105, 112],
        sequence: ["÷7", "+2", "-1", "÷2"],
        constraints: ["odd", "odd", "even", "odd"],
        powerUpReward: "peek"
    },
    {
        id: 8,
        name: "Chain Reaction",
        gridSize: 4,
        target: 0,
        initialGrid: [16, 32, 48, 64, 80, 96, 112, 128, 144, 160, 176, 192, 208, 224, 240, 256],
        sequence: ["÷16", "+3", "×2", "-8"],
        constraints: ["odd", "even", "even", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 9,
        name: "The Nexus",
        gridSize: 4,
        target: 1,
        initialGrid: [9, 18, 27, 36, 45, 54, 63, 72, 81, 90, 99, 108, 117, 126, 135, 144],
        sequence: ["÷9", "+4", "-3", "÷2"],
        constraints: ["odd", "odd", "even", "odd"],
        powerUpReward: "calculator"
    },
    {
        id: 10,
        name: "Division Trap",
        gridSize: 5,
        target: 0,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 5),
        sequence: ["÷5", "-2", "×3", "-1", "÷2"],
        constraints: ["odd", "even", "odd", "even", "even"],
        powerUpReward: "peek"
    },
    {
        id: 11,
        name: "The Matrix",
        gridSize: 5,
        target: 1,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 4),
        sequence: ["÷4", "+1", "×2", "-5", "÷2"],
        constraints: ["odd", "even", "even", "odd", "even"],
        powerUpReward: "rewind"
    },
    {
        id: 12,
        name: "Infinity Loop",
        gridSize: 5,
        target: 0,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 6),
        sequence: ["÷6", "+5", "-2", "÷2", "+1", "-1"],
        constraints: ["odd", "even", "even", "odd", "even", "odd"],
        powerUpReward: "calculator"
    },
    {
        id: 13,
        name: "Quantum State",
        gridSize: 5,
        target: 1,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 8),
        sequence: ["÷8", "+3", "×2", "-7", "÷2"],
        constraints: ["odd", "even", "even", "odd", "even"],
        powerUpReward: "peek"
    },
    {
        id: 14,
        name: "The Singularity",
        gridSize: 5,
        target: 0,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 12),
        sequence: ["÷12", "+5", "×2", "-3", "÷2", "+1", "-1"],
        constraints: ["odd", "even", "even", "odd", "odd", "even", "odd"],
        powerUpReward: "rewind"
    },
    {
        id: 15,
        name: "Atomic Finale",
        gridSize: 5,
        target: 1,
        initialGrid: Array.from({length: 25}, (_, i) => (i + 1) * 10),
        sequence: ["÷10", "+7", "×2", "-5", "÷2", "+2", "-1", "÷2"],
        constraints: ["odd", "even", "even", "odd", "odd", "odd", "even", "odd"],
        powerUpReward: "calculator"
    }
];
