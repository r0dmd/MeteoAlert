import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que verifica si ya existe una preferencia del mismo tipo de alerta para un usuario dado
const selectPreferenceByUserIdAndTypeModel = async (userId, type) => {
    const pool = await getPool();

    const [result] = await pool.query(
        `SELECT id FROM preferences WHERE userId = ? AND type = ?`,
        [userId, type],
    );

    return result.length > 0; // Retorna true si existe, false si no
};

export default selectPreferenceByUserIdAndTypeModel;
