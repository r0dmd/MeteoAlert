# MeteoAlert

MeteoAlert es un proyecto desarrollado con **Node.js** y **Express** para el backend y **React Vite** para el frontend, usando **MySQL** para la gestión de la base de datos. 

Se trata de una aplicación web de alertas meteorológicas que le ofrece a los usuarios registrados alertas personalizadas y en tiempo real a partir de la información de la API [*Open-Meteo*](https://open-meteo.com/). 

Se incluye también en la carpeta raíz del proyecto una colección de **Postman** ya dispuesta con la que se pueden probar los endpoints directamente una vez el servidor se esté ejecutando.

## Requisitos

Antes de ejecutar el proyecto, es necesario tener instalados los siguientes programas:

1. **Node.js** (versión 16 o superior)
2. **MySQL** (o software alternativo compatible como DBeaver)

## Instalación

1. Clona este repositorio a tu máquina local:

   - Con **SSH**:

     ```
     git clone git@github.com:r0dmd/MeteoAlert.git
     ```

   - Con **HTTPS**:

     ```
     git clone https://github.com/r0dmd/MeteoAlert.git
     ```

   **Nota**: Si prefieres usar SSH, asegúrate de haber configurado previamente tus claves SSH en GitHub.


2. Navega a la carpeta del backend y ejecuta:

```
cd server
npm install
```

3. Navega a la carpeta del frontend y ejecuta:

```
cd client
npm install
```

4. En la carpeta **server**, genera un archivo `.env`, y basándote en el contenido del archivo `.env.example`, rellena los campos con los datos del entorno de ejecución particular. Luego, haz lo mismo en **client**, pero generando un archivo `.env.local` y a partir del `.env.local.example` (solo cambian los nombres de los archivos).

## Inicialización de la Base de Datos

Para inicializar la base de datos, ejecuta el siguiente comando en la carpeta **server**:

```
npm run initdb
```

Si deseas agregar datos de prueba a la base de datos, y de paso arrancar automáticamente el servidor, puedes ejecutar:

```
npm run initdummydb
```

## Ejecución

1. En la carpeta **server**, si no se ha ejecutado `npm run initdummydb` en el paso anterior:

```
npm run dev
```

2. En la carpeta **client**:

```
npm run dev
```

## Endpoints

### Endpoints de Datos Meteorológicos

| Método | Endpoint                | Descripción |
|--------|-------------------------|-------------|
| **GET**  | `/api/weather/data`      | Obtiene los datos meteorológicos de Open-Meteo. No requiere autenticación. |

### Endpoints de Usuarios

| Método | Endpoint                         | Descripción |
|--------|----------------------------------|-------------|
| **POST** | `/api/users/register`           | Genera un nuevo usuario. No requiere autenticación. |
| **POST** | `/api/users/login`              | Inicia sesión con un usuario existente. No requiere autenticación. |
| **GET**  | `/api/users/profile`            | Obtiene los datos del usuario logueado. Requiere autenticación. |
| **PUT**  | `/api/users/profile/update`     | Actualiza los datos de un usuario. Requiere autenticación. |
| **PATCH**| `/api/users/profile/update/password` | Actualiza la contraseña de un usuario. Requiere autenticación. |
| **GET**  | `/api/users`                    | Obtiene un listado de todos los usuarios para gestionarlos. Requiere autenticación de administrador. |
| **DELETE** | `/api/users/:userId/delete`   | Elimina los datos de un usuario. Requiere autenticación de administrador. |

### Endpoints de Ubicaciones

| Método | Endpoint                         | Descripción |
|--------|----------------------------------|-------------|
| **POST** | `/api/locations/new`            | Genera una nueva ubicación. Requiere autenticación. |
| **GET**  | `/api/locations`                | Obtiene un listado de todas las ubicaciones de un usuario. Requiere autenticación. |
| **GET**  | `/api/locations/:locationId`    | Obtiene los datos de una ubicación específica. Requiere autenticación. |
| **PUT**  | `/api/locations/:locationId/update` | Actualiza los datos de una ubicación. Requiere autenticación. |
| **DELETE** | `/api/locations/:locationId/delete` | Elimina una ubicación. Requiere autenticación. |

### Endpoints de Preferencias

| Método | Endpoint                         | Descripción |
|--------|----------------------------------|-------------|
| **POST** | `/api/preferences/new`          | Genera las preferencias de alertas de un usuario. Requiere autenticación. |
| **GET**  | `/api/preferences`              | Obtiene todas las preferencias de alertas de un usuario. Requiere autenticación. |
| **PUT**  | `/api/preferences/:preferenceId` | Actualiza una preferencia de alerta de un usuario. Requiere autenticación. |
| **DELETE** | `/api/preferences/:preferenceId/delete` | Elimina las preferencias de alertas de un usuario. Requiere autenticación. |

### Endpoints de Alertas

| Método | Endpoint                         | Descripción |
|--------|----------------------------------|-------------|
| **POST** | `/api/alerts/new`               | Genera una alerta meteorológica. Requiere autenticación. |
| **GET**  | `/api/alerts`                   | Obtiene un listado de todas las alertas declaradas para un usuario según sus preferencias de alerta. Requiere autenticación. |
| **DELETE** | `/api/alerts/:alertId/delete`   | Elimina una alerta meteorológica. Requiere autenticación. |

## Esquema de la Base de Datos

La base de datos está estructurada en las siguientes tablas:

| Tabla        | Descripción                                   |
|--------------|-----------------------------------------------|
| **users**    | Almacena la información de los usuarios (nombre, email, contraseña, etc.). |
| **locations**| Almacena las ubicaciones asociadas a los usuarios, incluyendo nombre, latitud y longitud. |
| **preferences** | Almacena las preferencias de alertas meteorológicas de los usuarios (temperatura, precipitación, viento, etc.). |
| **alerts**   | Almacena las alertas generadas para los usuarios basadas en sus preferencias de alerta. |

### SQL de Creación de Tablas

La base de datos se inicializa con el siguiente esquema de tablas:

```
-- Tabla de usuarios
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
);

-- Tabla de ubicaciones
CREATE TABLE IF NOT EXISTS locations (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    location VARCHAR(100) NOT NULL,
    latitude DECIMAL(10, 7),
    longitude DECIMAL(10, 7),
    description VARCHAR(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de preferencias de alerta
CREATE TABLE IF NOT EXISTS preferences (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    type ENUM('temperatura', 'precipitación', 'viento') NOT NULL,
    threshold DECIMAL(5, 2) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
    modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de historial de alertas
CREATE TABLE IF NOT EXISTS alerts (
    id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    userId INT UNSIGNED NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    locationId INT UNSIGNED NOT NULL,
    FOREIGN KEY (locationId) REFERENCES locations(id) ON DELETE CASCADE,
    type ENUM('temperatura', 'precipitación', 'viento') NOT NULL,
    value DECIMAL(5, 2),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
    modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);
```

## Dependencias

### Backend (server)

#### Dependencias:

- `axios`: Cliente HTTP para hacer peticiones.
- `bcrypt`: Librería para encriptar contraseñas.
- `cors`: Middleware para permitir solicitudes entre dominios.
- `dotenv`: Cargar variables de entorno desde archivos `.env`.
- `express`: Framework web para Node.js.
- `express-fileupload`: Middleware para manejar cargas de archivos.
- `joi`: Validación de datos de entrada.
- `jsonwebtoken`: Manejo de JSON Web Tokens.
- `moment`: Manejo de fechas y horas.
- `moment-timezone`: Manejo de zonas horarias con moment.js.
- `morgan`: Middleware para registro de solicitudes HTTP.
- `mysql2`: Cliente MySQL para Node.js.
- `node-cron`: Programación de tareas periódicas.
- `sharp`: Procesamiento de imágenes.

#### Dependencias de Desarrollo:

- `@eslint/js`: Configuración de ESLint para JavaScript.
- `eslint`: Herramienta para asegurar la calidad del código.
- `globals`: Definiciones de variables globales para ESLint.
- `nodemon`: Reinicia automáticamente la aplicación durante el desarrollo.
- `prettier`: Formateador de código.

### Frontend (client)

#### Dependencias:

- `jwt-decode`: Decodifica JSON Web Tokens.
- `particles.js`: Librería para animaciones de partículas en el navegador.
- `react`: Biblioteca para construir interfaces de usuario.
- `react-dom`: Soporte para el DOM en React.
- `react-hot-toast`: Notificaciones de tipo "toast" en React.
- `react-icons`: Iconos de React.
- `react-router-dom`: Manejo de rutas en aplicaciones React.
- `react-select`: Componente de selección flexible para React.
- `sweetalert2`: Librería para mostrar alertas estilizadas.

#### Dependencias de Desarrollo:

- `@eslint/js`: Configuración de ESLint para JavaScript.
- `@types/react`: Tipos para React en TypeScript.
- `@types/react-dom`: Tipos para ReactDOM en TypeScript.
- `@vitejs/plugin-react`: Plugin para usar React con Vite.
- `autoprefixer`: Añade prefijos automáticos a las reglas CSS.
- `eslint`: Herramienta para asegurar la calidad del código.
- `eslint-plugin-react`: Reglas específicas para React en ESLint.
- `eslint-plugin-react-hooks`: Reglas para los hooks de React en ESLint.
- `eslint-plugin-react-refresh`: Reglas para la integración de React Refresh en desarrollo.
- `vite`: Herramienta de construcción para el frontend.
