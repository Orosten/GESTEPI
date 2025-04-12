// src/routes/index.ts
import { Router } from 'express';
import epiController from '../controllers/epi.controller';
import controleController from '../controllers/controle.controller';

const router = Router();

// Routes pour les EPIs
router.get('/epis', epiController.getAllEPIs);
router.get('/epis/:id', epiController.getEPIById);
router.post('/epis', epiController.createEPI);
router.put('/epis/:id', epiController.updateEPI);
router.delete('/epis/:id', epiController.deleteEPI);

// Routes pour les contrôles
router.get('/controles', controleController.getAllControles);
router.get('/controles/:id', controleController.getControleById);
router.get('/epis/:epiId/controles', controleController.getControlesByEPI);
router.post('/controles', controleController.createControle);
router.put('/controles/:id', controleController.updateControle);
router.delete('/controles/:id', controleController.deleteControle);
router.get('/controles/alertes', controleController.getControlAlertes);

export default router;