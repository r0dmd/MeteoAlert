import { selectUserByIdModel } from '../../models/users/index.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que devuelve los datos del usuario haciendo una consulta a la BD con su ID sacado de su token. El middleware anterior verifica el usuario por lo que no hay que hacer aquí ninguna compobación al respecto
const getUserController = async (req, res, next) => {
    try {
        // El ID del usuario se obtiene del token, que ya ha sido validado en un middleware anterior
        // NOTA: En general, no se debe poner en la ruta algún dato que ya viene firmado en el token. En el caso excepcional en el que tengamos las dos opciones, es siempre mejor extraer el valor del token, que es una fuente más segura y evita posibles manipulaciones indeseadas de la URL, simplificando además la gestión de permisos
        const userId = req.user.id;

        // Seleccionamos y comprobamos si existe ese usuario
        const user = await selectUserByIdModel(userId);

        // NOTA: El middleware de autenticación ya validó al usuario y su token, lo que significa que el token es válido. En caso de que el usuario haya sido eliminado lógicamente después de emitir el token, `selectUserByIdModel` aún devolverá su registro. Para manejar esto, verificamos si los datos clave del usuario (como el nombre de usuario) coinciden con los firmados en el token. De esta forma, no dependemos de datos específicos de usuarios eliminados y mantenemos flexibilidad por si los datos cambian en el futuro.
        if (user.username !== req.user.username)
            generateErrorUtil('Usuario eliminado', 404);

        // Respondemos con los datos del usuario si existe
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
