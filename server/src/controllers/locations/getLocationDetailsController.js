import { selectLocationByIdsModel } from '../../models/locations/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que devuelve detalles de una ubicación
const getLocationDetailsController = async (req, res, next) => {
    try {
        const { locationId } = req.params;
        const userId = req.user.id;

        // Le pasamos ID del usuario para seleccionar la ubicación de ese usuario exclusivamente, evitando de paso que por manipulación de URL se pueda acceder a la ubicación de otro usuario
        const location = await selectLocationByIdsModel(locationId, userId);

        if (location.length < 1)
            generateErrorUtil(
                'No se encontró esa ubicación dentro de sus ubicaciones',
                404,
            );

        res.send({
            status: 'ok',
            data: { location },
        });
    } catch (err) {
        next(err);
    }
};
export default getLocationDetailsController;
