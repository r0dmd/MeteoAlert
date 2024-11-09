// routes/usersRoutes.js
import express from 'express';
import {
    addUserController,
    loginUserController,
    getUserController,
    updateUserController,
    deleteUserController,
} from '../controllers/users/index.js';
// import authMiddleware from '../middleware/authMiddleware.js';

// ------------------------------------------

const router = express.Router();

// Ruta para generar un nuevo usuario
router.post('/register', addUserController);

// Ruta para iniciar sesión con un usuario existente
router.post('/login', loginUserController);

// Ruta para obtener los datos de un usuario
router.get('/:userId', /* authMiddleware, */ getUserController);

// Ruta para actualizar los datos de un usuario
router.put('/:userId/update', /* authMiddleware, */ updateUserController);

// Ruta para eliminar los datos de un usuario
router.delete('/:userId/delete', /* authMiddleware, */ deleteUserController);

export default router;
