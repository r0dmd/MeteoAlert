import axios from 'axios';

import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
/**
 * Modelo que obtiene datos meteorológicos usando Open-Meteo API.
 * @param {number} latitude - Coordenada de latitud de la ubicación.
 * @param {number} longitude - Coordenada de longitud de la ubicación.
 * @returns {Object} - Datos meteorológicos en formato JSON.
 */
const getWeatherDataModel = async (latitude, longitude) => {
    try {
        const response = await axios.get(
            'https://api.open-meteo.com/v1/forecast',
            {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m,precipitation,windspeed_10m',
                },
            },
        );
        return response.data; // Devuelve los datos meteorológicos
    } catch (err) {
        generateErrorUtil(err.message, err.httpStatus);
    }
};

export default getWeatherDataModel;
