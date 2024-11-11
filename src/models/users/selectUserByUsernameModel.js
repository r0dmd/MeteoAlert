// Importamos la función que devuelve una conexión con la base de datos
import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que realiza una consulta a la BD para seleccionar un usuario con un nombre de usuario dado
const selectUserByUsernameModel = async (username) => {
    // NOTA sobre `try-catch` en modelos: No es obligatorio si el manejo de errores se gestiona en una capa superior, como en los controladores o en un middleware de errores global. Esto permite que el modelo solo se enfoque en la consulta a la base de datos. Sin embargo, incluir `try-catch` puede ser útil para capturar errores específicos de la base de datos (conexión, sintaxis SQL, etc.) y lanzar mensajes personalizados si se desea.
    const pool = await getPool();

    // Comprobamos si hay algún usuario con el nombre de usuario proporcionado
    // NOTA: pool.query devuelve un array de arrays; en el primer resultado los datos, en el segundo mucha información adicional, y normalmente no necesaria. Por ello, usando destructuring ("[users] = ...") nos quedamos con el primer array, el de los resultados, que es el que nos interesa
    const [users] = await pool.query(
        `SELECT id, username FROM users WHERE username = ?`,
        [username],
    );

    // NOTA: Asumimos que username es único en la BD, por lo que la consulta debería devolver un solo registro o ninguno. "users[0]" nos permite extraer directamente el primer (y único) resultado cuando hay una coincidencia, y undefined si no existe.
    return users[0];
};

export default selectUserByUsernameModel;
