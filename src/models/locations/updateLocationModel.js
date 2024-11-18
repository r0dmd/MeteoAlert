import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que actualiza una ubicación en la BD. La única clave obligatoria del JSON es ID; todos los demás campos solo serán necesarios en caso de querer actualizar su valor
const updateLocationModel = async (location) => {
    const pool = await getPool();

    // El campo ID es obligatorio
    if (!location.id) return;

    // Vamos a quitar el campo ID del JSON, porque con un bucle 'for' recorreremos los demás para insertarlos en la consulta SQL. Así evitamos tener que comprobar en cada iteración que no se meta la clave ID. Una vez terminamos la función, lo reincluimos en el JSON
    const locationId = location.id;
    delete location.id;

    // Actualizamos (no hace falta 'SET modifiedAt = NOW()' porque ya el campo lo hace automáticamente en initDb)
    let sql = 'UPDATE locations SET';
    let args = [];

    // Construimos la parte dinámica de la consulta
    let first = true; // Para manejar la primera iteración y evitar añadir una coma inicial
    for (let [key, value] of Object.entries(location)) {
        sql += first ? ' ?? = ?' : ', ?? = ?'; // Añadimos coma solo después de la primera clave
        args.push(key);
        args.push(value);
        first = false;
    }
    sql += ' WHERE id = ?'; // Condición WHERE
    args.push(locationId);

    // Ejecutamos la consulta
    const [res] = await pool.query(sql, args);

    // Reintroducimos ID
    location.id = locationId;

    // Devolvemos el número de filas afectadas (1)
    return res.affectedRows;
};

export default updateLocationModel;
