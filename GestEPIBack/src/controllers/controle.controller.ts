
import { Request, Response } from 'express';
import controleService from '../services/controle.service';

export default {
  // Récupérer tous les contrôles
  async getAllControles(req: Request, res: Response) {
    try {
      const controles = await controleService.getAllControles();
      res.status(200).json(controles);
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Récupérer un contrôle par son ID
  async getControleById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const controle = await controleService.getControleById(Number(id));
      
      if (!controle) {
        return res.status(404).json({ message: 'Contrôle non trouvé' });
      }
      
      res.status(200).json(controle);
    } catch (error) {
      console.error('Erreur lors de la récupération du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Récupérer les contrôles d'un EPI
  async getControlesByEPI(req: Request, res: Response) {
    try {
      const { epiId } = req.params;
      const controles = await controleService.getControlesByEPI(Number(epiId));
      
      res.status(200).json(controles);
    } catch (error) {
      console.error('Erreur lors de la récupération des contrôles de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Créer un nouveau contrôle
  async createControle(req: Request, res: Response) {
    try {
      const controle = await controleService.createControle(req.body);
      res.status(201).json(controle);
    } catch (error) {
      console.error('Erreur lors de la création du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Mettre à jour un contrôle
  async updateControle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await controleService.updateControle(Number(id), req.body);
      
      if (!updated) {
        return res.status(404).json({ message: 'Contrôle non trouvé' });
      }
      
      const updatedControle = await controleService.getControleById(Number(id));
      res.status(200).json(updatedControle);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Supprimer un contrôle
  async deleteControle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await controleService.deleteControle(Number(id));
      
      if (!deleted) {
        return res.status(404).json({ message: 'Contrôle non trouvé' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Erreur lors de la suppression du contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  async getControlAlertes(req: Request, res: Response) {
    try {
      const alertes = await controleService.getControlAlertes();
      res.status(200).json(alertes);
    } catch (error) {
      console.error('Erreur lors de la récupération des alertes de contrôle:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }

};