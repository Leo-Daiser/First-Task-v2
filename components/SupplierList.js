
import React, { useState, useEffect } from 'react';
import { getAllSuppliers, addNewSupplier, updateSupplier, deleteSupplier } from '../backend/api';

const SuppliersList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllSuppliers();
        setSuppliers(data);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
      }
    };

    fetchData();
  }, []);

  const handleAddSupplier = async () => {
    const newSupplier = {
      name: 'Новый поставщик',
      type: 'Тип 3',
      phone: '111-222-3333',
      address: 'Новый адрес',
    };

    try {
      const addedSupplier = await addNewSupplier(newSupplier);
      setSuppliers((prevSuppliers) => [...prevSuppliers, addedSupplier]);
    } catch (error) {
      console.error('Error adding new supplier:', error);
    }
  };

  const handleUpdateSupplier = async (supplierId) => {
    const updatedSupplier = {
      name: 'Обновленный поставщик',
      type: 'Тип 4',
      phone: '444-555-6666',
      address: 'Обновленный адрес',
    };

    try {
      const updatedSupplier = await updateSupplier(supplierId, updatedSupplier);
      setSuppliers((prevSuppliers) =>
        prevSuppliers.map((supplier) => (supplier.id === supplierId ? updatedSupplier : supplier))
      );
    } catch (error) {
      console.error('Error updating supplier:', error);
    }
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      const result = await deleteSupplier(supplierId);
      if (result.success) {
        setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== supplierId));
      }
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  return (
    <div>
      <h2>Suppliers List</h2>
      <ul>
        {suppliers.map((supplier) => (
          <li key={supplier.id}>
            {supplier.name} - {supplier.type}
            <button onClick={() => handleUpdateSupplier(supplier.id)}>Update</button>
            <button onClick={() => handleDeleteSupplier(supplier.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddSupplier}>Add New Supplier</button>
    </div>
  );
};

export default SuppliersList;
