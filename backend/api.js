// Файл: api.js

const BASE_URL = 'http://localhost:3001/api';

export const getAllMaterials = async () => {
  try {
    const response = await fetch(`${BASE_URL}/materials`);
    
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${errorMessage}`);
    }

    return response.json();
  } catch (error) {
    console.error('API Err:', error);
    throw error;
  }
};


export const addNewMaterial = (newMaterial) => {
  return fetch(`${BASE_URL}/materials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newMaterial),
  })
    .then(handleResponse)
    .catch(error => {
      console.error('API Erro:', error);
      throw error;
    });
};

export const updateMaterial = (materialId, updatedMaterial) => {
  return fetch(`${BASE_URL}/materials/${materialId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedMaterial),
  })
    .then(handleResponse)
    .catch(error => {
      console.error('API Errorr:', error);
      throw error;
    });
};

export const deleteMaterial = (materialId) => {
  return fetch(`${BASE_URL}/materials/${materialId}`, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .catch(error => {
      console.error('API Errorrr:', error);
      throw error;
    });
};

// Функция обработки ответа
const handleResponse = async (response) => {
  try {
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`API Error: ${errorMessage}`);
    }
    return response.json();
  } catch (error) {
    console.error('API Errorrrr:', error); // Логируйте ошибку для отладки
    throw error; // Пробросьте ошибку дальше
  }
};

