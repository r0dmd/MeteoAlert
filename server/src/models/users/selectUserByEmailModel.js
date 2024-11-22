import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que realiza una consulta a la BD para seleccionar un usuario con un email dado
const selectUserByEmailModel = async (email) => {
    const pool = await getPool();

    // Comprobamos si hay algún usuario con ese email
    const [users] = await pool.query(
        `SELECT id, username, email, password, role FROM users WHERE email = ?`,
        [email],
    );

    // Retornamos users[0] para devolver solo el primer usuario coincidente (porque solo hay 1 al ser único el email), o undefined si no existe
    return users[0];
};

export default selectUserByEmailModel;
