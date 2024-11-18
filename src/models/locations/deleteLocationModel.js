import getPool from '../../db/getPool.js';

// ------------------------------------------
// Consulta que elimina una ubicación
const deleteLocationModel = async (locationId) => {
    const pool = await getPool();

    const [res] = await pool.query(`DELETE FROM locations WHERE id = ?`, [
        locationId,
    ]);

    return res.affectedRows;
};

export default deleteLocationModel;
