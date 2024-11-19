import getPool from '../../db/getPool.js'; // Conexión a la BD

// ------------------------------------------
// Función que inserta una nueva preferencia en la BD
const addPreferenceModel = async (userId, type, threshold) => {
    const pool = await getPool();

    const [res] = await pool.query(
        `INSERT INTO preferences(userId, type, threshold, active) VALUES (?, ?, ?, TRUE)`,
        [userId, type, threshold],
    );

    // Devolvemos el ID de la fila añadida
    return res.insertId;
};

export default addPreferenceModel;
