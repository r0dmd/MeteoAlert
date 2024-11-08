import {
    selectUserByEmailModel,
    selectUserByUsernameModel,
} from '../../models/users';
import { generateErrorUtil } from '../../utils';

// ------------------------------------------
// Función controladora para añadir un usuario
const addUserController = async (req, res, next) => {
    try {
        // Validar schema @@@

        // REQ: Representa la solicitud del cliente y contiene información sobre la petición. Aquí obtenemos los datos necesarios del body
        const { username, email, password } = req.body;

        // Comprobaciones de los datos recibidos antes de insertar al usuario
        const usernameAlreadyExists = await selectUserByUsernameModel(username);
        if (usernameAlreadyExists)
            generateErrorUtil('Nombre de usuario no disponible', 409);

        const emailAlreadyExists = await selectUserByEmailModel(email);
        if (emailAlreadyExists)
            generateErrorUtil('Correo electrónico no disponible', 409);

        // Insertamos el usuario, y si el número de filas afectadas es menor que uno, quiere decir que hubo algún problema en la inserción
        //if ((await addUserModel(username, email, password)) < 1)
        //    generateErrorUtil('Error de inserción en base de datos', 400);

        // RES: Envía una respuesta al cliente
        res.status(201).send({
            status: 'ok',
            message: 'Usuario registrado',
        });
    } catch (err) {
        // NEXT: Función que permite pasar el control al siguiente middleware en la pila de ejecución
        next(err);
    }
};

export default addUserController;
