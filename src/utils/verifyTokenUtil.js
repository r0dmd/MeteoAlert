import jwt from 'jsonwebtoken';

import { getLastAuthUpdateModel } from '../models/users/index.js';
import { generateErrorUtil } from './index.js';

const { SECRET } = process.env; // Clave para desencriptar el token

// ------------------------------------------
// Función utilitaria para verificar la validez de un token
const verifyTokenUtil = async (token) => {
    // Desencriptamos el token
    const tokenInfo = jwt.verify(token, SECRET);

    // Comprobamos que la fecha del token sea válida
    const res = await getLastAuthUpdateModel(tokenInfo.id);

    // Si 'res' (la fecha) es null, no hace falta hacer esta siguiente comprobación
    if (res) {
        const lastAuthUpdate = new Date(res);
        // Tomamos la fecha de creación del token en segundos, la pasamos a milisegundos, y convertimos el resultado en Date para operar con el con facilidad
        const tokenEmissionDate = new Date(tokenInfo.iat * 1000);
        console.log(lastAuthUpdate);
        console.log(tokenEmissionDate);
        // @@ ARREGLAR ESTO, DESFASE HORARIO!!

        if (tokenEmissionDate <= lastAuthUpdate) {
            generateErrorUtil('Token inválido', 401);
        }
    }

    // Si todo es correcto, retornamos la información del token
    return tokenInfo;
};

export default verifyTokenUtil;
