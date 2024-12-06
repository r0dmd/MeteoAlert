import express from 'express';

import { getWeatherDataController } from '../controllers/weather/index.js';
import { authUserMiddleware } from '../middlewares/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para obtener datos meteorológicos
router.get('/data', authUserMiddleware, getWeatherDataController);

export default router;
