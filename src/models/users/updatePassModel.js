import bcrypt from 'bcrypt';
import getPool from '../../db/getPool.js';
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que realiza una consulta a la BD para actualizar la contraseña de un usuario
const updatePassModel = async (userId, oldPass, newPass) => {
    const pool = await getPool();

    // Comprobamos la constraseña antigua
    const [pass] = await pool.query(`SELECT password FROM users WHERE id = ?`, [
        userId,
    ]);

    if (
        pass.length === 0 ||
        (await bcrypt.compare(oldPass, pass[0].password)) === false
    ) {
        generateErrorUtil('Credenciales inválidas', 401);
    }

    // Encriptamos la nueva contraseña y la antigua
    const hashedNewPass = await bcrypt.hash(newPass, 10);

    // Actualizamos la BD
    const [res] = await pool.query(
        `UPDATE users SET modifiedAt = NOW(), lastAuthUpdate = NOW(), password = ? WHERE id = ?`,
        [hashedNewPass, userId],
    );

    // Comprobamos el número de filas afectadas por la actualización. Si es 0, significa que no se ha encontrado el usuario y por tanto no existe
    if (res.affectedRows === 0) {
        generateErrorUtil('Usuario no encontrado o contraseña incorrecta', 400);
    }
    return res.affectedRows;
};

export default updatePassModel;
