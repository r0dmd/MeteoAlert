import { getWeatherDataModel } from '../../models/weather/index.js';

import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
//Controlador para obtener datos meteorológicos de Open-Meteo
const getWeatherDataController = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            generateErrorUtil(
                'Se requieren las coordenadas de la ubicación',
                400,
            );
        }

        const weatherData = await getWeatherDataModel(latitude, longitude);

        res.send({
            status: 'ok',
            data: weatherData,
        });
    } catch (err) {
        next(err);
    }
};

export default getWeatherDataController;
