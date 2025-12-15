## Running the project

### Prerequisites
- Node.js 18+ (recommended)
- npm, yarn, pnpm or bun

### Setup
1. Install dependencies (choose one):
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

### Development
Start the dev server (Vite, default port 5173):
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Production build & preview
Build the app:
```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```
Preview the production build locally:
```bash
npm run preview
# or
yarn preview
# or
pnpm preview
# or
bun preview
```

### Tests & linting
Run tests:
```bash
npm test
# or
yarn test
# or
pnpm test
# or
bun test
```
Run linters:
```bash
npm run lint
# or
yarn lint
# or
pnpm lint
# or
bun lint
```

## Technology Choices

### TypeScript
- Static type checking catches errors at compile time and improves runtime safety.
- Enables better IDE tooling (autocomplete, refactoring, navigation).
- Facilitates scalable architecture through explicit types.

### Vite + SWC
- Vite is faster then Webpack.
- SWC provides high-performance TypeScript and JSX transpilation written in Rust and it's faster than Babel.

### Zustand
- Minimalistic state management with a small API surface and no boilerplate.
- State management with local storage integrated.

### Material UI (MUI)
- Accessible, production-ready components.
- Reduces UI implementation time while maintaining UX consistency.
- Well-tested components improve reliability and accessibility compliance.

### React Query (TanStack Query)
- Built-in caching, deduplication, background refetching, and stale-while-revalidate.
- Eliminates most manual loading/error state management.

### Jest
- Integrates well with React testing tools.
