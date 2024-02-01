
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { updateMaterial, query } from '../../lib/db';

const MaterialEdit = ({ material }) => {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState(material.name);
  const [unit, setUnit] = useState(material.unit_of_measurement);

  useEffect(() => {
    setName(material.name);
    setUnit(material.unit_of_measurement);
  }, [material]);

  const handleUpdateMaterial = async () => {
    try {
      await updateMaterial(id, name, unit);
      router.push('/materials');
    } catch (error) {
      console.error('Ошибка при обновлении материала:', error);
    }
  };

  return (
    <Layout>
      <div>
        <h1>Edit Material</h1>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <label>Unit of Measurement:</label>
        <input type="text" value={unit} onChange={(e) => setUnit(e.target.value)} />
        <button onClick={handleUpdateMaterial}>Update Material</button>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const result = await query('SELECT * FROM materials WHERE id = $1', [params.id]);
    const material = result.rows[0];

    return {
      props: { material },
    };
  } catch (error) {
    console.error('Ошибка при получении материала:', error);
    return {
      props: { material: {} },
    };
  }
}

export default MaterialEdit;
