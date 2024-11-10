import { selectUserByIdModel } from '../../models/users/index.js';
import { generateErrorUtil } from '../../utils/index.js';

const getUserController = async (req, res, next) => {
    try {
        // El ID del usuario se obtiene del token, que ya ha sido validado en un middleware anterior.
        // NOTA: A pesar de que también se puede extraer de la ruta, usar el token garantiza que el usuario esté autenticado y que el ID provenga de una fuente segura, evitando manipulaciones de la URL y asegurando que solo el usuario autenticado pueda acceder a sus propios datos
        const userId = req.user.id;

        // Seleccionamos y comprobamos si existe ese usuario
        const user = await selectUserByIdModel(userId);
        if (!user) generateErrorUtil('Token inválido', 404);

        // Respondemos con los datos del usuario si existe.
        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};
export default getUserController;
