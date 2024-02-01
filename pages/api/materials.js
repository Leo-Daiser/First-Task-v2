const BASE_URL = 'http://localhost:3001/api';  
import { getAllMaterials } from '../../backend/api';

export async function getServerSideProps() {
  try {
    const materials = await getAllMaterials();
    return {
      props: { materials },
    };
  } catch (error) {
    console.error('Error fetching materials:', error);
    return {
      props: { materials: [] },
    };
  }
}

export const getAllMaterials = async () => {
  try {
    const response = await fetch(`${BASE_URL}/materials`);
    const materials = await response.json();
    return materials;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
export default function MaterialsPage({ materials }) {
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
}
