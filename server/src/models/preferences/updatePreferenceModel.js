import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que actualiza una preferencia en la BD. La única clave obligatoria del JSON es ID; todos los demás campos solo serán necesarios en caso de querer actualizar su valor
const updatePreferenceModel = async (preference) => {
    const pool = await getPool();

    // El campo ID es obligatorio
    if (!preference.id) return;

    // Vamos a quitar el campo ID del JSON, porque con un bucle 'for' recorreremos los demás para insertarlos en la consulta SQL. Así evitamos tener que comprobar en cada iteración que no se meta la clave ID. Una vez terminamos la función, lo reincluimos en el JSON
    const preferenceId = preference.id;
    delete preference.id;

    /* // NOTA: Convertimos los valores booleanos a TINYINT (1 para true, 0 para false)
    for (let key in preference) {
        if (key === 'active') {
            preference[key] = preference[key] ? 1 : 0;
        }
    } */

    // Actualizamos (no hace falta 'SET modifiedAt = NOW()' porque ya el campo lo hace automáticamente en initDb)
    let sql = 'UPDATE preferences SET';
    let args = [];

    // Construimos la parte dinámica de la consulta
    let first = true; // Para manejar la primera iteración y evitar añadir una coma inicial
    for (let [key, value] of Object.entries(preference)) {
        sql += first ? ' ?? = ?' : ', ?? = ?'; // Añadimos coma solo después de la primera clave
        args.push(key);
        args.push(value);
        first = false;
    }
    sql += ' WHERE id = ?'; // Condición WHERE
    args.push(preferenceId);

    // Ejecutamos la consulta
    const [res] = await pool.query(sql, args);

    // Reintroducimos ID
    preference.id = preferenceId;

    // Devolvemos el número de filas afectadas (1)
    return res.affectedRows;
};

export default updatePreferenceModel;
