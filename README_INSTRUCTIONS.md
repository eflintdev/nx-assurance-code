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

## Docker Deployment

This project includes Docker support for containerizing the React and Angular apps.

### Prerequisites for Docker

- Docker: `20.10+`
- Docker Compose: `1.29+`

Verify installation:

```bash
docker --version
docker compose --version
```

### Project Structure

- `docker compose.yml` - Orchestrates both services at root level
- `apps/react-app/Dockerfile` - React app production image
- `apps/angular-app/Dockerfile` - Angular app production image

### Building and Running Containers

FIRST => Run stenciljs build first and then copy its output to Angular and React apps which then get built:
```bash
npx nx run nx-assurance-code:stenciljs-custom-commands:build-stenciljs-to-all:prod
```

#### Build and start all services:

```bash
docker compose up --build
```

The apps will be available at:

- React app: http://localhost:3000
- Angular app: http://localhost:4200

#### Run without rebuilding:

```bash
docker compose up
```

#### Stop services:

```bash
docker compose down
```

#### Rebuild without cache:

```bash
docker compose build --no-cache
```

#### View service logs:

```bash
# All services
docker compose logs -f

# Specific service
docker compose logs -f react-app
docker compose logs -f angular-app
```

### Building Individual Images

#### Build React app image only:

```bash
docker build -f apps/react-app/Dockerfile -t nx-react-app .
```

#### Build Angular app image only:

```bash
docker build -f apps/angular-app/Dockerfile -t nx-angular-app .
```

#### Run individual container:

```bash
docker run -p 3000:3000 nx-react-app
docker run -p 4200:4200 nx-angular-app
```

### Docker Details

- **Base image**: Node 20-alpine (lightweight, ~170MB)
- **Build strategy**: Multi-stage builds to optimize image size
- **Ports**: React on 3000, Angular on 4200
- **Network**: Both services connected via `nx-network` bridge
- **Restart policy**: `unless-stopped` - auto-restarts on failure
- **Environment**: Production mode (`NODE_ENV=production`)

Both Dockerfiles:

1. Install workspace dependencies
2. Build the app using Nx
3. Copy only production assets to final image
4. Serve using `npx serve` on configured port

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
