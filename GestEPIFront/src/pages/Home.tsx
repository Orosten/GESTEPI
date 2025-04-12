import React, { useState, useEffect } from 'react';

interface ControlAlert {
  epiId: number;
  identifiant: string;
  type: string;
  marque: string;
  modele: string;
  dateProchainControl: string;
  joursRestants: number;
}

interface HomeProps {
  onNavigate: (page: string, id: number | null) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [alertes, setAlertes] = useState<ControlAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertes = async () => {
      try {
        const response = await fetch('http://localhost:5500/api/controles/alertes');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des alertes');
        }
        const data = await response.json();
        setAlertes(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Impossible de charger les alertes');
        setLoading(false);
      }
    };

    fetchAlertes();
  }, []);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div>
      <h1 className="page-title">Gestion des Équipements de Protection Individuelle</h1>
      <p>Bienvenue dans l'application de suivi et de contrôle des EPI pour la sécurité des cordistes.</p>
      
      <div className="card-container">
        <div className="card">
          <h2>EPIs</h2>
          <p>Gérer les équipements de protection individuelle utilisés par les cordistes.</p>
          <button onClick={() => onNavigate('epis', null)}>Voir les EPIs</button>
        </div>
        
        <div className="card">
          <h2>Contrôles</h2>
          <p>Suivre les contrôles réalisés sur les équipements de protection.</p>
          <button onClick={() => onNavigate('controles', null)}>Voir les contrôles</button>
        </div>
      </div>

      <div className="alerts-section">
        <h2>Contrôles à prévoir</h2>
        {loading ? (
          <p>Chargement des alertes...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : alertes.length > 0 ? (
          <table className="alerts-table">
            <thead>
              <tr>
                <th>Identifiant</th>
                <th>Type</th>
                <th>Marque/Modèle</th>
                <th>Date prochain contrôle</th>
                <th>Jours restants</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {alertes.map((alerte) => (
                <tr 
                  key={alerte.epiId} 
                  className={alerte.joursRestants <= 0 ? 'alert-urgent' : 
                           alerte.joursRestants <= 15 ? 'alert-warning' : ''}
                >
                  <td>{alerte.identifiant}</td>
                  <td>{alerte.type}</td>
                  <td>{alerte.marque} {alerte.modele}</td>
                  <td>{formatDate(alerte.dateProchainControl)}</td>
                  <td>{alerte.joursRestants <= 0 ? 'En retard' : `${alerte.joursRestants} jours`}</td>
                  <td>
                    <button onClick={() => onNavigate('epi-details', alerte.epiId)}>
                      Voir l'EPI
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun contrôle à prévoir dans les 45 prochains jours.</p>
        )}
      </div>
    </div>
  );
};

export default Home;