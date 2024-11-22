import {
    selectAlertByIdsModel,
    deleteAlertModel,
} from '../../models/alerts/index.js';

import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que le permite a un usuario eliminar alertas de su historial de alertas declaradas
const deleteAlertController = async (req, res, next) => {
    try {
        const { alertId } = req.params;
        const userId = req.user.id;

        const alertToDelete = await selectAlertByIdsModel(alertId, userId);

        if (alertToDelete.length === 0)
            generateErrorUtil(
                'Alerta no encontrada dentro de su historial de alertas',
                404,
            );

        const affectedRows = await deleteAlertModel(alertId);
        if (affectedRows < 1)
            generateErrorUtil('Error al eliminar la alerta', 500);

        res.send({
            status: 'ok',
            message: 'Alerta eliminada correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteAlertController;
