import React, { useState, useEffect } from 'react';

// Interface pour typer les contrôles
interface ControleData {
  id: number;
  epiId: number;
  date: string;
  gestionnaire: string;
  statut: string;
  remarques: string | null;
}

const ControleList: React.FC = () => {
  const [controles, setControles] = useState<ControleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  const formatDate = (dateString: string): string => {
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