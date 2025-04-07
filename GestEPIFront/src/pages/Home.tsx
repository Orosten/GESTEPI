// src/pages/Home.tsx
import React from 'react';

const Home = ({ setCurrentPage }) => {
  return (
    <div>
      <h1 className="page-title">Gestion des Équipements de Protection Individuelle</h1>
      <p>Bienvenue dans l'application de suivi et de contrôle des EPI pour la sécurité des cordistes.</p>
      
      <div className="card-container">
        <div className="card">
          <h2>EPIs</h2>
          <p>Gérer les équipements de protection individuelle utilisés par les cordistes.</p>
          <button onClick={() => setCurrentPage('epis')}>Voir les EPIs</button>
        </div>
        
        <div className="card">
          <h2>Contrôles</h2>
          <p>Suivre les contrôles réalisés sur les équipements de protection.</p>
          <button onClick={() => setCurrentPage('controles')}>Voir les contrôles</button>
        </div>
      </div>
    </div>
  );
};

export default Home;