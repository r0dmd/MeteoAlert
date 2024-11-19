import { validateSchemaUtil, generateErrorUtil } from '../../utils/index.js';

import { addPreferenceSchema } from '../../schemas/preferences/index.js';

import {
    addPreferenceModel,
    selectPreferenceByUserIdAndTypeModel,
} from '../../models/preferences/index.js';

// ------------------------------------------
// Función que le permite a un usuario añadir una preferencia de alerta personalizada
const addPreferenceController = async (req, res, next) => {
    try {
        await validateSchemaUtil(addPreferenceSchema, req.body);

        // Ponemos let porque hay alertas que no tienen umbral, como por ejemplo un incendio. Hacemos lo mismo para el umbral que lo que hicimos para latitud/longitud en ubicación, puesto que el esquema espera un número, y un string vacío no sirve
        let { type, threshold } = req.body;
        threshold = threshold === '' ? null : threshold;

        // Definimos tipos de alerta que no requieren umbral, y si el tipo está en la lista de alertas sin umbral nos aseguramos de que "threshold" sea null
        const noThresholdTypes = [
            'incendio',
            'niebla',
            'terremoto',
            'deslizamiento',
            'hielo',
        ];

        if (noThresholdTypes.includes(type)) {
            threshold = null;
        }

        // Verificar si la preferencia ya existe, devuelve true o false
        const preferenceExists = await selectPreferenceByUserIdAndTypeModel(
            req.user.id,
            type,
        );

        if (preferenceExists) {
            generateErrorUtil('Ya has añadido esta preferencia', 409);
        }

        // Pasamos los datos al modelo
        const locationId = await addPreferenceModel(
            req.user.id,
            type,
            threshold,
        );

        if (locationId < 1)
            generateErrorUtil(
                'Error al añadir preferencia en la base de datos',
                400,
            );

        res.status(201).send({
            status: 'ok',
            message: 'Preferencia añadida con éxito',
        });
    } catch (err) {
        next(err);
    }
};
export default addPreferenceController;
