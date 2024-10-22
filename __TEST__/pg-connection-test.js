// index.js

// IMPORTANT: This requires create grant

console.clear();
import dotenv from 'dotenv'; dotenv.config();
import pg from 'pg';
import pgvector from 'pgvector';

async function testConnection() {
  const client = new pg.Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL successfully.');

    // Optional: Test pgvector by creating a table and inserting a vector
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        embedding VECTOR(3)
      );
    `;

    await client.query(createTableQuery);
    console.log('Table "items" is ready.');

    // Insert a sample vector
    const insertQuery = `
      INSERT INTO items (name, embedding)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const embedding = pgvector.toSql([0.1, 0.2, 0.3]);
    const values = ['Sample Item', embedding];

    const res = await client.query(insertQuery, values);
    console.log('Inserted Row:', res.rows[0]);

    // Fetch the inserted row
    const selectQuery = `SELECT * FROM items WHERE id = $1;`;
    const selectRes = await client.query(selectQuery, [res.rows[0].id]);
    console.log('Selected Row:', selectRes.rows[0]);
    await client.query(`drop table items;`, []);
    console.log('Cleaned up');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.end();
    console.log('Disconnected from PostgreSQL.');
  }
}

testConnection();
