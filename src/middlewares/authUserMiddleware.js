import { generateErrorUtil, verifyTokenUtil } from '../utils/index.js';

// ------------------------------------------
// Middleware que autentifica al usuario logueado (sin importar el rol)
const authUserMiddleware = async (req, res, next) => {
    // NOTA: Express acepta tres parámetros en un middleware (`req`, `res`, `next`), y aunque permite que no todos sean utilizados es necesario incluirlos para que funcionen correctamente
    try {
        // Tomamos el token de la cabecera, y si no manda token, lanzamos un error
        const { authorization } = req.headers;
        if (!authorization)
            generateErrorUtil('Ha de iniciar sesión para continuar', 401);

        // Verificamos el token
        const tokenInfo = await verifyTokenUtil(authorization);

        // Una vez verificado el token, metemos su información en `req.user` para que esté accesible posteriormente
        req.user = tokenInfo;
        next(); // Continuamos al siguiente middleware o controlador
    } catch (err) {
        next(err);
    }
};

export default authUserMiddleware;
