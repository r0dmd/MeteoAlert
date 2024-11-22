import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que selecciona una ubicación concreta de un usuario concreto
const selectLocationByIdsModel = async (locationId, userId) => {
    const pool = await getPool();

    const [location] = await pool.query(
        `SELECT * FROM locations WHERE id = ? AND userId = ?`,
        [locationId, userId],
    );

    // Devuelve un array de objetos en el que solo habrá 1 objeto, luego seleccionamos la posición 0 para quedarnos solo con el objeto y no el array con objeto
    return location;
};

export default selectLocationByIdsModel;
