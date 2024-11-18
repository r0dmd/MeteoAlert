import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que selecciona las ubicaciones de un usuario
const selectUserLocationsModel = async (userId) => {
    const pool = await getPool();

    const [locations] = await pool.query(
        `SELECT location FROM locations WHERE userId = ?`,
        [userId],
    );

    // Devuelve un array de objetos
    return locations;
};

export default selectUserLocationsModel;
