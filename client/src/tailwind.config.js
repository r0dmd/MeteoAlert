/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}' /* Todos los archivos con esas extensiones de todas las carpetas de src*/,
  ],
  theme: {
    extend: {
      fontFamily: {
        // La clave "sans" define la fuente predeterminada para la clase "font-sans" de Tailwind.
        // Al configurar "Inter" aquí, automáticamente se aplica como la fuente principal en toda la página,
        // ya que Tailwind utiliza "font-sans" de forma predeterminada en el cuerpo (<body>).
        // Esto nos permite evitar especificar explícitamente la fuente en cada elemento y, al mismo tiempo,
        // poder usar otras fuentes en partes específicas de la interfaz.
        sans: ['Inter', 'sans-serif'], // Texto por defecto (regular)
        poppins: ['Poppins', 'sans-serif'], // Encabezados (bold)
        montserrat: ['Montserrat', 'sans-serif'], // Números y datos clave (semi-bold)
      },
    },
  },
  plugins: [],
};
