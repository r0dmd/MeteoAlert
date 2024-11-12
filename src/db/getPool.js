import mysql from 'mysql2/promise';
import { generateErrorUtil } from '../utils/index.js';

// Obtenemos las variables de entorno necesarias
const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

// ------------------------------------------
// Variable que almacenará un grupo de conexiones con la BD. Se declara fuera de la función, para que solo se configure una vez y se reutilice en cada llamada a getPool, evitando que se reinicialice cada vez que se llama
let pool;

// Función que retorna el grupo de conexiones
const getPool = async () => {
    try {
        if (!pool) {
            // NOTA: En el código de clase de 'Diario de Viajes' esta parte tenía un problema: aunque la BD se generaba si no existía, no se configuraba en la propia conexión, lo que causaba problemas luego al ejecutar consultas (David mencionó la solución en clase pero no llegó a corregirlo en el repositorio)

            // Primero, establecemos una conexión temporal para verificar y generar la BD si no existe, sin especificar la BD para evitar errores si aún no ha sido generada
            // NOTA: Una alternativa, como hicimos en HACK-A-TON, es declarar aquí 'pool' sin 'database', generar la BD y luego añadirle 'database' para el 'pool' "definitivo", pero no es la mejor solución. Crear múltiples instancias de 'pool' puede llevar a problemas de rendimiento, reutilización y memoria, así que siempre es mejor una única conexión persistente e inicializarlo solo cuando sea necesario
            const connection = await mysql.createConnection({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
            });

            // Añadimos la BD si no existe, envolviendo el nombre en backticks (``) por si contiene caracteres especiales, y cerramos la conexión temporal
            await connection.query(
                `CREATE DATABASE IF NOT EXISTS \`${MYSQL_DB}\``,
            );
            await connection.end();

            // Ahora configuramos el 'pool' con la BD ya generada. Esto evita errores de "desconexión" de la BD en las consultas, ya que todas las conexiones del 'pool' apuntarán a la BD correcta. Esto hace innecesaria la línea de `await pool.query(`USE ${MYSQL_DB}`)`, así que la hemos eliminado
            pool = mysql.createPool({
                host: MYSQL_HOST,
                user: MYSQL_USER,
                password: MYSQL_PASS,
                database: MYSQL_DB, // Seleccionamos la BD al crear el pool
                timezone: 'Z',
                // Configuraciones opcionales para evitar saturación en situaciones de alta demanda
                waitForConnections: true, // Espera a que haya conexiones libres en lugar de rechazar
                connectionLimit: 10, // Limita el número de conexiones en el pool
                queueLimit: 0, // No limita el número de conexiones en cola
            });
        }

        // Retornamos 'pool' directamente, ya que es un objeto de conexión listo para uso inmediato en consultas asíncronas
        return pool;
    } catch (err) {
        console.error(err);
        generateErrorUtil(
            'No se ha podido establecer conexión con la base de datos',
            503,
        );
    }
};

export default getPool;
