import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que actualiza un usuario en la BD. La única clave obligatoria del JSON es ID; todos los demás campos solo serán necesarios en caso de querer actualizar su valor
const updateUserModel = async (user) => {
    const pool = await getPool();

    // El campo ID es obligatorio
    if (!user.id) return;

    // Vamos a quitar el campo ID del JSON, porque con un bucle 'for' recorreremos los demás para insertarlos en la consulta SQL. Así evitamos tener que comprobar en cada iteración que no se meta la clave ID. Una vez terminamos la función, lo reincluimos en el JSON
    const userId = user.id;
    delete user.id;

    // Hacemos lo mismo con la contraseña
    const password = user.password;
    delete user.password;

    // Actualizamos (no hace falta 'SET modifiedAt = NOW()' porque ya el campo lo hace automáticamente en initDb)
    let sql = 'UPDATE users';
    let args = [];

    // Añadimos con '?' los valores de las claves para evitar código malicioso
    for (let [key, value] of Object.entries(user)) {
        sql += ', ?? = ?';
        args.push(key);
        args.push(value);
    }
    sql += ' WHERE id = ?';
    args.push(userId);

    const [res] = await pool.query(sql, args);

    // Reintroducimos ID y contraseña
    user.id = userId;
    user.password = password;

    // Devolvemos el número de filas afectadas (1)
    return res.affectedRows;
};

export default updateUserModel;
