# ⚛️ Atomic Chain

A production-ready math puzzle game that challenges players to master arithmetic sequences and parity constraints. Built with vanilla JavaScript, Web Audio API, and Tailwind CSS.

![Game Type](https://img.shields.io/badge/type-puzzle-blue)
![Platform](https://img.shields.io/badge/platform-web%20%7C%20mobile-green)
![Status](https://img.shields.io/badge/status-production-success)

## 🎮 Game Overview

**Atomic Chain** is an addictive puzzle game where players must apply a strict sequence of mathematical operations to a grid of numbers, with each operation constrained by parity (even/odd) rules. The goal is to reduce all tiles to a target number by following the exact sequence and respecting the constraints.

### Core Mechanics

The game enforces **three mandatory checks** for every move:

1. **Sequence Check**: Is the chosen operation the one currently required by the level's sequence?
2. **Parity/Constraint Check**: Can this operation be legally applied to the selected tile(s) based on the current step's constraint?
3. **Completion Check**: If all grid numbers are reduced to the Target Number, the level is won.

**Win Condition**: All tiles reach the target number
**Lose Condition**: Wrong operation selected OR sequence exhausted without reaching target

## 🎯 Features

### Game Mechanics
- ✅ **15 Progressive Levels** - 3x3, 4x4, and 5x5 grids with increasing complexity
- ✅ **Strict Sequence System** - Players must follow exact operation order
- ✅ **Parity Constraints** - Each operation has even/odd result requirements
- ✅ **Zero-Buffer Constraint** - No room for error, perfect path required
- ✅ **Smart Tile System** - Tiles that violate constraints are not modified

### Power-Ups
- 🔮 **Parity Peek** - Reveals constraints for 10 seconds
- ⏪ **Rewind** - Undo the last move
- 🧮 **Sequence Calculator** - Simulate transformation paths for tiles

### Technical Features
- 📱 **Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- 🔊 **Web Audio API** - Dynamic sound effects (success, failure, victory)
- 🎨 **Modern UI** - Gradient backgrounds, smooth animations, Tailwind CSS
- ⚡ **Zero Dependencies** - Pure vanilla JavaScript (except Tailwind CDN)
- 🚀 **Production Ready** - Optimized, modular, and maintainable code

## 📂 Project Structure

```
atomic_chain/
├── index.html      # Main HTML structure
├── styles.css      # All styling and animations
├── levels.js       # Level definitions (15 levels)
├── audio.js        # Web Audio API sound system
├── game.js         # Core game logic and state management
└── README.md       # This file
```

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd atomic_chain
```

2. Open `index.html` in your browser:
```bash
# Using Python's built-in server
python -m http.server 8000

# Or using Node.js
npx serve

# Or simply open index.html directly in your browser
```

3. Start playing! 🎮

## 🎲 How to Play

### Objective
Transform all tiles in the grid to reach the **Target Number** by applying operations in the exact sequence shown.

### Gameplay

1. **Check the Current Operation** - Displayed prominently at the top
2. **Select the Operation** - Click the matching operation button
3. **Watch the Transformation** - Valid tiles will update (green pulse), invalid tiles stay unchanged (red shake)
4. **Progress Through Sequence** - Continue until all tiles reach the target
5. **Win & Earn Power-Ups** - Complete levels to unlock helpful tools

### Operation Rules

- **Operations must be applied in sequence** - No skipping allowed
- **Parity constraints apply** - Each step requires even or odd results
- **Tiles that violate constraints are skipped** - They retain their value
- **All tiles must reach target** - Partial completion is failure

### Example Walkthrough

**Level 1: Foundation**
- Grid: `[1, 2, 3, 4, 5, 6, 7, 8, 9]`
- Target: `0`
- Sequence: `["-1", "-1", "+3"]`
- Constraints: `["odd", "even", "odd"]`

**Step 1**: Apply `-1` (result must be odd)
- `1 → 0` (even) ❌ Skipped
- `2 → 1` (odd) ✓ Applied
- `3 → 2` (even) ❌ Skipped
- etc.

Continue until all tiles reach `0`!

## 🎨 File Descriptions

### `index.html`
Contains the complete HTML structure including:
- Game info panel (level, move counter, target, stars)
- Operation display
- 3x3/4x4/5x5 dynamic grid
- Power-up buttons
- Operation selector buttons
- Win/lose/calculator modals

### `styles.css`
All styling including:
- Custom animations (pulse, shake, fade, float)
- Grid layouts (responsive 3x3, 4x4, 5x5)
- Mobile-optimized touch interactions
- Gradient backgrounds and effects
- Modal backdrops and transitions

### `levels.js`
Defines all 15 levels with:
- `id`: Level number
- `name`: Level title
- `gridSize`: 3, 4, or 5
- `target`: Target number to reach
- `initialGrid`: Starting tile values
- `sequence`: Exact operation sequence
- `constraints`: Parity constraints for each step
- `powerUpReward`: Power-up awarded on completion

### `audio.js`
Web Audio API sound system:
- `playSuccess()`: Ascending tone sequence (C5 → E5 → G5)
- `playFailure()`: Descending harsh sawtooth wave
- `playWin()`: Victory melody (C5, E5, G5, C6)
- `playClick()`: Short beep for UI interactions

### `game.js`
Core game logic including:
- `GameState` class - State management
- `handleMove()` - Three-check move validation
- `renderGrid()` - Dynamic grid rendering
- `updateUI()` - Real-time UI updates
- Power-up functions (`usePeek`, `useRewind`, `useCalculator`)
- Modal management
- Event handlers

## 🎯 Level Progression

| Level | Name | Grid | Target | Sequence Length | Difficulty |
|-------|------|------|--------|----------------|------------|
| 1 | Foundation | 3x3 | 0 | 3 | ⭐ |
| 2 | Double Down | 3x3 | 0 | 4 | ⭐ |
| 3 | Triple Threat | 3x3 | 1 | 3 | ⭐ |
| 4 | Odd One Out | 3x3 | 0 | 4 | ⭐⭐ |
| 5 | Parity Swap | 4x4 | 1 | 4 | ⭐⭐ |
| 6 | The Gauntlet | 4x4 | 0 | 4 | ⭐⭐ |
| 7 | Prime Time | 4x4 | 1 | 4 | ⭐⭐⭐ |
| 8 | Chain Reaction | 4x4 | 0 | 4 | ⭐⭐⭐ |
| 9 | The Nexus | 4x4 | 1 | 4 | ⭐⭐⭐ |
| 10 | Division Trap | 5x5 | 0 | 5 | ⭐⭐⭐⭐ |
| 11 | The Matrix | 5x5 | 1 | 5 | ⭐⭐⭐⭐ |
| 12 | Infinity Loop | 5x5 | 0 | 6 | ⭐⭐⭐⭐ |
| 13 | Quantum State | 5x5 | 1 | 5 | ⭐⭐⭐⭐⭐ |
| 14 | The Singularity | 5x5 | 0 | 7 | ⭐⭐⭐⭐⭐ |
| 15 | Atomic Finale | 5x5 | 1 | 8 | ⭐⭐⭐⭐⭐ |

## 🛠️ Development

### Modifying Levels

Edit `levels.js` to add or modify levels:

```javascript
{
    id: 16,
    name: "Your Level",
    gridSize: 4,
    target: 0,
    initialGrid: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
    sequence: ["÷2", "-1", "+3"],
    constraints: ["odd", "even", "odd"],
    powerUpReward: "peek"
}
```

### Adding Operations

To add new operations, update:
1. `index.html` - Add operation button with `data-op` attribute
2. `game.js` - Update `parseOperation()` if needed

### Customizing Styles

Edit `styles.css` to modify:
- Colors and gradients
- Animation timings
- Grid spacing
- Font sizes

## 📱 Mobile Support

The game is fully optimized for mobile devices:
- Touch-friendly buttons
- Responsive grid sizing
- Prevents pull-to-refresh interference
- Optimized tap targets
- Mobile-first font scaling

## 🎵 Audio System

Uses Web Audio API for dynamic, low-latency sound effects:
- **No audio files required** - All sounds generated procedurally
- **Lazy initialization** - Audio context created on first interaction
- **Musical notes** - Based on standard musical frequencies
- **Optimized performance** - Minimal CPU usage

## 🔧 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android 5+)

## 📄 License

This project is open source and available for personal and educational use.

## 🤝 Contributing

Contributions are welcome! Areas for enhancement:
- Additional levels
- New power-ups
- Leaderboard system
- Local storage for save games
- Sound toggle
- Dark/light theme
- Accessibility improvements

## 🎉 Credits

- **Design & Development**: Atomic Chain Team
- **Fonts**: Orbitron, Rajdhani (Google Fonts)
- **Framework**: Tailwind CSS
- **Audio**: Web Audio API

## 🐛 Known Issues

None currently. Please report any bugs via GitHub issues.

## 🚀 Deployment

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select `main` branch and root folder
4. Access at `https://yourusername.github.io/atomic_chain`

### Netlify
1. Drag and drop the `atomic_chain` folder
2. Instant deployment with custom domain support

### Static Hosting
Upload all files to any static web host:
- AWS S3
- Vercel
- Firebase Hosting
- Cloudflare Pages

---

**Enjoy playing Atomic Chain!** ⚛️✨

*Master the Sequence. Respect the Parity.*
