require('dotenv').config({ path: '../.env' });

const { Pool } = require('pg');

if (!process.env.DB_HOST) {
  throw new Error('Missing DB_HOST environment variable');
}

if (!process.env.DB_PORT) {
  throw new Error('Missing DB_PORT environment variable');
}

if (!process.env.DB_NAME) {
  throw new Error('Missing DB_NAME environment variable');
}

if (!process.env.DB_USER) {
  throw new Error('Missing DB_USER environment variable');
}

if (!process.env.DB_PASSWORD) {
  throw new Error('Missing DB_PASSWORD environment variable');
}

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function init() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN NOT NULL DEFAULT FALSE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

module.exports = { pool, init };
