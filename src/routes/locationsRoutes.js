// routes/locationsRoutes.js
import express from 'express';
import {
    addLocationController,
    getLocationController,
    updateLocationController,
    deleteLocationController,
} from '../controllers/locations/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar una nueva ubicación
router.post('/new', addLocationController);

// Ruta para obtener los datos de una ubicación específica
router.get('/:locationId', getLocationController);

// Ruta para actualizar los datos de una ubicación
router.put('/:locationId/update', updateLocationController);

// Ruta para eliminar una ubicación
router.delete('/:locationId/delete', deleteLocationController);

export default router;
