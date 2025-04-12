// src/pages/AjouterControle.tsx
import React, { useState, useEffect } from 'react';
import { ControlStatus } from 'gestepiinterfaces-gabriel';

interface EPI {
  id: number;
  identifiantPersonnalise: string;
  type: string;
  marque: string;
  modele: string;
}

interface AjouterControleProps {
  epiId: number;
  onSaved: () => void;
  onCancel: () => void;
}

const AjouterControle: React.FC<AjouterControleProps> = ({ epiId, onSaved, onCancel }) => {
  const [epi, setEpi] = useState<EPI | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    gestionnaire: '',
    statut: 'OPERATIONNEL',
    remarques: ''
  });

  useEffect(() => {
    const fetchEPI = async () => {
      try {
        const response = await fetch(`http://localhost:5500/api/epis/${epiId}`);
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération de l\'EPI');
        }
        const data = await response.json();
        setEpi(data);
        setLoading(false);
      } catch (err) {
        console.error('Erreur de chargement:', err);
        setError('Impossible de charger les données de l\'EPI');
        setLoading(false);
      }
    };

    fetchEPI();
  }, [epiId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const response = await fetch('http://localhost:5500/api/controles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          epiId,
          date: formData.date,
          gestionnaire: formData.gestionnaire,
          statut: formData.statut,
          remarques: formData.remarques || null
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement du contrôle');
      }

      onSaved();
    } catch (err) {
      console.error('Erreur:', err);
      setError('Erreur lors de l\'enregistrement du contrôle');
      setSaving(false);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!epi) return <div>EPI non trouvé</div>;

  return (
    <div className="ajouter-controle">
      <h1>Nouveau contrôle pour EPI #{epi.identifiantPersonnalise}</h1>
      <div className="epi-summary">
        <p>
          <strong>Type:</strong> {epi.type} | 
          <strong>Marque:</strong> {epi.marque} | 
          <strong>Modèle:</strong> {epi.modele}
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">Date du contrôle</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="gestionnaire">Gestionnaire</label>
          <input
            type="text"
            id="gestionnaire"
            name="gestionnaire"
            value={formData.gestionnaire}
            onChange={handleChange}
            required
            placeholder="Nom du gestionnaire effectuant le contrôle"
          />
        </div>

        <div className="form-group">
          <label htmlFor="statut">Statut après contrôle</label>
          <select
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            required
          >
            <option value="OPERATIONNEL">Opérationnel</option>
            <option value="A_REPARER">À réparer</option>
            <option value="MIS_AU_REBUT">Mis au rebut</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="remarques">Remarques</label>
          <textarea
            id="remarques"
            name="remarques"
            value={formData.remarques}
            onChange={handleChange}
            rows={4}
            placeholder="Observations, défauts constatés, réparations nécessaires..."
          />
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Enregistrement...' : 'Enregistrer le contrôle'}
          </button>
          <button type="button" onClick={onCancel} disabled={saving}>
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
};

export default AjouterControle;