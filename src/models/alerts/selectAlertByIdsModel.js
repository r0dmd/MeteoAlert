import getPool from '../../db/getPool.js';

// ------------------------------------------
// Función que selecciona una alerta concreta de un usuario concreto
const selectAlertByIdsModel = async (alertId, userId) => {
    const pool = await getPool();

    const [alert] = await pool.query(
        `SELECT * FROM alerts WHERE id = ? AND userId = ?`,
        [alertId, userId],
    );

    // Devuelve un array de objetos en el que solo habrá 1 objeto, luego seleccionamos la posición 0 para quedarnos solo con el objeto y no el array con objeto
    return alert;
};

export default selectAlertByIdsModel;
