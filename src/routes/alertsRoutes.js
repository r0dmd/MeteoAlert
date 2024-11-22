// routes/alertsRoutes.js
import express from 'express';
import {
    addAlertController,
    getAlertsController,
    deleteAlertController,
} from '../controllers/alerts/index.js';
import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar una nueva alerta meteorológica
router.post('/new', authUserMiddleware, addAlertController);

// Ruta para obtener los detalles de una alerta meteorológica específica
router.get('/', authUserMiddleware, getAlertsController);

// Ruta para eliminar una alerta meteorológica
router.delete('/:alertId/delete', authUserMiddleware, deleteAlertController);

export default router;
