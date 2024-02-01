// Удалите следующий импорт
// import { getAllMaterials } from '../backend/api';

const MaterialsList = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Заменяем вызов бекенд функции на мокап данных (замените на реальные данные при необходимости)
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
      <h2>Materials List</h2>
      <ul>
        {materials.map((material) => (
          <li key={material.id}>
            {material.name} - {material.unit_of_measurement}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaterialsList;
