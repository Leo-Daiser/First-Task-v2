// Файл: MaterialsPage.js

import React, { useState, useEffect } from 'react';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Мокап данных (замените на реальные данные при необходимости)
        const mockData = [
          { id: 1, name: 'Material 1', unit_of_measurement: 'Unit 1' },
          { id: 2, name: 'Material 2', unit_of_measurement: 'Unit 2' },
          // ... другие данные
        ];

        setMaterials(mockData);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error fetching materials: {error.message}</div>;
  }

  return (
    <div>
      <h1>Materials</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Unit of Measurement</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id}>
              <td>{material.id}</td>
              <td>{material.name}</td>
              <td>{material.unit_of_measurement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialsPage;
