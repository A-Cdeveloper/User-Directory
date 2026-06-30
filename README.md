# Presight Exercise

Full-stack User Directory application (work in progress).

## Tech Stack

**Client:** React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, React Router  
**Server:** Node.js, Express 5, better-sqlite3 (SQLite)  
**Architecture:** npm workspaces monorepo, `features/` folder structure on the client

## Getting Started

```bash
npm install --legacy-peer-deps
npm run dev
```

| Service | URL                   |
| ------- | --------------------- |
| Client  | http://localhost:3002 |
| Server  | http://localhost:3001 |

> App code not implemented yet — `npm run dev` will work once client and server are scaffolded.

## Features (planned)

### Users — `/`

Paginated user list with search, filters, sorting, and infinite scroll.

- Search by first name, last name, or full name
- Filter nationalities (OR), hobbies (AND)
- Sort by name, age, nationality
- URL-synced filters (shareable links)
- Virtualized list for performance

## Project Structure

```
preversion/
├── client/                 # React app
│   └── src/                # (to be added)
│       ├── features/users/
│       ├── api/
│       └── ...
├── server/                 # Node.js API
│   └── src/                # (to be added)
│       ├── routes/
│       └── database/
├── eslint.config.js
├── prettier.config.js
└── package.json            # root workspaces + tooling
```

## Scripts

| Command                | Description                      |
| ---------------------- | -------------------------------- |
| `npm run dev`          | Start client and server together |
| `npm run lint`         | ESLint (whole repo)              |
| `npm run format`       | Prettier write                   |
| `npm run format:check` | Prettier check                   |
