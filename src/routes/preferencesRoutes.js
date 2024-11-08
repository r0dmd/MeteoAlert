// routes/preferencesRoutes.js
import express from 'express';
import {
    addPreferenceController,
    getPreferencesController,
    updatePreferenceController,
    deletePreferenceController,
} from '../controllers/preferences/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar las preferencias de alerta de un usuario
router.post('/new', addPreferenceController);

// Ruta para obtener las preferencias de alertas de un usuario
router.get('/:userId', getPreferencesController);

// Ruta para actualizar las preferencias de alerta de un usuario
router.put('/:preferenceId', updatePreferenceController);

// Ruta para eliminar las preferencias de alerta de un usuario
router.delete('/:preferenceId/delete', deletePreferenceController);

export default router;
