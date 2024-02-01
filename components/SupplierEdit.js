import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { query, updateSupplier } from '../../lib/db';

const SupplierEdit = ({ supplier }) => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState(supplier.name);
  const [type, setType] = useState(supplier.type);
  const [phone, setPhone] = useState(supplier.phone);
  const [address, setAddress] = useState(supplier.address);

  useEffect(() => {
    setName(supplier.name);
    setType(supplier.type);
    setPhone(supplier.phone);
    setAddress(supplier.address);
  }, [supplier]);

  const handleUpdateSupplier = async () => {
    try {
      await updateSupplier(id, name, type, phone, address);
      router.push('/suppliers');
    } catch (error) {
      console.error('Ошибка при обновлении поставщика:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Edit Supplier</h1>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Type:</label>
        <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
        <label>Phone:</label>
        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label>Address:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        <button onClick={handleUpdateSupplier}>Update Supplier</button>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const result = await query('SELECT * FROM suppliers WHERE id = $1', [params.id]);
    const supplier = result.rows[0];

    return {
      props: { supplier },
    };
  } catch (error) {
    console.error('Ошибка при получении поставщика:', error);
    return {
      props: { supplier: {} },
    };
  }
}

export default SupplierEdit;
