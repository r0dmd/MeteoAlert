import express from 'express';

import { getWeatherDataController } from '../controllers/weather/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para obtener datos meteorológicos
router.get('/data', getWeatherDataController);

export default router;
