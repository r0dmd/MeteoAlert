import { getWeatherDataModel } from '../../models/weather/index.js';
import { selectUserPreferencesModel } from '../../models/preferences/index.js';
import { addAlertModel } from '../../models/alerts/index.js';
import { selectAllUsersModel } from '../../models/users/index.js';

import {
    checkAlertThresholdUtil,
    generateErrorUtil,
} from '../../utils/index.js';
import selectUserLocationsModel from '../../models/locations/selectUserLocationsModel.js';

// ------------------------------------------
// Controlador consolidado para obtener datos meteorológicos y procesar notificaciones
const getWeatherDataController = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return generateErrorUtil('Se requiere el ID del usuario', 400);
        }

        // Recuperar usuario y sus ubicaciones
        const user = await selectAllUsersModel(userId);
        if (!user) {
            return generateErrorUtil('Usuario no encontrado', 404);
        }

        // Recuperar preferencias y ubicaciones del usuario
        const preferences = await selectUserPreferencesModel(userId);
        const locations = await selectUserLocationsModel(userId);

        const notifications = [];
        const weatherDataForLocations = [];

        // Procesar cada ubicación asociada al usuario
        for (const location of locations) {
            const weatherData = await getWeatherDataModel(
                location.latitude,
                location.longitude,
            );

            weatherDataForLocations.push({
                location,
                weatherData,
            });

            // Verificar umbrales y generar notificaciones si corresponde
            const alerts = checkAlertThresholdUtil(weatherData, preferences);

            for (const alert of alerts) {
                await addAlertModel(userId, alert.type, alert.threshold);
                notifications.push(alert);
            }
        }

        // Retornar datos meteorológicos y notificaciones generadas
        res.send({
            status: 'ok',
            data: {
                weatherDataForLocations,
                notifications,
            },
        });
    } catch (err) {
        next(err);
    }
};

export default getWeatherDataController;
