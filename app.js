// Añadimos al proceso actual la lista de variables de entorno del fichero "".env"
import 'dotenv/config';

// Importamos dependencias
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// Importamos las rutas
import {
    alertsRoutes,
    locationsRoutes,
    preferencesRoutes,
    usersRoutes,
} from './src/routes';

// Importamos las variables de entorno necesarias
const { PORT } = process.env;

// ------------------------------------------

// Generamos el servidor
const app = express();

app.use(cors()); // Previene problemas de conexión entre cliente y servidor
app.use(morgan('dev')); // Muestra por consola información sobre la petición entrante
app.use(express.json()); // Middleware que parsea el body en formato JSON de las peticiones

// Middlewares que le indican a Express dónde están las rutas (aquí les ponemos los prefijos)
app.use('/api/users', usersRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/preferences', preferencesRoutes);
app.use('/api/alerts', alertsRoutes);

// Middeware de manejo de errores
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    // httpStatus es una propiedad que generamos y le damos valor; por defecto los errores no la tienen. Si le hemos dado un código de error, se mostrará; si no, hacemos que devuelva 500, que es un error indeterminado
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

// Middleware de ruta no encontrada
app.use((req, res) => {
    res.status(404).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

// Le indicamos al servidor que escuche peticiones en el puerto dado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
