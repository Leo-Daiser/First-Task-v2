const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: 'localhost',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Получение всех материалов
app.get('/api/materials', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM materials');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении материалов:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Добавление нового материала
app.post('/api/materials', async (req, res) => {
  const { name, unit_of_measurement } = req.body;
  try {
    const result = await pool.query('INSERT INTO materials (name, unit_of_measurement) VALUES ($1, $2) RETURNING *', [name, unit_of_measurement]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении материала:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.put('/api/materials/:id', async (req, res) => {
  const { id } = req.params;
  const { name, unit_of_measurement } = req.body;
  try {
    const result = await pool.query('UPDATE materials SET name = $1, unit_of_measurement = $2 WHERE id = $3 RETURNING *', [name, unit_of_measurement, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении материала:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/api/materials/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM materials WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при удалении материала:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/suppliers', async (req, res) => {
  const { name, type, phone, address } = req.body;
  try {
    const result = await pool.query('INSERT INTO suppliers (name, type, phone, address) VALUES ($1, $2, $3, $4) RETURNING *', [name, type, phone, address]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении поставщика:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/suppliers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM suppliers');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении поставщиков:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Обновление поставщика
app.put('/api/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  const { name, type, phone, address } = req.body;
  try {
    const result = await pool.query('UPDATE suppliers SET name = $1, type = $2, phone = $3, address = $4 WHERE id = $5 RETURNING *', [name, type, phone, address, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении поставщика:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Удаление поставщика
app.delete('/api/suppliers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM suppliers WHERE id = $1', [id]);
    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка при удалении поставщика:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
