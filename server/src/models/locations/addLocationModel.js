import getPool from '../../db/getPool.js'; // Conexión a la BD

// ------------------------------------------
// Función que inserta una nueva ubicación en la BD
const addLocationModel = async (
    userId,
    location,
    latitude,
    longitude,
    description,
) => {
    const pool = await getPool();

    const [res] = await pool.query(
        `INSERT INTO locations(userId, location, latitude, longitude, description) VALUES (?, ?, ?, ?, ?)`,
        [userId, location, latitude, longitude, description],
    );

    // Devolvemos el ID de la fila añadida
    return res.insertId;
};

export default addLocationModel;
