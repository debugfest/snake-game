]# 🐍 Snake Game

A modern, interactive Snake Game built with Vite, featuring smooth animations, responsive controls, and classic arcade gameplay. Test your reflexes and aim for the highest score in this reimagined version of the timeless Snake game.

[![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF.svg)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E.svg)](https://javascript.info)
[![HTML5](https://img.shields.io/badge/HTML5-Canvas-E34F26.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
[![CSS3](https://img.shields.io/badge/CSS3-Modern-1572B6.svg)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 🌟 Features

- **Classic Gameplay**: Traditional Snake mechanics with modern enhancements
- **Smooth Animations**: 60 FPS gameplay with fluid snake movement
- **Responsive Controls**: Keyboard arrow keys and WASD support
- **Score System**: Real-time score tracking with high score persistence
- **Modern UI**: Clean, minimalistic design with smooth transitions
- **Progressive Difficulty**: Game speed increases as snake grows longer
- **Local Storage**: Persistent high score storage across sessions
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎯 Game Features

### Core Mechanics
- **🐍 Snake Movement**: Smooth directional controls with collision detection
- **🍎 Food System**: Randomly spawned food items that grow the snake
- **💀 Collision Detection**: Wall and self-collision game over mechanics
- **📊 Scoring**: Points awarded for each food item consumed
- **⚡ Speed Progression**: Increasing difficulty as score grows
- **🏆 High Score**: Persistent leaderboard using localStorage

## 🛠️ Technology Stack

- **Build Tool**: Vite 5.0+ (Lightning-fast development)
- **Frontend**: Vanilla JavaScript (ES6+)
- **Graphics**: HTML5 Canvas API
- **Styling**: Modern CSS3 with Flexbox/Grid
- **Bundling**: Vite's optimized build system
- **Development**: Hot Module Replacement (HMR)

## 📋 Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager
- Modern web browser with Canvas support

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/debugfest/snake-game.git
cd snake-game
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### 3. Start Development Server

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev

# Or using pnpm
pnpm dev
```

The game will be available at `http://localhost:5173`

### 4. Build for Production

```bash
# Using npm
npm run build

# Or using yarn
yarn build

# Or using pnpm
pnpm build
```

## 📁 Project Structure

```
snake-game/
├── public/                    # Static assets
│   └── favicon.ico           # Game favicon
├── src/                      # Source code
│   ├── js/                   # JavaScript modules
│   │   ├── game.js          # Main game logic
│   │   ├── snake.js         # Snake class and mechanics
│   │   ├── food.js          # Food generation and rendering
│   │   └── utils.js         # Utility functions
│   ├── css/                 # Stylesheets
│   │   ├── style.css        # Main styles
│   │   └── responsive.css   # Mobile responsive styles
│   └── main.js              # Entry point
├── index.html               # Main HTML file
├── package.json             # Dependencies and scripts
├── vite.config.js           # Vite configuration
├── README.md               # Project documentation
├── CONTRIBUTING.md         # Contributing guidelines
├── CODE_OF_CONDUCT.md     # Community standards
└── LICENSE                # MIT License
```

## 🎮 How to Play

### Controls
- **Arrow Keys**: Move snake (↑ ↓ ← →)
- **WASD Keys**: Alternative movement controls
- **Space Bar**: Pause/Resume game
- **R Key**: Restart game

### Gameplay
1. **Start the Game**: Open the application and press any arrow key to begin
2. **Control the Snake**: Use arrow keys or WASD to change direction
3. **Eat Food**: Guide the snake to consume red food items
4. **Avoid Collisions**: Don't hit walls or the snake's own body
5. **Score Points**: Each food item increases your score and snake length
6. **Beat High Score**: Try to surpass your previous best performance

### Game Rules

| Action | Points | Effect |
|--------|--------|---------|
| Eat Food | +10 | Snake grows by 1 segment |
| Wall Collision | Game Over | Reset to start screen |
| Self Collision | Game Over | Reset to start screen |
| Speed Increase | Every 50 points | Game becomes faster |

## 🔧 Development

### Available Scripts

```bash
# Start development server with HMR
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run linting
npm run lint

# Format code
npm run format
```

### Vite Configuration

The project uses Vite's default configuration with:
- **Hot Module Replacement**: Instant updates during development
- **Optimized Builds**: Tree-shaking and code splitting
- **Asset Processing**: Automatic optimization of images and assets
- **Development Server**: Fast startup and rebuild times

## 🎨 Customization

### Game Settings
Modify game parameters in `src/js/game.js`:
```javascript
const CONFIG = {
  GRID_SIZE: 20,           // Size of game grid
  INITIAL_SPEED: 200,      // Starting game speed (ms)
  SPEED_INCREASE: 10,      // Speed increase per level
  POINTS_PER_FOOD: 10      // Points awarded per food
};
```

### Visual Styling
Customize appearance in `src/css/style.css`:
- Snake colors and animations
- Food appearance and effects
- UI theme and typography
- Canvas styling and borders

## 🤝 Contributing

We welcome contributions! 

### Ways to Contribute
- 🎮 **Game Features**: Power-ups, obstacles, multiplayer modes
- 🎨 **Visual Effects**: Animations, particle systems, themes
- 📱 **Mobile Support**: Touch controls and responsive design
- ⚡ **Performance**: Optimization and smooth gameplay
- 🧪 **Testing**: Unit tests and game logic validation
- 📚 **Documentation**: Tutorials and code examples

### Development Setup
1. Fork the repository
2. Create feature branch (`git checkout -b feature/new-powerup`)
3. Install dependencies (`npm install`)
4. Start development server (`npm run dev`)
5. Make changes and test thoroughly
6. Commit with descriptive messages
7. Push and create Pull Request


## 🏆 Acknowledgments

- [Vite Team](https://vitejs.dev/) for the amazing build tool
- [MDN Web Docs](https://developer.mozilla.org/) for Canvas API documentation
- Classic Snake Game creators for the timeless gameplay
- Open source community for inspiration and support
- All contributors who help improve this project

---

<div align="center">

**⭐ If you found this project fun, please give it a star! ⭐**

Made with ❤️ 

**🐍 Enjoy the classic Snake experience! 🎮**


</div>
