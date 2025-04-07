export declare enum EPIType {
    CORDE = "CORDE",
    SANGLE = "SANGLE",
    LONGE = "LONGE",
    BAUDRIER = "BAUDRIER",
    CASQUE = "CASQUE",
    MOUSQUETON = "MOUSQUETON",
    SYSTEME_ASSURAGE = "SYSTEME_ASSURAGE"
}
export declare enum ControlStatus {
    OPERATIONNEL = "OPERATIONNEL",
    A_REPARER = "A_REPARER",
    MIS_AU_REBUT = "MIS_AU_REBUT"
}
export interface EPI {
    id?: number;
    identifiant: string;
    type: EPIType;
    marque: string;
    modele: string;
    numeroSerie: string;
    dateAchat: Date;
    dateFabrication: Date;
    dateMiseEnService: Date;
    periodiciteMois: number;
    taille?: string;
    couleur?: string;
    estTextile: boolean;
}
export interface Control {
    id?: number;
    epiId: number;
    dateControl: Date;
    gestionnaire: string;
    status: ControlStatus;
    remarques?: string;
}
export interface EPIWithControls extends EPI {
    controls: Control[];
}
export interface ControlAlert {
    epiId: number;
    identifiant: string;
    dateProchainControl: Date;
    joursRestants: number;
}
