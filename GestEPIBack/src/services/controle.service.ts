
import pool from '../config/database';

export default {
  // Récupérer tous les contrôles
  async getAllControles() {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(`
        SELECT c.*, e.identifiantPersonnalise, e.marque, e.modele 
        FROM controles c
        JOIN epis e ON c.epiId = e.id
        ORDER BY c.date DESC
      `);
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Récupérer un contrôle par son ID
  async getControleById(id: number) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(`
        SELECT c.*, e.identifiantPersonnalise, e.marque, e.modele
        FROM controles c
        JOIN epis e ON c.epiId = e.id
        WHERE c.id = ?
      `, [id]);
      return rows[0] || null;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Récupérer les contrôles d'un EPI
  async getControlesByEPI(epiId: number) {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query(
        'SELECT * FROM controles WHERE epiId = ? ORDER BY date DESC',
        [epiId]
      );
      return rows;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Créer un nouveau contrôle
  async createControle(controle: any) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        `INSERT INTO controles 
         (epiId, date, gestionnaire, statut, remarques) 
         VALUES (?, ?, ?, ?, ?)`,
        [
          controle.epiId,
          controle.date,
          controle.gestionnaire,
          controle.statut,
          controle.remarques
        ]
      );
      
      const insertId = result.insertId;
      return { id: insertId, ...controle };
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  },

  // Mettre à jour un contrôle
  async updateControle(id: number, controle: any) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query(
        `UPDATE controles SET 
         epiId = ?, 
         date = ?, 
         gestionnaire = ?, 
         statut = ?, 
         remarques = ? 
         WHERE id = ?`,
        [
          controle.epiId,
          controle.date,
          controle.gestionnaire,
          controle.statut,
          controle.remarques,
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

  // Supprimer un contrôle
  async deleteControle(id: number) {
    let conn;
    try {
      conn = await pool.getConnection();
      const result = await conn.query('DELETE FROM controles WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    } finally {
      if (conn) conn.release();
    }
  }
};