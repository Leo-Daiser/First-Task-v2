import { Pool } from 'pg';
require('dotenv').config();

let pool;

export function createPool() {
  if (!pool) {
    pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  return pool;
}

export async function query(text, params) {
  const client = await createPool().connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

export async function updateMaterial(id, name, unit_of_measurement) {
  try {
    const result = await query('UPDATE materials SET name = $1, unit_of_measurement = $2 WHERE id = $3', [
      name,
      unit_of_measurement,
      id,
    ]);
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при обновлении материала:', error);
    return null;
  }
}

export async function fetchSuppliers() {
  try {
    const result = await query(/* SQL query */);
    // Дополнительная обработка результата
    return result.rows;
  } catch (error) {
    console.error('Ошибка при получении поставщиков:', error);
    return [];
  }
}

export async function fetchSuppliersWithMaterials() {
  try {
    const result = await query(/* SQL query */);
    // Дополнительная обработка результата
    return result.rows;
  } catch (error) {
    console.error('Ошибка при получении поставщиков с материалами:', error);
    return [];
  }
}
