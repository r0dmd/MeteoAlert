import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que realiza una consulta a la BD para seleccionar un usuario con un ID dado
const selectUserByIdModel = async (userId) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con ese ID
    const [users] = await pool.query(
        `SELECT username, email, avatar, role, createdAt, modifiedAt FROM users WHERE id = ?`,
        [userId],
    );

    // Retornamos users[0] para devolver solo el primer usuario coincidente (porque solo hay 1 al ser único el email), o undefined si no existe
    return users[0];
};

export default selectUserByIdModel;
