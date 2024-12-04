import cron from 'node-cron';

import { getWeatherDataModel } from '../models/weather/index.js';
import { getUserPreferencesModel } from '../models/preferences/index.js';
import { addAlertModel } from '../models/alerts/index.js';
import { selectAllUsersModel } from '../models/users/index.js';

import { checkAlertThresholdUtil, generateErrorUtil } from '../utils/index.js';

// ------------------------------------------
// Configuración del cron job para comprobar los datos meteorológicos automáticamente
// NOTA: node-cron admite un sexto campo para segundos. Tal como está ahora es cada 30 segundos
cron.schedule('*/30 * * * * *', async () => {
    console.log('Ejecutando verificación de umbrales de alerta...');

    try {
        const users = await selectAllUsersModel();

        for (const user of users) {
            const preferences = await getUserPreferencesModel(user.id);

            for (const location of user.locations) {
                const weatherData = await getWeatherDataModel(
                    location.latitude,
                    location.longitude,
                );
                const alerts = checkAlertThresholdUtil(
                    weatherData,
                    preferences,
                );

                for (const alert of alerts) {
                    await addAlertModel(user.id, alert.type, alert.threshold);
                }
            }
        }

        console.log('Verificación completada.');
    } catch (err) {
        generateErrorUtil('Error en el cron job:' + err.message, 500);
    }
});
