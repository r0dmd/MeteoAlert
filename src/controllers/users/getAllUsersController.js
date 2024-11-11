// import { selectUserByIdModel } from '../../models/users/index.js';
// import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
const getAllUsersController = async (req, res, next) => {
    try {
        // Respondemos con los datos de los usuarios
        res.send({
            status: 'ok',
            data: {},
        });
    } catch (err) {
        next(err);
    }
};
export default getAllUsersController;
