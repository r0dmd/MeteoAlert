// routes/usersRoutes.js
import express from 'express';
import {
    addUserController,
    loginUserController,
    getUserController,
    updateUserController,
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
router.get('/:userId', authUserMiddleware, getUserController);

// Ruta para actualizar los datos de un usuario
router.put('/:userId/update', authUserMiddleware, updateUserController);

// Ruta para eliminar los datos de un usuario
router.delete('/:userId/delete', authAdminMiddleware, deleteUserController);

export default router;
