import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que inhabilita un usuario
const updateUserAsInactiveModel = async (userId) => {
    const pool = await getPool();

    // Randomizamos nombre de usuario e email y no ponemos "Usuario eliminado" para que nadie que lo sepa pueda entrar con esas credenciales. Optamos por poner el identificador en el campo contraseña, que al ser encriptada durante el registro, nunca va a ser "Usuario eliminado"
    // Como el campo no admite más de 30 caracteres y randomUUID produce un string de 36 por defecto, usamos slice para cortarlo a 30
    const deletedUsername = crypto.randomUUID().slice(0, 30);
    const deletedEmail = crypto.randomUUID().slice(0, 30);

    // Actualizamos la BD
    const [res] = await pool.query(
        `UPDATE users SET lastAuthUpdate = NOW(),
        username = ?,
        email = ?,
        avatar = "",
        password = "Usuario eliminado"
        WHERE id = ?`,
        [deletedUsername, deletedEmail, userId],
    );

    return res.affectedRows;
};

export default updateUserAsInactiveModel;
