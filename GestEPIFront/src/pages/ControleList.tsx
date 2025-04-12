// src/pages/ControleList.tsx
import React, { useState, useEffect } from 'react';
import { Control, ControlStatus } from 'gestepiinterfaces-gabriel';

interface ControleResponse extends Control {
  // Ajout de champs supplémentaires qui pourraient être renvoyés par l'API
  identifiantPersonnalise?: string;
  marque?: string;
  modele?: string;
}

const ControleList = () => {
  const [controles, setControles] = useState<ControleResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error: any) {
        console.error('Erreur de chargement:', error);
        setError('Impossible de charger les contrôles');
        setLoading(false);
      }
    };

    fetchControles();
  }, []);

  const formatDate = (dateString: string | Date | undefined): string => {
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
                <td>{formatDate(controle.dateControl)}</td>
                <td>{controle.epiId}</td>
                <td>{controle.gestionnaire}</td>
                <td>{controle.status}</td>
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