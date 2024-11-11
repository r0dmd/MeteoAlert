// NOTA: Es buena práctica no incluir en la URL información que ya viene contenida en el token, salvo que haya alguna razón especial para hacerlo. Así pues, evitamos poner ':userId' como path param en las rutas que requieren autentificación y por tanto disponen del token y su información

// routes/usersRoutes.js
import express from 'express';
import {
    addUserController,
    loginUserController,
    getUserController,
    updateUserController,
    getAllUsersController,
    deleteUserController,
} from '../controllers/users/index.js';

import {
    authAdminMiddleware,
    authUserMiddleware,
} from '../middlewares/index.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar un nuevo usuario
router.post('/register', addUserController);

// Ruta para iniciar sesión con un usuario existente
router.post('/login', loginUserController);

// Ruta para obtener los datos de un usuario
router.get('/profile', authUserMiddleware, getUserController);

// Ruta para actualizar los datos de un usuario
router.put('/profile/update', authUserMiddleware, updateUserController);

// Ruta para obtener todos los usuarios
router.get('/', authAdminMiddleware, getAllUsersController);

// Ruta para eliminar los datos de un usuario
router.delete('/:userId/delete', authAdminMiddleware, deleteUserController);

export default router;
