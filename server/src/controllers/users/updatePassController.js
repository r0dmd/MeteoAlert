import { generateErrorUtil, validateSchemaUtil } from '../../utils/index.js';
import { updatePassSchema } from '../../schemas/users/index.js';
import {
    updateLastAuthUpdateModel,
    updatePassModel,
} from '../../models/users/index.js';

// ------------------------------------------
// Función controladora que le permite a un usuario cambiar su contraseña
const updatePassController = async (req, res, next) => {
    try {
        await validateSchemaUtil(updatePassSchema, req.body);

        // Obtenemos los datos necesarios.
        const { oldPass, newPass } = req.body;
        const userId = req.user.id;

        // Actualizamos la base de datos.
        const affectedRows = await updatePassModel(userId, oldPass, newPass);
        if (affectedRows === 0)
            generateErrorUtil('Error al cambiar la contraseña', 400);

        // Al ser un controlador de autentificación, antes de concluir necesitamos indicar la fecha de actualización de autorización del usuario en la BD
        await updateLastAuthUpdateModel(userId);

        // Enviamos respuesta
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada con éxito.',
        });
    } catch (err) {
        next(err);
    }
};

export default updatePassController;
