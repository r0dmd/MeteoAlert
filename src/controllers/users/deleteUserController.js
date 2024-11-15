import {
    selectUserByIdModel,
    updateUserAsInactiveModel,
} from '../../models/users/index.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

// ------------------------------------------
// Función que le permite a un administrador eliminar lógicamente un usuario en la BD (es decir, manteniendo su fila pero borrando todos sus datos)
const deleteUserController = async (req, res, next) => {
    // Seleccionamos el ID del usuario a eliminar desde params
    const { userId } = req.params;

    try {
        const userToDelete = await selectUserByIdModel(userId);
        if (!userToDelete) generateErrorUtil('Usuario no encontrado', 404);

        await updateUserAsInactiveModel(userId);

        res.send({
            status: 'ok',
            message: 'Usuario desactivado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

export default deleteUserController;
