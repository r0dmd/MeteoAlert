import { generateErrorUtil, verifyTokenUtil } from '../utils/index.js';

// ------------------------------------------
// Middleware que autentifica a un administrador
const authAdminMiddleware = async (req, res, next) => {
    try {
        // Tomamos el token de la cabecera, y si no manda token, lanzamos un error
        const { authorization } = req.headers;
        if (!authorization)
            generateErrorUtil('Ha de iniciar sesión para continuar', 401);

        // Validamos el token y comprobamos si es administrador
        const tokenInfo = await verifyTokenUtil(authorization);

        if (tokenInfo.role !== 'admin')
            generateErrorUtil(
                'No tiene los permisos necesarios para realizar esa acción',
                403,
            );

        // Una vez verificado el token, metemos su información en `req.user` para que esté accesible posteriormente
        req.user = tokenInfo;
        next(); // Continuamos al siguiente middleware o controlador
    } catch (err) {
        next(err);
    }
};

export default authAdminMiddleware;
