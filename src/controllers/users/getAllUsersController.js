import { selectAllUsersModel } from '../../models/users/index.js';

// ------------------------------------------
// Función que le devuelve a un administrador un listado con todos los usuarios registrados en la app
const getAllUsersController = async (req, res, next) => {
    try {
        // Seleccionamos usuarios
        const users = await selectAllUsersModel();

        // Respondemos con los datos de los usuarios
        res.send({
            status: 'ok',
            data: { users },
        });
    } catch (err) {
        next(err);
    }
};

export default getAllUsersController;
