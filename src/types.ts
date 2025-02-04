// Types d'EPI
export enum EPIType {
    CORDE = 'CORDE',
    SANGLE = 'SANGLE',
    LONGE = 'LONGE',
    BAUDRIER = 'BAUDRIER',
    CASQUE = 'CASQUE',
    MOUSQUETON = 'MOUSQUETON',
    SYSTEME_ASSURAGE = 'SYSTEME_ASSURAGE'
  }
  
  // Statut possible après un contrôle
  export enum ControlStatus {
    OPERATIONNEL = 'OPERATIONNEL',
    A_REPARER = 'A_REPARER',
    MIS_AU_REBUT = 'MIS_AU_REBUT'
  }
  
  // Interface pour un EPI
  export interface EPI {
    id?: number;
    identifiant: string;  // Identifiant unique personnalisé
    type: EPIType;
    marque: string;
    modele: string;
    numeroSerie: string;
    dateAchat: Date;
    dateFabrication: Date;
    dateMiseEnService: Date;
    periodiciteMois: number;  // Périodicité de contrôle en mois
    taille?: string;  // Optionnel, pour baudriers
    couleur?: string;  // Optionnel, pour cordes et baudriers
    estTextile: boolean;  // Pour la règle des 10 ans
  }
  
  // Interface pour un contrôle
  export interface Control {
    id?: number;
    epiId: number;
    dateControl: Date;
    gestionnaire: string;  // Nom du gestionnaire effectuant le contrôle
    status: ControlStatus;
    remarques?: string;
  }
  
  // Interface pour un EPI avec son historique de contrôles
  export interface EPIWithControls extends EPI {
    controls: Control[];
  }
  
  // Interface pour les alertes de contrôle
  export interface ControlAlert {
    epiId: number;
    identifiant: string;
    dateProchainControl: Date;
    joursRestants: number;
  }