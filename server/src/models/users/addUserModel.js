import bcrypt from 'bcrypt'; // Para encriptar contraseña
import getPool from '../../db/getPool.js'; // Conexión a la BD

// ------------------------------------------
// Función que inserta un nuevo usuario en la BD
const addUserModel = async (username, email, password) => {
    const pool = await getPool();

    // Encriptamos la contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    // Insertamos usuario
    const [res] = await pool.query(
        `INSERT INTO users(username, email, password) VALUES (?, ?, ?)`,
        [username, email, hashedPass],
    );

    // NOTA: La función pool.query devuelve un array, donde el primer elemento ([res]) es un objeto con detalles sobre la operación de inserción, incluyendo propiedades como insertId (ID del registro recién insertado) y affectedRows; el segundo elemento (opcional) contiene información de los campos. Por tanto, usamos destructuring para obtener directamente res y luego accedemos a res.insertId, que contiene el ID único del nuevo usuario, generado automáticamente por MySQL si la tabla tiene un campo de clave primaria autoincremental.
    return res.insertId;
};

export default addUserModel;
