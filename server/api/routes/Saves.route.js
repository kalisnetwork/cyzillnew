import { Router } from 'express';
import * as savesController from '../controllers/SavesController.js';

const router = Router();

router.get('/saves', savesController.getAllSaves);
router.post('/saves', savesController.createSave);
router.delete('/saves/:id', savesController.deleteSave);

export default router;
