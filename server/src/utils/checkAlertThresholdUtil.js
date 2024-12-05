/**
 * Compara los datos meteorológicos con las preferencias del usuario
 * @param {Object} weatherData - Datos meteorológicos.
 * @param {Array} preferences - Preferencias del usuario.
 * @returns {Array} - Alertas generadas.
 */
const checkAlertThresholdUtil = (weatherData, preferences) => {
    const alerts = [];

    preferences.forEach((preference) => {
        const { type, threshold } = preference;

        let values;
        switch (type) {
            case 'lluvia':
                values = weatherData.hourly.precipitation;
                break;
            case 'viento':
                values = weatherData.hourly.windspeed_10m;
                break;
            case 'temperatura':
                values = weatherData.hourly.temperature_2m;
                break;
            default:
                return; // Tipos sin umbral
        }

        const exceeded = values.some((value) => value > threshold);
        if (exceeded) {
            alerts.push({ type, threshold });
        }
    });

    return alerts;
};

export default checkAlertThresholdUtil;
