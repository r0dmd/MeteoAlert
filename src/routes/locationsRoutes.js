// routes/locationsRoutes.js
import express from 'express';
import {
    addLocationController,
    getLocationController,
    updateLocationController,
    deleteLocationController,
} from '../controllers/locations/index.js';

import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar una nueva ubicación
router.post('/new', authUserMiddleware, addLocationController);

// Ruta para obtener los datos de una ubicación específica
router.get('/:locationId', authUserMiddleware, getLocationController);

// Ruta para actualizar los datos de una ubicación
router.put('/:locationId/update', authUserMiddleware, updateLocationController);

// Ruta para eliminar una ubicación
router.delete(
    '/:locationId/delete',
    authUserMiddleware,
    deleteLocationController,
);

export default router;
