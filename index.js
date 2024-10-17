// app.js
const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = 3000;

// PostgreSQL connection setup
const pool = new Pool({
  user: 'postgres', // your PostgreSQL username
  host: 'localhost',
  database: 'postgres', // your PostgreSQL database name
  password: 'postgres', // your PostgreSQL password
  port: 5432, // default PostgreSQL port
});

// Define a simple route
app.get('/', async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    res.send(result.rows);
    client.release();
  } catch (err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.get('/clubs', async (req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM club');
      res.send(result.rows);
      client.release();
    } catch (err) {
      console.error(err);
      res.send('Error ' + err);
    }
  });

// Make the server listen on a specific port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});