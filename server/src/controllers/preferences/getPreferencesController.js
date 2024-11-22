import { selectUserPreferencesModel } from '../../models/preferences/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que le devuelve a un usuario un listado con todas sus preferencias
const getPreferencesController = async (req, res, next) => {
    try {
        // Seleccionamos preferences
        const preferences = await selectUserPreferencesModel(req.user.id);

        if (preferences.length < 1)
            generateErrorUtil(
                'No se encontraron preferencias de este usuario',
                404,
            );

        // Respondemos
        res.send({
            status: 'ok',
            data: { preferences },
        });
    } catch (err) {
        next(err);
    }
};

export default getPreferencesController;
