// src/pages/EPIList.tsx
import React, { useState, useEffect } from 'react';

const EPIList = () => {
  const [epis, setEpis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour récupérer les données
    const fetchEPIs = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/epis');
        if (!response.ok) {
          throw new Error('Erreur réseau');
        }
        const data = await response.json();
        setEpis(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur de chargement:', error);
        setError('Impossible de charger les EPIs');
        setLoading(false);
      }
    };

    fetchEPIs();
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
      <h1 className="page-title">Liste des EPIs</h1>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Identifiant</th>
            <th>Type</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Date d'achat</th>
          </tr>
        </thead>
        <tbody>
          {epis.length > 0 ? (
            epis.map((epi) => (
              <tr key={epi.id}>
                <td>{epi.id}</td>
                <td>{epi.identifiantPersonnalise}</td>a
                <td>{epi.type}</td>
                <td>{epi.marque}</td>
                <td>{epi.modele}</td>
                <td>{formatDate(epi.dateAchat)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center' }}>
                Aucun EPI trouvé
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EPIList;