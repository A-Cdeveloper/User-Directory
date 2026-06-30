import dotenv from 'dotenv';
import Database from 'better-sqlite3';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.development') });

const dbPath = process.env.DB_PATH ?? path.join(process.cwd(), 'users.db');
const db = new Database(dbPath);

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    avatar      TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    age         INTEGER NOT NULL,
    nationality TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS hobbies (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    name  TEXT NOT NULL UNIQUE
  );

  CREATE TABLE IF NOT EXISTS user_hobbies (
    user_id   INTEGER NOT NULL,
    hobby_id  INTEGER NOT NULL,
    PRIMARY KEY (user_id, hobby_id),
    FOREIGN KEY (user_id)  REFERENCES users(id),
    FOREIGN KEY (hobby_id) REFERENCES hobbies(id)
  );
`);

export default db;
