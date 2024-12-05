import 'dotenv/config';
import getPool from './getPool.js';

import bcrypt from 'bcrypt';
const SALT_ROUNDS = 10; // Ajusta el número de salt rounds para el hash

// ------------------------------------------
// Consultas de inserción de datos de prueba
const insertDummyData = async () => {
    try {
        const pool = await getPool();

        console.log('Insertando datos de prueba...');

        // Contraseñas encriptadas
        const passwordAdmin = await bcrypt.hash('adminadmin', SALT_ROUNDS);
        const passwordGeo = await bcrypt.hash('geogeogeo', SALT_ROUNDS);
        const passwordUser3 = await bcrypt.hash('password3', SALT_ROUNDS);

        // Insertar usuarios de prueba
        await pool.query(
            `
            INSERT INTO users (username, email, password, avatar, role) VALUES
            ('admin', 'admin@admin.com', ?, 'avatar1.jpg', 'admin'),
            ('geo', 'geo@geo.com', ?, 'avatar2.jpg', 'normal'),
            ('user3', 'user3@example.com', ?, 'avatar3.jpg', 'normal')
        `,
            [passwordAdmin, passwordGeo, passwordUser3],
        );

        // Insertar ubicaciones de prueba
        await pool.query(`
            INSERT INTO locations (userId, location, latitude, longitude, description) VALUES
            (1, 'Location A', 40.416775, -3.703790, 'Description A'),
            (2, 'Location B', 34.052235, -118.243683, 'Description B'),
            (3, 'Location C', 51.507351, -0.127758, 'Description C')
        `);

        // Insertar preferencias de alerta de prueba
        await pool.query(`
            INSERT INTO preferences (userId, type, threshold) VALUES
            (1, 'precipitación', 10.5),
            (2, 'viento', 22),
            (3, 'temperatura', 35)
        `);

        // Insertar historial de alertas de prueba
        await pool.query(`
            INSERT INTO alerts (userId, locationId, type, value) VALUES
            (1, 1, 'precipitación', 12.5),
            (2, 2, 'viento', 39),
            (3, 3, 'temperatura', 38)
        `);

        console.log('Datos de prueba insertados correctamente.');
        process.exit(0);
    } catch (err) {
        console.error('Error al insertar datos de prueba:', err);
        process.exit(1);
    }
};

insertDummyData();
