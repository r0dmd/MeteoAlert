import { updateUserSchema } from '../../schemas/users/index.js';

import {
    selectUserByIdModel,
    updateUserModel,
} from '../../models/users/index.js';

import {
    generateErrorUtil,
    removeAvatarUtil,
    saveAvatarUtil,
    validateSchema,
} from '../../utils/index.js';

// ------------------------------------------
// Función que actualiza los datos de usuario
const updateUserController = async (req, res, next) => {
    try {
        await validateSchema(updateUserSchema, req.body);

        if (Object.keys(req.body).length === 0 && !req.files)
            generateErrorUtil(
                'No se ha introducido ningún dato para actualizar',
                400,
            );

        // Añadimos el ID del usuario al cuerpo de la solicitud para identificar qué usuario se está actualizando
        req.body.id = req.user.id;

        // Manejo de avatar
        if (req.files && req.files.avatar) {
            // Variable para guardar el nombre del avatar actual (si es reemplazado)
            let previousAvatar = null;

            const avatar = req.files.avatar;

            // Antes de guardar la nueva imagen, guadamos el nombre del avatar anterior para eliminalo después
            const user = await selectUserByIdModel(req.user.id);
            if (user && user.avatar) previousAvatar = user.avatar;

            // Guardamos el nuevo avatar
            const newAvatar = await saveAvatarUtil(avatar, 300);

            // Añadimos el nuevo nombre de avatar a req.body para actualizar la base de datos
            req.body.avatar = newAvatar;

            // Si el usuario tenía un avatar anterior y fue reemplazado, eliminamos el archivo anterior
            if (previousAvatar) await removeAvatarUtil(previousAvatar);
        }

        // Actualizamos la BD
        const updatedRows = await updateUserModel(req.body);

        // Si no se encuentra al usuario o no se realizaron cambios:
        if (updatedRows === 0)
            generateErrorUtil(
                'Usuario no encontrado o ningún cambio realizado',
                400,
            );

        // Comprobamos la BD con el ID proporcionado para obtener los datos actualizados
        const updatedUser = await selectUserByIdModel(req.user.id);

        // Respuesta al cliente
        res.send({
            status: 'ok',
            message: 'Datos actualizados con éxito',
            data: updatedUser,
        });
    } catch (err) {
        next(err);
    }
};
export default updateUserController;
