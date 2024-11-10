import {
    addUserModel,
    selectUserByEmailModel,
    selectUserByUsernameModel,
} from '../../models/users/index.js';

import { generateErrorUtil, validateSchemaUtil } from '../../utils/index.js';
import { userSchema } from '../../schemas/users/index.js';

// ------------------------------------------
// Función controladora para añadir un usuario
const addUserController = async (req, res, next) => {
    try {
        // NOTA: La validación de datos va antes de extraerlos del body para asegurar que todos los requeridos estén presentes y en el formato correcto *antes de* procesarlos en el código. Si no se usa un esquema de validación, habría que hacer comprobaciones adicionales después, como `if (!username || !email || !password) generateErrorUtil('Faltan campos', 400);`, lo cual es menos eficiente y más propenso a errores repetitivos
        await validateSchemaUtil(userSchema, req.body);

        // REQ: Representa la solicitud del cliente y contiene información sobre la petición. Aquí obtenemos los datos necesarios del body una vez validados
        const { username, email, password } = req.body;

        // Comprobaciones de los datos recibidos antes de insertar al usuario
        const usernameAlreadyExists = await selectUserByUsernameModel(username);
        if (usernameAlreadyExists)
            generateErrorUtil('Nombre de usuario no disponible', 409);

        const emailAlreadyExists = await selectUserByEmailModel(email);
        if (emailAlreadyExists)
            generateErrorUtil('Correo electrónico no disponible', 409);

        // Insertamos el usuario. NOTA: `addUserModel` devuelve `res.insertId` (el ID de esa nueva fila), que siempre será 1 o mayor en caso de éxito. Si el valor devuelto es < que 1, significa que hubo un error en la inserción.
        if ((await addUserModel(username, email, password)) < 1)
            generateErrorUtil('Error de inserción en la base de datos', 400);

        // RES: Envía una respuesta al cliente
        res.status(201).send({
            status: 'ok',
            message: 'Usuario registrado',
        });
    } catch (err) {
        console.log(err.details);

        // NEXT: Función que permite pasar el control al siguiente middleware en la pila de ejecución
        next(err);
    }
};

export default addUserController;
