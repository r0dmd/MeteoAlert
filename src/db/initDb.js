import 'dotenv/config';
import getPool from './getPool.js';

// ------------------------------------------

const main = async () => {
    try {
        const pool = await getPool();

        // Borramos tablas en orden inverso para evitar problemas de FK
        console.log('Borrando tablas...');
        await pool.query(
            'DROP TABLE IF EXISTS alerts, preferences, locations, users',
        );

        console.log('Generando tablas...');

        // Tabla de usuarios
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                username VARCHAR(30) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100),
                role ENUM('admin', 'normal') DEFAULT 'normal',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
                lastAuthUpdate DATETIME
            )
        `);

        // Tabla de ubicaciones
        await pool.query(`
            CREATE TABLE IF NOT EXISTS locations (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                location VARCHAR(100),
                latitude DECIMAL(10, 7),
                longitude DECIMAL(10, 7),
                description VARCHAR(255),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de preferencias de alerta
        await pool.query(`
            CREATE TABLE IF NOT EXISTS preferences (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                type ENUM('lluvia', 'tormenta', 'inundación', 'nieve', 'granizo', 'hielo', 'deslizamiento', 'terremoto', 'viento', 'polen', 'radiación', 'incendio', 'niebla', 'oleaje', 'frío extremo', 'calor extremo') NOT NULL,
                threshold DECIMAL(5, 2),
                active BOOLEAN DEFAULT TRUE,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Tabla de historial de alertas
        await pool.query(`
            CREATE TABLE IF NOT EXISTS alerts (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                userId INT UNSIGNED NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                locationId INT UNSIGNED NOT NULL,
                FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
                type ENUM('lluvia', 'tormenta', 'inundación', 'nieve', 'granizo', 'hielo', 'deslizamiento', 'terremoto', 'viento', 'polen', 'radiación', 'incendio', 'niebla', 'oleaje', 'frío extremo', 'calor extremo') NOT NULL,
                value DECIMAL(5, 2),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        console.log('Tablas generadas correctamente.');
        process.exit(0);
    } catch (err) {
        // Pasamos el error por consola y cerramos el proceso con código 1 indicando que hubo un error
        console.error(err);
        process.exit(1);
    }
};

main();
