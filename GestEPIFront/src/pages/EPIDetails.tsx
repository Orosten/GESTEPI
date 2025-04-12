import React, { useState, useEffect } from 'react';
import { ControlStatus } from 'gestepiinterfaces-gabriel';

interface Control {
  id: number;
  epiId: number;
  date: string;
  gestionnaire: string;
  statut: string;
  remarques: string | null;
}

interface EPI {
  id: number;
  identifiantPersonnalise: string;
  type: string;
  marque: string;
  modele: string;
  numeroSerie: string;
  taille: string | null;
  couleur: string | null;
  dateAchat: string;
  dateFabrication: string;
  dateMiseEnService: string;
  periodiciteControle: number;
}

interface EPIDetailsProps {
  epiId: number;
  onBack: () => void;
  onAddControle: () => void;
}

const EPIDetails: React.FC<EPIDetailsProps> = ({ epiId, onBack, onAddControle }) => {
  const [epi, setEpi] = useState<EPI | null>(null);
  const [controles, setControles] = useState<Control[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails de l'EPI
        const epiResponse = await fetch(`http://localhost:5500/api/epis/${epiId}`);
        if (!epiResponse.ok) {
          throw new Error('Erreur lors de la récupération des détails de l\'EPI');
        }
        const epiData = await epiResponse.json();
        setEpi(epiData);

        // Récupérer les contrôles de l'EPI
        const controlesResponse = await fetch(`http://localhost:5500/api/epis/${epiId}/controles`);
        if (!controlesResponse.ok) {
          throw new Error('Erreur lors de la récupération des contrôles');
        }
        const controlesData = await controlesResponse.json();
        setControles(controlesData);

        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Impossible de charger les données');
        setLoading(false);
      }
    };

    fetchData();
  }, [epiId]);

  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  // Calculer la date du prochain contrôle
  const getNextControlDate = () => {
    if (!epi) return '-';
    
    let baseDate: Date;
    if (controles.length > 0) {
      baseDate = new Date(controles[0].date); // On suppose que les contrôles sont triés par date décroissante
    } else {
      baseDate = new Date(epi.dateMiseEnService);
    }

    const nextDate = new Date(baseDate);
    nextDate.setDate(nextDate.getDate() + epi.periodiciteControle);
    return formatDate(nextDate.toISOString());
  };

  // Détermine si l'EPI est un textile
  const isTextile = (type: string) => {
    return ['CORDE', 'SANGLE', 'LONGE', 'BAUDRIER'].includes(type);
  };

  // Calculer la date limite d'utilisation pour les textiles (10 ans après fabrication)
  const getEndOfLifeDate = () => {
    if (!epi || !isTextile(epi.type)) return null;
    
    const fabricationDate = new Date(epi.dateFabrication);
    const endOfLifeDate = new Date(fabricationDate);
    endOfLifeDate.setFullYear(fabricationDate.getFullYear() + 10);
    return formatDate(endOfLifeDate.toISOString());
  };

  // Déterminer le statut actuel de l'EPI
  const getCurrentStatus = () => {
    if (controles.length === 0) return "Non contrôlé";
    
    // Le premier contrôle est le plus récent
    const lastControl = controles[0];
    return lastControl.statut;
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!epi) return <div>EPI non trouvé</div>;

  return (
    <div className="epi-details">
      <div className="page-header">
        <h1>Détails de l'EPI</h1>
        <button onClick={onBack}>Retour</button>
      </div>

      <div className="epi-info">
        <div className="epi-card">
          <h2>{epi.identifiantPersonnalise}</h2>
          <div className="info-grid">
            <div className="info-row">
              <span className="info-label">Type :</span>
              <span className="info-value">{epi.type}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Marque :</span>
              <span className="info-value">{epi.marque}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Modèle :</span>
              <span className="info-value">{epi.modele}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Numéro de série :</span>
              <span className="info-value">{epi.numeroSerie}</span>
            </div>
            {epi.taille && (
              <div className="info-row">
                <span className="info-label">Taille :</span>
                <span className="info-value">{epi.taille}</span>
              </div>
            )}
            {epi.couleur && (
              <div className="info-row">
                <span className="info-label">Couleur :</span>
                <span className="info-value">{epi.couleur}</span>
              </div>
            )}
            <div className="info-row">
              <span className="info-label">Date d'achat :</span>
              <span className="info-value">{formatDate(epi.dateAchat)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date de fabrication :</span>
              <span className="info-value">{formatDate(epi.dateFabrication)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Date de mise en service :</span>
              <span className="info-value">{formatDate(epi.dateMiseEnService)}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Périodicité de contrôle :</span>
              <span className="info-value">{epi.periodiciteControle} jours</span>
            </div>
            <div className="info-row">
              <span className="info-label">Statut actuel :</span>
              <span className={`info-value status-${getCurrentStatus().toLowerCase()}`}>
                {getCurrentStatus()}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Prochain contrôle :</span>
              <span className="info-value">{getNextControlDate()}</span>
            </div>
            {isTextile(epi.type) && (
              <div className="info-row">
                <span className="info-label">Date limite d'utilisation :</span>
                <span className="info-value">{getEndOfLifeDate()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="controls-section">
        <div className="section-header">
          <h2>Historique des contrôles</h2>
          <button onClick={onAddControle}>Ajouter un contrôle</button>
        </div>

        {controles.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Gestionnaire</th>
                <th>Statut</th>
                <th>Remarques</th>
              </tr>
            </thead>
            <tbody>
              {controles.map((controle) => (
                <tr key={controle.id} className={`status-${controle.statut.toLowerCase()}`}>
                  <td>{formatDate(controle.date)}</td>
                  <td>{controle.gestionnaire}</td>
                  <td>{controle.statut}</td>
                  <td>{controle.remarques || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucun contrôle n'a encore été effectué pour cet EPI.</p>
        )}
      </div>
    </div>
  );
};

export default EPIDetails;