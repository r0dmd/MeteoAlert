import jwt from 'jsonwebtoken';

import { selectLastAuthUpdateModel } from '../models/users/index.js';
import { generateErrorUtil } from './index.js';

const { SECRET } = process.env; // Clave para desencriptar el token

// Para poder comparar la hora del token (en UTC) con la de la base de datos (en local) necesitamos usar moment para convertir la UTC en local
import moment from 'moment-timezone';

// ------------------------------------------
// Función utilitaria para verificar la validez de un token
const verifyTokenUtil = async (token) => {
    try {
        // Desencriptamos el token
        const tokenInfo = jwt.verify(token, SECRET);

        //Comprobamos que la fecha del token sea válida
        const lastAuthUpdate = new Date(
            await selectLastAuthUpdateModel(tokenInfo.id),
        );

        // Tomamos la fecha de creación del token en segundos, la pasamos a milisegundos, usamos moment para convertirla de UTC a local de Europa/Madrid, y convertimos el resultado en Date para operar con el con facilidad
        const tokenEmissionDate = new Date(
            moment.tz(tokenInfo.iat * 1000, 'Europe/Madrid').utc(true),
        );

        if (tokenEmissionDate < lastAuthUpdate) {
            generateErrorUtil('Token inválido', 401); // Unauthorized
        }

        // Si todo es correcto, retornamos la información del token
        return tokenInfo;
    } catch (err) {
        generateErrorUtil(err.message, err.httpStatus);
    }
};

export default verifyTokenUtil;
