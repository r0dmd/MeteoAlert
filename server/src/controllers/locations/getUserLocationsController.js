import { selectUserLocationsModel } from '../../models/locations/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que le devuelve a un usuario un listado con todas sus ubicaciones
const getUserLocationsController = async (req, res, next) => {
    try {
        // Seleccionamos ubicaciones
        const locations = await selectUserLocationsModel(req.user.id);

        if (locations.length < 1)
            generateErrorUtil(
                'No se encontraron ubicaciones de este usuario',
                404,
            );

        // Respondemos
        res.send({
            status: 'ok',
            data: { locations },
        });
    } catch (err) {
        next(err);
    }
};

export default getUserLocationsController;
