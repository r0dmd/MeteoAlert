import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que selecciona una preferencia concreta de un usuario concreto
const selectPreferenceByIdsModel = async (preferenceId, userId) => {
    const pool = await getPool();

    const [preference] = await pool.query(
        `SELECT * FROM preferences WHERE id = ? AND userId = ?`,
        [preferenceId, userId],
    );

    // Devuelve un array de objetos en el que solo habrá 1 objeto, luego seleccionamos la posición 0 para quedarnos solo con el objeto y no el array con objeto
    return preference;
};

export default selectPreferenceByIdsModel;
