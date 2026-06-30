# Presight Exercise

Full-stack User Directory application.

**Status:** Server API complete. Client UI in progress.

## Tech Stack

**Client (planned):** React 19, TypeScript, Vite, Tailwind CSS v4, TanStack Query, TanStack Virtual, React Router  
**Server:** Node.js, Express 5, TypeScript, better-sqlite3 (SQLite), Zod  
**Architecture:** npm workspaces monorepo

## Getting Started

```bash
npm install
```

### Server only

```bash
npm run dev -w server
# or
cd server && npm run dev
```

| Service | URL                             |
| ------- | ------------------------------- |
| Health  | http://localhost:3001/health    |
| API     | http://localhost:3001/api/users |

### Full stack (when client is ready)

```bash
npm run dev
```

| Service | URL                   |
| ------- | --------------------- |
| Client  | http://localhost:3002 |
| Server  | http://localhost:3001 |

### Seed database

Seed runs automatically on server start if the database is empty. To run manually:

```bash
npm run seed -w server
```

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

## Features

### Server (done)

- SQLite schema with 1000 seeded users (Faker)
- Search, filter, sort, pagination
- Faceted filter counts in response
- Zod query validation
- Layered structure: routes → services → lib → schemas → types

### Client (planned)

- Paginated user list with infinite scroll
- Search with debounce
- Filter sidebar (nationalities OR, hobbies AND)
- URL-synced filters
- Virtualized list (`@tanstack/react-virtual`)

## Project Structure

```
preversion/
├── client/                      # React app (WIP)
│   └── .env.development
├── server/
│   └── src/
│       ├── index.ts             # Express entry
│       ├── database/
│       │   ├── db.ts            # SQLite connection + schema
│       │   └── seed.ts          # Faker seed (1000 users)
│       ├── routes/
│       │   └── users.ts         # HTTP layer
│       ├── services/
│       │   └── usersService.ts  # Business + SQL logic
│       ├── schemas/
│       │   └── userQuerySchema.ts
│       ├── lib/
│       │   └── buildWhereClause.ts
│       ├── types/
│       │   └── user.ts
│       └── middleware/
│           └── errorHandler.ts
├── eslint.config.js
├── prettier.config.js
└── package.json
```

## Scripts

| Command                  | Description                      |
| ------------------------ | -------------------------------- |
| `npm run dev`            | Start client and server together |
| `npm run dev -w server`  | Start server only                |
| `npm run seed -w server` | Seed database manually           |
| `npm run lint`           | ESLint (whole repo)              |
| `npm run format`         | Prettier write                   |
| `npm run format:check`   | Prettier check                   |

## Environment

**Server** (`server/.env.development`):

```
PORT=3001
DB_PATH=./users.db
```

**Client** (`client/.env.development`):

```
VITE_API_URL=http://localhost:3001/api
```
