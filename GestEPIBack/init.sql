-- scripts/init-db.sql
CREATE DATABASE IF NOT EXISTS gestepi;

USE gestepi;

-- Table des EPIs
CREATE TABLE IF NOT EXISTS epis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  identifiantPersonnalise VARCHAR(50) NOT NULL UNIQUE,
  type VARCHAR(50) NOT NULL,
  marque VARCHAR(100) NOT NULL,
  modele VARCHAR(100) NOT NULL,
  numeroSerie VARCHAR(100) NOT NULL,
  taille VARCHAR(50),
  couleur VARCHAR(50),
  dateAchat DATE NOT NULL,
  dateFabrication DATE NOT NULL,
  dateMiseEnService DATE NOT NULL,
  periodiciteControle INT NOT NULL DEFAULT 365,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des contrôles
CREATE TABLE IF NOT EXISTS controles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  epiId INT NOT NULL,
  date DATE NOT NULL,
  gestionnaire VARCHAR(100) NOT NULL,
  statut VARCHAR(50) NOT NULL,
  remarques TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (epiId) REFERENCES epis(id) ON DELETE CASCADE
);

-- insert initial

INSERT INTO epis (
  identifiantPersonnalise,
  type,
  marque,
  modele,
  numeroSerie,
  taille,
  couleur,
  dateAchat,
  dateFabrication,
  dateMiseEnService,
  periodiciteControle
) VALUES (
  'CORDE-001',
  'CORDE',
  'Petzl',
  'Volta 9.2mm',
  'PT2023456789',
  '70m',
  'Bleu',
  '2023-01-15',
  '2022-11-20',
  '2023-02-01',
  365
);