// routes/preferencesRoutes.js
import express from 'express';
import {
    addPreferenceController,
    getPreferencesController,
    updatePreferenceController,
    deletePreferenceController,
} from '../controllers/preferences/index.js';

import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar las preferencias de alerta de un usuario
router.post('/new', authUserMiddleware, addPreferenceController);

// Ruta para obtener las preferencias de alertas de un usuario
router.get('/', authUserMiddleware, getPreferencesController);

// Ruta para actualizar las preferencias de alerta de un usuario
router.put('/:preferenceId', authUserMiddleware, updatePreferenceController);

// Ruta para eliminar las preferencias de alerta de un usuario
router.delete(
    '/:preferenceId/delete',
    authUserMiddleware,
    deletePreferenceController,
);

export default router;
