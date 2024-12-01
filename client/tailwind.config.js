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
      red: '#EF4444', // Alerta alta, rojo
      warmyellow: '#F59E0B', // Alerta moderada, amarillo cálido
      sunnyyellow: '#FBBF24', // Soleado, amarillo dorado
      green: '#10B981', // Botón secundario, verde
      skyblue: '#93C5FD', // Tormenta, azul suave
      linkblue: '#9ABEF9', // Enlaces, azul claro
      vibrantblue: '#2563EB', // Botón principal, azul vibrante
      nightblue: '#1E293B', // Noche, azul oscuro
      darkgray: '#1F2937', // Texto principal, gris oscuro
      gray: '#6B7280', // Texto secundario, gris medio
      cloudygray: '#9CA3AF', // Nublado, gris claro
      lightgray: '#F3F4F6', // Fondo de tarjetas y elementos secundarios
      whitegray: '#F9FAFB', // Fondo principal, blanco suave
    },
  },
  plugins: [],
};
