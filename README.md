# Goal Quest (Astro + React + Zustand)

This project runs on Astro + React + Tailwind (`@tailwindcss/vite`).
The old monolithic `public/js/app.js` logic is now migrated into TypeScript React components with Zustand state management.

## Development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm run preview
```

## Main architecture

- `src/stores/goalQuestStore.ts`:
  Zustand game state + actions (progression, missions, combat, persistence)
- `src/game/types.ts`:
  shared TypeScript domain types
- `src/game/data.ts`:
  static game data (characters, regions, daily missions)
- `src/components/goalquest/screens/*`:
  screen components (`start`, `characters`, `world`, `region`, `daily`, `combat`, `rest`, `settings`, `achievements`)
- `src/components/goalquest/overlays/*`:
  onboarding, task modal, notifications, music toggle
- `src/components/goalquest/effects/*`:
  particle background, corruption overlays, Aeril companion
- `src/components/goalquest/GoalQuestApp.tsx`:
  root orchestrator
- `src/pages/index.astro`:
  Astro page mounting app with `client:load`
