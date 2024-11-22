import {
    selectLocationByIdsModel,
    deleteLocationModel,
} from '../../models/locations/index.js';

import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que le permite a un usuario eliminar una de sus ubicaciones
const deleteLocationController = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        const userId = req.user.id;

        const locationToDelete = await selectLocationByIdsModel(
            locationId,
            userId,
        );

        if (locationToDelete.length === 0)
            generateErrorUtil(
                'Ubicación no encontrada dentro de sus ubicaciones',
                404,
            );

        const affectedRows = await deleteLocationModel(locationId);
        if (affectedRows < 1)
            generateErrorUtil('Error al eliminar la ubicación', 500);

        res.send({
            status: 'ok',
            message: 'Ubicación eliminada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteLocationController;
