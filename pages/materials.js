// pages/materials.js
import React, { useState, useEffect } from 'react';
import { getAllMaterials } from '../backend/api';

const MaterialsPage = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllMaterials();
        setMaterials(data);
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
