# Contributing Guide

Thanks for your interest in improving Snake Game! This guide keeps contributions simple and consistent.

## Ways to Contribute
- Open issues (bugs, ideas, questions)
- Improve UI/UX (canvas visuals, accessibility, responsiveness)
- Add features (power-ups, obstacles, themes, touch controls)
- Refactor/cleanup and small fixes
- Docs (README, comments, examples)

## Quick Start
```bash
git clone https://github.com/debugfest/snake-game.git
cd snake-game
npm install
npm run dev
```

Useful scripts:
```bash
npm run dev        # Start dev server (Vite + HMR)
npm run build      # Production build
npm run preview    # Preview build

```

## Workflow
1. Fork the repo and create a feature branch:
   ```bash
   git checkout -b feat/short-description
   # or fix/short-description, docs/short-description
   ```
2. Make focused changes and commit with clear messages:
   - type(scope): short summary
   - Example: `feat(game): add pause/resume with P key`
3. Push your branch and open a Pull Request (PR).

## Coding Standards
- TypeScript + React 18
- Prefer readable names, small components/hooks, early returns
- Keep comments only for non‑obvious logic
- Tailwind CSS for styling around the canvas UI
- No unused variables/parameters (ESLint is strict)

### Project Conventions
- Components under `src/components/`
- Hooks under `src/hooks/`
- Game helpers and constants under `src/utils/`
- Types under `src/types/`

## PR Checklist
- [ ] Runs locally: `npm run dev`
- [ ] Lints clean: `npm run lint`
- [ ] Type checks: `npm run typecheck`
- [ ] No unrelated file changes
- [ ] Screenshots/GIFs for visual changes (optional but helpful)
- [ ] Description explains the why + what

## Reporting Issues
Please include:
- What happened vs. expected behavior
- Steps to reproduce
- Environment (OS, browser)
- Screenshots/GIFs if visual

## License
By contributing, you agree your contributions are licensed under the repository’s MIT license.

Thanks again for helping make Snake Game better!
