// pages/suppliers.js

import { fetchSuppliers } from '../lib/db';

export const getServerSideProps = async () => {
  try {
    const suppliers = await fetchSuppliers();
    return {
      props: {
        suppliers,
      },
    };
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    return {
      props: {
        suppliers: [],
      },
    };
  }
};

const SuppliersPage = ({ suppliers }) => {
  return (
    <div>
      <h1>Suppliers</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Materials</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.id}>
              <td>{index + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.type}</td>
              <td>{supplier.phone}</td>
              <td>{supplier.address}</td>
              <td>
                <ul>
                  {supplier.materials.map((material) => (
                    <li key={material.id}>{material.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SuppliersPage;
