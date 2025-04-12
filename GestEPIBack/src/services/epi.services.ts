
import pool from '../config/database';

export default {
  // Récupérer tous les EPIs
  async getAllEPIs() {
    let conn;
    try {
      conn = await pool.getConnection();
      console.log(pool)
      const rows = await conn.query('SELECT * FROM epis');
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Récupérer un EPI par son ID
  async getEPIById(id: number) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query('SELECT * FROM epis WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Créer un nouvel EPI
  async createEPI(epi: any) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        `INSERT INTO epis 
         (identifiantPersonnalise, type, marque, modele, numeroSerie, 
          taille, couleur, dateAchat, dateFabrication, dateMiseEnService, periodiciteControle) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          epi.identifiantPersonnalise,
          epi.type,
          epi.marque,
          epi.modele,
          epi.numeroSerie,
          epi.taille,
          epi.couleur,
          epi.dateAchat,
          epi.dateFabrication,
          epi.dateMiseEnService,
          epi.periodiciteControle || 365
        ]
      );
      
      const insertId = result.insertId;
      return { id: insertId, ...epi };
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Mettre à jour un EPI
  async updateEPI(id: number, epi: any) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        `UPDATE epis SET 
         identifiantPersonnalise = ?, 
         type = ?, 
         marque = ?, 
         modele = ?, 
         numeroSerie = ?, 
         taille = ?, 
         couleur = ?, 
         dateAchat = ?, 
         dateFabrication = ?, 
         dateMiseEnService = ?, 
         periodiciteControle = ? 
         WHERE id = ?`,
        [
          epi.identifiantPersonnalise,
          epi.type,
          epi.marque,
          epi.modele,
          epi.numeroSerie,
          epi.taille,
          epi.couleur,
          epi.dateAchat,
          epi.dateFabrication,
          epi.dateMiseEnService,
          epi.periodiciteControle,
          id
        ]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Supprimer un EPI
  async deleteEPI(id: number) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query('DELETE FROM epis WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
};