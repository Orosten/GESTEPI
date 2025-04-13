import React, { useState, useEffect } from 'react';

// Interface pour typer les EPIs
interface EPIData {
  id: number;
  identifiantPersonnalise: string;
  type: string;
  marque: string;
  modele: string;
  numeroSerie: string;
  dateAchat: string;
  taille?: string;
  couleur?: string;
  dateFabrication?: string;
  dateMiseEnService?: string;
  periodiciteControle?: number;
}

const EPIList: React.FC = () => {
  const [epis, setEpis] = useState<EPIData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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

  const formatDate = (dateString: string): string => {
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
                <td>{epi.identifiantPersonnalise}</td>
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