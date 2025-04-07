
import { Request, Response } from 'express';
import epiService from '../services/epi.services';

export default {
  // Récupérer tous les EPIs
  async getAllEPIs(req: Request, res: Response) {
    try {
      const epis = await epiService.getAllEPIs();
      res.status(200).json(epis);
    } catch (error) {
      console.error('Erreur lors de la récupération des EPIs:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Récupérer un EPI par son ID
  async getEPIById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const epi = await epiService.getEPIById(Number(id));
      
      if (!epi) {
        return res.status(404).json({ message: 'EPI non trouvé' });
      }
      
      res.status(200).json(epi);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Créer un nouvel EPI
  async createEPI(req: Request, res: Response) {
    try {
      const epi = await epiService.createEPI(req.body);
      res.status(201).json(epi);
    } catch (error) {
      console.error('Erreur lors de la création de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Mettre à jour un EPI
  async updateEPI(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await epiService.updateEPI(Number(id), req.body);
      
      if (!updated) {
        return res.status(404).json({ message: 'EPI non trouvé' });
      }
      
      const updatedEPI = await epiService.getEPIById(Number(id));
      res.status(200).json(updatedEPI);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  // Supprimer un EPI
  async deleteEPI(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await epiService.deleteEPI(Number(id));
      
      if (!deleted) {
        return res.status(404).json({ message: 'EPI non trouvé' });
      }
      
      res.status(204).send();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'EPI:', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  }
};