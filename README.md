## Endpoints de datos meteorológicos

-   **GET** - ["/api/weather/data"] - Obtiene un los datos meteorológicos de Open-Meteo. No requiere autenticación.

## Endpoints de usuarios

-   **POST** - ["/api/users/register"] - Genera un nuevo usuario. No requiere autenticación.
-   **POST** - ["/api/users/login"] - Inicia sesión con un usuario existente. No requiere autenticación.
-   **GET** - ["/api/users/profile"] - Obtiene los datos del usuario logueado. Requiere autenticación.
-   **PUT** - ["/api/users/profile/update"] - Actualiza los datos de un usuario. Requiere autenticación.
-   **PATCH** - ["/api/users/profile/update/password"] - Actualiza la contraseña de un usuario. Requiere autenticación.
-   **GET** - ["/api/users"] - Obtiene un listado de todos los usuarios para gestionarlos. Requiere autenticación de administrador.
-   **DELETE** - ["/api/users/:userId/delete"] - Elimina los datos de un usuario. Requiere autenticación de administrador.

## Endpoints de ubicaciones

-   **POST** - ["/api/locations/new"] - Genera una nueva ubicación. Requiere autenticación.
-   **GET** - ["/api/locations"] - Obtiene un listado de todas las ubicaciones de un usuario. Requiere autenticación.
-   **GET** - ["/api/locations/:locationId"] - Obtiene los datos de una ubicación específica. Requiere autenticación.
-   **PUT** - ["/api/locations/:locationId/update"] - Actualiza los datos de una ubicación. Requiere autenticación.
-   **DELETE** - ["/api/locations/:locationId/delete"] - Elimina una ubicación. Requiere autenticación.

## Endpoints de preferencias

-   **POST** - ["/api/preferences/new"] - Genera las preferencias de alertas de un usuario. Requiere autenticación.
-   **GET** - ["/api/preferences"] - Obtiene todas las preferencias de alertas de un usuario. Requiere autenticación.
-   **PUT** - ["/api/preferences/:preferenceId"] - Actualiza una preferencia de alerta de un usuario. Requiere autenticación.
-   **DELETE** - ["/api/preferences/:preferenceId/delete"] - Elimina las preferencias de alertas de un usuario. Requiere autenticación.

## Endpoints de alertas

-   **POST** - ["/api/alerts/new"] - Genera una alerta meteorológica. Requiere autenticación.
-   **GET** - ["/api/alerts"] - Obtiene un listado de todas las alertas declaradas para un usuario según sus preferencias de alerta. Requiere autenticación.
-   **DELETE** - ["/api/alerts/:alertId/delete"] - Elimina una alerta meteorológica. Requiere autenticación.
