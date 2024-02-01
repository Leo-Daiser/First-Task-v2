// pages/index.js
import React from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  const navigateToSuppliers = () => {
    router.push('/suppliers');
  };

  const navigateToMaterials = () => {
    router.push('/materials');
  };

  return (
    <div className="container">
      <h1 className="title">База данных поставщиков</h1>

      <div className="columns">
        <div className="column">
          <button className="button is-primary" onClick={navigateToSuppliers}>
            Поставщики
          </button>
        </div>
        <div className="column">
          <button className="button is-info" onClick={navigateToMaterials}>
            Виды материалов
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
