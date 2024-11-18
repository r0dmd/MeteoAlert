import { updateLocationSchema } from '../../schemas/locations/index.js';

import {
    selectLocationByIdsModel,
    updateLocationModel,
} from '../../models/locations/index.js';

import { generateErrorUtil, validateSchemaUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que actualiza los datos de una ubicación
const updateLocationController = async (req, res, next) => {
    try {
        await validateSchemaUtil(updateLocationSchema, req.body);

        if (Object.keys(req.body).length === 0 && !req.files)
            generateErrorUtil(
                'No se ha introducido ningún dato para actualizar',
                400,
            );

        // Añadimos el ID de la ubicación al cuerpo de la solicitud para identificar qué ubicación se está actualizando
        const { locationId } = req.params;
        req.body.id = locationId;

        // Comprobamos primero que la ubicación sea suya
        const oldLocation = await selectLocationByIdsModel(
            locationId,
            req.user.id,
        );

        if (oldLocation.length < 1)
            generateErrorUtil(
                'Ubicación no encontrada dentro de sus ubicaciones',
                404,
            );

        // Actualizamos la BD
        const updatedRows = await updateLocationModel(req.body);

        // Si no se encuentra la ubicación o no se realizaron cambios:
        if (updatedRows === 0)
            generateErrorUtil(
                'Ubicación no encontrada o ningún cambio realizado',
                400,
            );

        // Comprobamos la BD con el ID proporcionado para obtener los datos actualizados
        const updatedLocation = await selectLocationByIdsModel(
            locationId,
            req.user.id,
        );

        // Respuesta al cliente
        res.send({
            status: 'ok',
            message: 'Datos actualizados con éxito',
            data: updatedLocation,
        });
    } catch (err) {
        next(err);
    }
};
export default updateLocationController;
