# 1) Base image — Node 22
FROM node:22-bookworm-slim

# 2) Radni folder unutar kontejnera
WORKDIR /app

# 3) better-sqlite3 mora da se kompajlira (native modul)
RUN apt-get update \
  && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

# 4) Prvo samo package fajlovi → bolji Docker cache
COPY package.json package-lock.json ./
COPY server/package.json server/
COPY client/package.json client/

# 5) Instalacija dependencija za server workspace
# --ignore-scripts preskoči husky; rebuild kompajlira better-sqlite3
RUN npm ci -w server --ignore-scripts \
  && npm rebuild better-sqlite3 -w server

# 6) Tek sada source kod
COPY server/ server/

# 7) TypeScript → dist/
RUN npm run build -w server

# 8) Port koji Express sluša
EXPOSE 3001

# Defaults (Compose environment ih override-uje)
RUN mkdir -p /app/data
ENV PORT=3001 \
    DB_PATH=/app/data/users.db \
    CORS_ORIGINS=http://localhost:3002 \
    RATE_LIMIT_MAX=100 \
    RATE_LIMIT_WINDOW_MS=60000

# 9) Pokretanje (isto kao npm run start -w server)
CMD ["npm", "run", "start", "-w", "server"]
