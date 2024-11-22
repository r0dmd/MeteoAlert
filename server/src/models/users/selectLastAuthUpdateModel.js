import getPool from '../../db/getPool.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que consulta la BD para devolver la última actualización de autorización de un usuario por ID
const selectLastAuthUpdateModel = async (userId) => {
    const pool = await getPool();

    const [users] = await pool.query(
        `SELECT lastAuthUpdate FROM users WHERE id = ?`,
        [userId],
    );

    if (users.length < 1) generateErrorUtil('Usuario no encontrado', 404);

    // Solo nos interesa retornar la fecha
    return users[0].lastAuthUpdate;
};

export default selectLastAuthUpdateModel;
