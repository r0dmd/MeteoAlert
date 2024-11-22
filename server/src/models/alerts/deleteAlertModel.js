import getPool from '../../db/getPool.js';

// ------------------------------------------
// Consulta que elimina una alerta
const deleteAlertModel = async (alertId) => {
    const pool = await getPool();

    const [res] = await pool.query(`DELETE FROM alerts WHERE id = ?`, [
        alertId,
    ]);

    return res.affectedRows;
};

export default deleteAlertModel;
