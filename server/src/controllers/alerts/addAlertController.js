import { validateSchemaUtil, generateErrorUtil } from '../../utils/index.js';

import { addAlertSchema } from '../../schemas/alerts/index.js';

import { addAlertModel } from '../../models/alerts/index.js';

// ------------------------------------------
// Función que inserta en la BD una alerta cuando se activa
const addAlertController = async (req, res, next) => {
    try {
        await validateSchemaUtil(addAlertSchema, req.body);

        // Ponemos let porque hay alertas que no tienen umbral (y en este caso, tampoco un "valor" específico, sino activas o no), como por ejemplo un incendio
        let { type, value } = req.body;
        value = value === '' ? null : value;

        // Definimos tipos de alerta que no requieren umbral y por tanto tampoco tendrán valor cuando salten, y si el tipo está en la lista de alertas sin umbral/valor nos aseguramos de que "value" sea null
        const noValueTypes = [
            'incendio',
            'niebla',
            'terremoto',
            'deslizamiento',
            'hielo',
        ];

        if (noValueTypes.includes(type)) {
            value = null;
        }

        // Pasamos los datos al modelo
        const alertId = await addAlertModel(req.user.id, type, value);

        if (alertId < 1)
            generateErrorUtil(
                'Error al añadir alerta en la base de datos',
                400,
            );

        res.status(201).send({
            status: 'ok',
            message: 'Alerta añadida con éxito',
        });
    } catch (err) {
        next(err);
    }
};
export default addAlertController;
