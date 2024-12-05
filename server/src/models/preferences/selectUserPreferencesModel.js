import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que selecciona las preferencias de un usuario
const selectUserPreferencesModel = async (userId) => {
    const pool = await getPool();

    const [preferences] = await pool.query(
        `SELECT id, type, threshold, createdAt FROM preferences WHERE userId = ?`,
        [userId],
    );

    // Devuelve un array de objetos
    return preferences;
};

export default selectUserPreferencesModel;
