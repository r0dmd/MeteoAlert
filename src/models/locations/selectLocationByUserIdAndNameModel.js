import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que verifica si ya existe una ubicación con el mismo nombre para un usuario dado
const selectLocationByUserIdAndNameModel = async (userId, location) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `SELECT id FROM locations WHERE userId = ? AND location = ?`,
        [userId, location],
    );

    return result.length > 0; // Retorna true si existe, false si no
};

export default selectLocationByUserIdAndNameModel;
