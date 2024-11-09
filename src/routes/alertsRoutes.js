// routes/alertsRoutes.js
import express from 'express';
import {
    addAlertController,
    getAlertController,
    updateAlertController,
    deleteAlertController,
} from '../controllers/alerts/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar una nueva alerta meteorológica
router.post('/new', addAlertController);

// Ruta para obtener los detalles de una alerta meteorológica específica
router.get('/:alertId', getAlertController);

// Ruta para actualizar una alerta meteorológica
router.put('/:alertId/update', updateAlertController);

// Ruta para eliminar una alerta meteorológica
router.delete('/:alertId/delete', deleteAlertController);

export default router;
