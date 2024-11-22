import jwt from 'jsonwebtoken'; // JSON web token
import bcrypt from 'bcrypt';

import {
    selectUserByEmailModel,
    updateLastAuthUpdateModel,
} from '../../models/users/index.js';

import { generateErrorUtil, validateSchemaUtil } from '../../utils/index.js';
import { loginUserSchema } from '../../schemas/users/index.js';

const { SECRET, TOKEN_EXPIRATION } = process.env; // Variables de entorno

// ------------------------------------------
// Función controladora para iniciar sesión. Aquí se genera el token
const loginUserController = async (req, res, next) => {
    try {
        // Validamos y obtenemos datos del body
        await validateSchemaUtil(loginUserSchema, req.body);
        const { email, password } = req.body;

        // Seleccionamos los datos del usuario de la BD
        const user = await selectUserByEmailModel(email);

        // Si existe usuario, comprobamos si la contraseña coincide mediante una variable que almacena valor booleano indicando
        let validPass;
        if (user) validPass = await bcrypt.compare(password, user.password);

        // Si no existe usuario o las contraseñas no coinciden, lanzamos error
        if (!user || !validPass)
            generateErrorUtil('Credenciales inválidas', 401);

        // Generamos un objeto con la información que queremos para incluir en el token, y generamos el token
        const tokenInfo = {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        // jwt.sign(payload, secretOrPrivateKey, [options, callback])
        const token = jwt.sign(tokenInfo, SECRET, {
            expiresIn: TOKEN_EXPIRATION,
        });

        // Al ser un controlador de autentificación, antes de concluir necesitamos indicar la fecha de actualzación en la BD
        await updateLastAuthUpdateModel(user.id);

        res.send({
            status: 'ok',
            data: { token },
        });
    } catch (err) {
        next(err);
    }
};

export default loginUserController;
