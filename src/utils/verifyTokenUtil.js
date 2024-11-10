import jwt from 'jsonwebtoken';
const { SECRET } = process.env; // Clave para desencriptar el token

// ------------------------------------------
// Función utilitaria para verificar la validez de un token
const verifyTokenUtil = async (token) => {
    // Desencriptamos el token
    const tokenInfo = jwt.verify(token, SECRET);

    // @@@ Comprobamos que la fecha del token sea válida
    /* const res = await getLastAuthUpdateModel(tokenInfo.id);

        if (res) {
            const lastAuthUpdate = new Date(res);
            const tokenEmissionDate = new Date(tokenInfo.iat * 1000);

            if (tokenEmissionDate < lastAuthUpdate) {
                throw generateErrorUtil('Token no válido', 401);
            }
        } */

    // Si todo es correcto, retornamos la información del token
    return tokenInfo;
};

export default verifyTokenUtil;
