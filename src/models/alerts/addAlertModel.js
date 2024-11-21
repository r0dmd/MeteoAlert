import getPool from '../../db/getPool.js'; // Conexión a la BD
import { generateErrorUtil } from '../../utils/index.js';

// ------------------------------------------
// Función que inserta una nueva alerta en la BD cuando se alcanza el umbral de la preferencia activa definido por el usuario
const addAlertModel = async (userId, type, value) => {
    const pool = await getPool();

    // Obtener la ubicación asociada al usuario (suponiendo que hay una sola ubicación única por usuario)
    const [locations] = await pool.query(
        'SELECT id FROM locations WHERE userId = ? LIMIT 1',
        [userId],
    );

    // Si no se encuentra una ubicación para el usuario, se lanza un error
    if (locations.length === 0)
        generateErrorUtil(
            'No se encontró una ubicación asociada a este usuario.',
        );

    const locationId = locations[0].id; // Asumimos que la ubicación está disponible

    // Insertamos la nueva alerta en la tabla 'alerts'
    const [res] = await pool.query(
        `INSERT INTO alerts(userId, locationId, type, value) VALUES (?, ?, ?, ?)`,
        [userId, locationId, type, value],
    );

    // Devolvemos el ID de la fila añadida
    return res.insertId;
};

export default addAlertModel;
