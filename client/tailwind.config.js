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
      lightgray: '#F3F4F6', // Fondo de tarjetas y elementos secundarios
      darkgray: '#1F2937', // Texto principal, gris oscuro
      gray: '#6B7280', // Texto secundario, gris medio

      // Colores para alertas
      lightblue: '#93C5FD', // Alerta baja, azul claro
      warmyellow: '#F59E0B', // Alerta moderada, amarillo cálido
      red: '#EF4444', // Alerta alta, rojo
      darkred: '#B91C1C', // Alerta crítica, rojo oscuro

      // Colores para estados del tiempo
      sunnyyellow: '#FBBF24', // Soleado, amarillo dorado
      cloudygray: '#9CA3AF', // Nublado, gris claro
      stormblue: '#93C5FD', // Tormenta, azul suave
      nightblue: '#1E293B', // Noche, azul oscuro

      // Colores de botones y enlaces
      vibrantblue: '#2563EB', // Botón principal, azul vibrante
      green: '#10B981', // Botón secundario, verde
      linkblue: '#3B82F6', // Enlaces, azul claro
    },
  },
  plugins: [],
};
