import {
    selectPreferenceByIdsModel,
    deletePreferenceModel,
} from '../../models/preferences/index.js';

import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que le permite a un usuario eliminar una de sus preferencias
const deletePreferenceController = async (req, res, next) => {
    try {
        const { preferenceId } = req.params;
        const userId = req.user.id;

        const preferenceToDelete = await selectPreferenceByIdsModel(
            preferenceId,
            userId,
        );

        if (preferenceToDelete.length === 0)
            generateErrorUtil(
                'Preferencia no encontrada dentro de sus preferencias',
                404,
            );

        const affectedRows = await deletePreferenceModel(preferenceId);
        if (affectedRows < 1)
            generateErrorUtil('Error al eliminar la preferencia', 500);

        res.send({
            status: 'ok',
            message: 'Preferencia eliminada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default deletePreferenceController;
