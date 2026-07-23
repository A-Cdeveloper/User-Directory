# User Directory

Full-stack application for browsing, filtering, sorting, and paginating a directory of users.

## Tech Stack

**Client:** React 19, TypeScript, Vite, Tailwind CSS, TanStack Query, React Router, shadcn/ui  
**Server:** Node.js, Express 5, TypeScript, better-sqlite3 (SQLite), Zod  
**Architecture:** npm workspaces monorepo (`client` + `server`)

## Getting Started

```bash
npm install
```

### Full stack

```bash
npm run dev
```

| Service | URL                             |
| ------- | ------------------------------- |
| Client  | http://localhost:3002           |
| Server  | http://localhost:3001           |
| Health  | http://localhost:3001/health    |
| API     | http://localhost:3001/api/users |

### Server only

```bash
npm run dev -w server
```

### Seed database

Seed runs automatically on server start if the database is empty. To run manually:

```bash
npm run seed -w server
```

## Features

### Server

- SQLite schema with 1000 seeded users (Faker)
- Search, filter, sort, and pagination
- Faceted filter counts in the response
- Zod query validation
- Layered structure: routes → services → lib → schemas → types
- Vitest unit tests (query schema, where-clause builder)
- HTTP tests with Supertest (`/health`, `/api/users`, 400/404)

### Client

- User list with infinite scroll (`useInfiniteQuery` + IntersectionObserver)
- Virtualized list rows (`@tanstack/react-virtual`) so only visible cards mount in the DOM
- Debounced search (URL updates immediately; API calls wait ~500ms)
- Filter sidebar (nationalities OR, hobbies AND) synced to the URL
- Selected filter badges with clear-all, sticky selected facets when omitted from top options
- Sort by field and direction, synced to the URL
- Shareable filter / sort / search state via search params
- Loading and error states (skeletons, error boundary / route error page)
- Accessibility basics (labels, live regions, keyboard-friendly filter controls)
- Production vendor chunk splitting for long-term browser caching

## API

### `GET /health`

Returns `{ "status": "ok" }`.

### `GET /api/users`

Returns paginated users with filters applied and faceted filter counts for the sidebar.

**Query parameters**

| Parameter       | Type   | Description                                     |
| --------------- | ------ | ----------------------------------------------- |
| `search`        | string | Search by first name, last name, or full name   |
| `nationalities` | string | Comma-separated list (OR logic)                 |
| `hobbies`       | string | Comma-separated list (AND logic)                |
| `sortBy`        | string | `first_name`, `last_name`, `age`, `nationality` |
| `sortDir`       | string | `asc` or `desc`                                 |
| `page`          | number | Page number (default: 1)                        |
| `limit`         | number | Results per page (default: 20, max: 100)        |

**Example**

```
GET /api/users?search=john&nationalities=British,Indian&hobbies=Reading,Coding&sortBy=age&sortDir=desc&page=1&limit=20
```

**Response**

```json
{
  "users": [
    {
      "id": 1,
      "avatar": "https://...",
      "first_name": "John",
      "last_name": "Smith",
      "age": 25,
      "nationality": "British",
      "hobbies": ["Reading", "Coding"]
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1000,
    "hasMore": true
  },
  "filters": {
    "nationalities": [{ "value": "British", "count": 45 }],
    "hobbies": [{ "value": "Reading", "count": 89 }]
  }
}
```

**Errors**

| Status | When                                      |
| ------ | ----------------------------------------- |
| 400    | Invalid query parameters (Zod validation) |
| 404    | Unknown route                             |
| 500    | Internal server error                     |

## Project Structure

```
├── client/                 # React + Vite app
│   └── src/
│       ├── features/users/ # Users UI, hooks, API
│       ├── pages/
│       ├── providers/
│       └── components/
├── server/
│   ├── vitest.config.ts
│   └── src/
│       ├── app.ts          # Express app (testable, no listen)
│       ├── index.ts        # listen + seed
│       ├── app.test.ts
│       ├── database/       # SQLite + seed
│       ├── routes/
│       ├── services/
│       ├── schemas/        # + *.test.ts
│       ├── lib/            # + *.test.ts
│       ├── types/
│       └── middleware/
├── eslint.config.js
├── prettier.config.js
└── package.json
```

## Scripts

| Command                   | Description                      |
| ------------------------- | -------------------------------- |
| `npm run dev`             | Start client and server together |
| `npm run dev -w server`   | Start server only                |
| `npm run seed -w server`  | Seed database manually           |
| `npm run lint`            | ESLint (whole repo)              |
| `npm run format`          | Prettier write                   |
| `npm run format:check`    | Prettier check                   |
| `npm test`                | Run server tests (Vitest)        |
| `npm run test -w server`  | Same, server workspace only      |
| `npm run build -w client` | Production build (client)        |

## Environment

Copy from examples, then adjust if needed:

**Server** (`server/.env.development`):

```
PORT=3001
DB_PATH=./users.db
```

**Client** (`client/.env.example` → `.env.development` / `.env.production`):

```
VITE_API_URL=http://localhost:3001/api
```
