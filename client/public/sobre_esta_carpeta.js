// En un proyecto de React con Vite, existen dos carpetas principales para manejar activos estáticos: "assets" y "public".

// 1. Carpeta "public":
//    - Se encuentra en la raíz del proyecto.
//    - Contiene archivos estáticos que no necesitan ser procesados ni optimizados por Vite.
//    - Los archivos en esta carpeta se sirven "tal cual" y son accesibles directamente a través de la URL base del sitio.
//      Por ejemplo, un archivo "public/logo.png" estará disponible en la URL "/logo.png".
//    - Ideal para:
//        * Favicons e íconos de aplicaciones.
//        * Archivos como "robots.txt" o "manifest.json".
//        * Imágenes, videos o documentos que necesitan URLs fijas.
//        * Scripts externos que no se pueden importar en el código.

// 2. Carpeta "assets":
//    - Se encuentra generalmente dentro de "src" (por ejemplo, src/assets).
//    - Contiene archivos que necesitan ser procesados por Vite (como imágenes, fuentes o videos).
//    - Los activos en esta carpeta son optimizados automáticamente por Vite (por ejemplo, se les agrega un hash para el cacheo).
//    - Para usar estos activos, se importan directamente en los archivos JavaScript, TypeScript, CSS, etc. Ejemplo:
//          import logo from './assets/logo.png';
//          <img src={logo} alt="Logo" />
//    - Estos archivos no están accesibles directamente a través de la URL del navegador.

// En resumen:
// - Usa "public" para archivos estáticos que no necesitan procesamiento y deben tener URLs públicas fijas.
// - Usa "assets" para archivos procesados dentro del bundle.

