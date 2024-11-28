/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      // NOTA: Ya que Tailwind utiliza "font-sans" de forma predeterminada en el cuerpo (<body>), podemos asignarle aquí a la clave "sans" una fuente de nuestra preferencia para establecerla por defecto a toda la página. Si queremos usar otras fuentes, las especificamos en los elementos concretos (encabezados, números...).
      sans: ['Inter', 'sans-serif'],
      poppins: ['Poppins', 'sans-serif'],
      montserrat: ['Montserrat', 'sans-serif'],
    },
    colors: {
      whitegray: '#F9FAFB', // Fondo principal, blanco suave
      graylight: '#F3F4F6', // Fondo de tarjetas y elementos secundarios
      graydark: '#1F2937', // Texto principal, gris oscuro
      gray: '#6B7280', // Texto secundario, gris medio

      // Colores para alertas
      alert: {
        low: '#93C5FD', // Alerta baja, azul claro
        moderate: '#F59E0B', // Alerta moderada, amarillo cálido
        high: '#EF4444', // Alerta alta, rojo
        critical: '#B91C1C', // Alerta crítica, rojo oscuro
      },

      // Colores para estados del tiempo
      weather: {
        sunny: '#FBBF24', // Soleado, amarillo dorado
        cloudy: '#9CA3AF', // Nublado, gris claro
        storm: '#93C5FD', // Tormenta, azul suave
        night: '#1E293B', // Noche, azul oscuro
      },

      // Colores de botones y enlaces
      action: {
        primary: '#2563EB', // Botón principal, azul vibrante
        secondary: '#10B981', // Botón secundario, verde
        link: '#3B82F6', // Enlaces, azul claro
      },
    },
  },
  plugins: [],
};
