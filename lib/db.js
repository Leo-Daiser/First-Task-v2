import { Pool } from 'pg';
require('dotenv').config();

let pool;

if (typeof window === 'undefined') {
  
  pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });
}

export async function query(text, params) {
  const client = await pool.connect();
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
    const result = await query(`
      SELECT suppliers.id, suppliers.name, suppliers.type, suppliers.phone, suppliers.address,
             materials.id AS material_id, materials.name AS material_name, materials.unit_of_measurement,
             supplier_materials.quantity
      FROM suppliers
      LEFT JOIN supplier_materials ON suppliers.id = supplier_materials.supplier_id
      LEFT JOIN materials ON supplier_materials.material_id = materials.id
    `);

    if (result.rows.length === 0) {
      return [];
    }

    const suppliers = [];
    let currentSupplier = null;

    result.rows.forEach((row) => {
      if (!currentSupplier || currentSupplier.id !== row.id) {
        currentSupplier = {
          id: row.id,
          name: row.name,
          type: row.type,
          phone: row.phone,
          address: row.address,
          materials: [],
        };
        suppliers.push(currentSupplier);
      }

      if (row.material_id) {
        currentSupplier.materials.push({
          id: row.material_id,
          name: row.material_name,
          unit_of_measurement: row.unit_of_measurement,
          quantity: row.quantity,
        });
      }
    });

    return suppliers;
  } catch (error) {
    console.error('Ошибка при получении поставщиков:', error);
    return [];
  }
}

export async function fetchSuppliersWithMaterials() {
  try {
    const result = await query(`
      SELECT 
        suppliers.id, 
        suppliers.name, 
        suppliers.type, 
        suppliers.phone, 
        suppliers.address,
        supplier_materials.material_id, 
        supplier_materials.quantity,
        materials.name AS material_name,
        materials.unit_of_measurement
      FROM suppliers
      LEFT JOIN supplier_materials ON suppliers.id = supplier_materials.supplier_id
      LEFT JOIN materials ON supplier_materials.material_id = materials.id
    `);

    if (result.rows.length === 0) {
      return [];
    }

    const suppliers = [];
    let currentSupplier = null;

    result.rows.forEach((row) => {
      if (!currentSupplier || currentSupplier.id !== row.id) {
        currentSupplier = {
          id: row.id,
          name: row.name,
          type: row.type,
          phone: row.phone,
          address: row.address,
          materials: [],
        };
        suppliers.push(currentSupplier);
      }

      if (row.material_id) {
        currentSupplier.materials.push({
          id: row.material_id,
          name: row.material_name,
          unit_of_measurement: row.unit_of_measurement,
          quantity: row.quantity,
        });
      }
    });

    return suppliers;
  } catch (error) {
    console.error('Ошибка при получении поставщиков с материалами:', error);
    return [];
  }
}