import { selectUserAlertsModel } from '../../models/alerts/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que le devuelve a un usuario un listado con las alertas que le hayan saltado
const getAlertsController = async (req, res, next) => {
    try {
        // Seleccionamos alertas
        const alerts = await selectUserAlertsModel(req.user.id);

        if (alerts.length < 1)
            generateErrorUtil(
                'No se encontraron alertas declaradas para este usuario',
                404,
            );

        // Respondemos
        res.send({
            status: 'ok',
            data: { alerts },
        });
    } catch (err) {
        next(err);
    }
};

export default getAlertsController;
