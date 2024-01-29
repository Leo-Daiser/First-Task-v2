import React from 'react';
import { Link } from 'react-router-dom';

const SupplierList = ({ suppliers }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Номер</th>
          <th>Название</th>
          <th>Тип</th>
          <th>Телефон</th>
          <th>Адрес</th>
          <th>Материалы</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {suppliers.map((supplier) => (
          <tr key={supplier.id}>
            <td>{supplier.id}</td>
            <td>{supplier.name}</td>
            <td>{supplier.type}</td>
            <td>{supplier.phone}</td>
            <td>{supplier.address}</td>
            <td>
              <ul>
                {supplier.materials.map((material) => (
                  <li key={material.id}>{`${material.name} (${material.quantity} ${material.unit})`}</li>
                ))}
              </ul>
            </td>
            <td>
              <Link to={`/supplier/edit/${supplier.id}`}>Редактировать</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SupplierList;
