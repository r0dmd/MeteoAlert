import getPool from '../../db/getPool.js';

// ------------------------------------------
// Consulta que elimina una preferencia
const deletePreferenceModel = async (preferenceId) => {
    const pool = await getPool();

    const [res] = await pool.query(`DELETE FROM preferences WHERE id = ?`, [
        preferenceId,
    ]);

    return res.affectedRows;
};

export default deletePreferenceModel;
