import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que selecciona las alertas asociadas a las preferenicas de un usuario
const selectUserAlertsModel = async (userId) => {
    const pool = await getPool();

    const [alerts] = await pool.query(
        `SELECT type, value, createdAt FROM alerts WHERE userId = ?`,
        [userId],
    );

    // Devuelve un array de objetos
    return alerts;
};

export default selectUserAlertsModel;
