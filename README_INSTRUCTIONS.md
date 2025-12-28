# Project Instructions

This repository is an Nx monorepo containing multiple frontend apps (Angular, React, Stencil) plus shared libraries. This guide provides a concise, structured set of instructions for setting up, running, and working with the workspace.

## Prerequisites

- Node: `20.19.6`
- npm: `10.8.2`
- nvm: `0.39.7` (optional, but recommended)

You can verify versions with:

```bash
node -v
npm -v
nvm --version
```

If you use nvm, select the correct Node version:

```bash
nvm use 20.19.6
```

## Install Dependencies

From the repo root, install all workspace dependencies:

```bash
npm install --legacy-peer-deps
```

## Workspace Layout

- Apps
  - `apps/angular-app` (Angular)
  - `apps/react-app` (React + Vite)
  - `apps/frontend-stenciljs` (Stencil)
  - `apps/*-e2e` (Playwright E2E projects)
- Shared libraries
  - `apps-shared` (shared TS utilities/constants)

## Common Nx Commands

- List all projects and targets visually:
  ```bash
  npx nx graph
  ```
- Run a target for a project:
  ```bash
  npx nx <target> <project>
  # e.g.
  npx nx build react-app
  npx nx test angular-app
  ```

## Run Applications (Dev)

- Stencil app:

  ```bash
  npx nx run frontend-stenciljs:start
  ```

- React app:

  ```bash
  npx nx run react-app:serve
  ```

- Angular app:
  ```bash
  npx nx run angular-app:serve
  ```

## Build Applications

- Stencil app build:

  ```bash
  npx nx run frontend-stenciljs:build
  ```

- React app build:

  ```bash
  npx nx run react-app:build
  ```

- Angular app build:
  ```bash
  npx nx run angular-app:build
  ```

## Unit Tests

- All tests:

  ```bash
  npx nx run-many --target=test --all
  ```

- Per app/library:
  ```bash
  npx nx test react-app
  npx nx test angular-app
  npx nx test apps-shared
  ```

## E2E Tests (Playwright)

- React E2E:

  ```bash
  npx nx run react-app-e2e:e2e
  ```

- Angular E2E:
  ```bash
  npx nx run angular-app-e2e:e2e
  ```

## Linting & Formatting

- Lint a project:

  ```bash
  npx nx lint react-app
  ```

- Format files:
  ```bash
  npx nx format:write
  # check only
  npx nx format:check
  ```

## Troubleshooting

- If you see dependency resolution issues, prefer the provided install command:
  ```bash
  npm install --legacy-peer-deps
  ```
- Ensure you’re on the expected Node/npm versions (see Prerequisites).
- Clear Nx cache if needed:
  ```bash
  npx nx reset
  ```

## Useful Links

- Nx Docs: https://nx.dev
- Concepts: https://nx.dev/concepts/mental-model
- Running Tasks: https://nx.dev/features/run-tasks
- Project Graph: https://nx.dev/features/explore-graph

---

If anything seems out of date or you need additional run targets, run `npx nx show project <project>` to inspect available targets for that project.
