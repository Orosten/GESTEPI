// src/pages/ControleList.tsx
import React, { useState, useEffect } from 'react';

const ControleList = () => {
  const [controles, setControles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchControles = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/controles');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data = await response.json();
        setControles(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement:', error);
        setError('Impossible de charger les contrôles');
        setLoading(false);
      }
    };

    fetchControles();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;

  return (
    <div>
      <h1 className="page-title">Liste des contrôles</h1>
      
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>EPI ID</th>
            <th>Gestionnaire</th>
            <th>Statut</th>
            <th>Remarques</th>
          </tr>
        </thead>
        <tbody>
          {controles.length > 0 ? (
            controles.map((controle) => (
              <tr key={controle.id}>
                <td>{formatDate(controle.date)}</td>
                <td>{controle.epiId}</td>
                <td>{controle.gestionnaire}</td>
                <td>{controle.statut}</td>
                <td>{controle.remarques || '-'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>
                Aucun contrôle trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ControleList;