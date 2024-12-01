import { validateSchemaUtil, generateErrorUtil } from '../../utils/index.js';

import { addAlertSchema } from '../../schemas/alerts/index.js';

import { addAlertModel } from '../../models/alerts/index.js';

// ------------------------------------------
// Función que inserta en la BD una alerta cuando se activa
const addAlertController = async (req, res, next) => {
    try {
        await validateSchemaUtil(addAlertSchema, req.body);

        const { type, value } = req.body;

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
