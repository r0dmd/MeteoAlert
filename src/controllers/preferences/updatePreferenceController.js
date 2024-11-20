import { updatePreferenceSchema } from '../../schemas/preferences/index.js';

import {
    selectPreferenceByIdsModel,
    updatePreferenceModel,
} from '../../models/preferences/index.js';

import { generateErrorUtil, validateSchemaUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que actualiza los datos de una preferencia
const updatePreferenceController = async (req, res, next) => {
    try {
        await validateSchemaUtil(updatePreferenceSchema, req.body);

        if (Object.keys(req.body).length === 0 && !req.files)
            generateErrorUtil(
                'No se ha introducido ningún dato para actualizar',
                400,
            );

        // Añadimos el ID de la preferencia al cuerpo de la solicitud para identificar qué preferencia se está actualizando
        const { preferenceId } = req.params;
        req.body.id = preferenceId;

        // Comprobamos primero que la preferencia sea suya
        const oldPreference = await selectPreferenceByIdsModel(
            preferenceId,
            req.user.id,
        );

        if (oldPreference.length < 1)
            generateErrorUtil(
                'No se ha encontrado esa preferencia de este usuario',
                404,
            );

        // Actualizamos la BD
        const updatedRows = await updatePreferenceModel(req.body);

        // Si no se encuentra la preferencia o no se realizaron cambios:
        if (updatedRows === 0)
            generateErrorUtil(
                'preferencia no encontrada o ningún cambio realizado',
                400,
            );

        // Comprobamos la BD con el ID proporcionado para obtener los datos actualizados
        const updatedPreference = await selectPreferenceByIdsModel(
            preferenceId,
            req.user.id,
        );

        // Respuesta al cliente
        res.send({
            status: 'ok',
            message: 'Datos actualizados con éxito',
            data: updatedPreference,
        });
    } catch (err) {
        next(err);
    }
};
export default updatePreferenceController;
