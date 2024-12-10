import { useDocumentTitle } from '../hooks/index.js';

const PrivacyPolicyPage = () => {
  useDocumentTitle('Política de Privacidad');

  return (
    <div className="container-main text-darkgray">
      <div className="welcome-text">
        <h1 className="font-poppins text-2xl text-darkgray sm:text-3xl lg:text-4xl">
          Política de Privacidad
        </h1>
      </div>
      <div className="alert-container">
        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            1. Introducción
          </h2>
          <p className="mt-2">
            Esta política de privacidad explica cómo recopilamos, utilizamos y
            protegemos su información personal. Al utilizar nuestros servicios,
            usted acepta los términos descritos en este documento.
          </p>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            2. Información que Recopilamos
          </h2>
          <ul className="list-disc pl-5">
            <li className="list-text">
              Información de contacto, como nombre, correo electrónico y número
              de teléfono.
            </li>
            <li className="list-text">
              Datos de navegación, como dirección IP y actividad en nuestro
              sitio.
            </li>
            <li className="list-text">
              Información proporcionada voluntariamente a través de formularios
              o encuestas.
            </li>
          </ul>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            3. Cómo Utilizamos su Información
          </h2>
          <p className="mt-2">
            Utilizamos su información para brindar y mejorar nuestros servicios,
            personalizar su experiencia y cumplir con requisitos legales. Nunca
            compartiremos su información sin su consentimiento, salvo cuando sea
            requerido por la ley.
          </p>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            4. Protección de Datos
          </h2>
          <p className="mt-2">
            Implementamos medidas de seguridad técnicas y organizativas para
            proteger su información contra acceso no autorizado, pérdida o
            alteración.
          </p>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            5. Sus Derechos
          </h2>
          <p className="mt-2">
            Usted tiene derecho a acceder, corregir o eliminar su información
            personal. Puede contactarnos en cualquier momento para ejercer estos
            derechos.
          </p>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            6. Cambios en esta Política
          </h2>
          <p className="mt-2">
            Podemos actualizar esta política de privacidad ocasionalmente.
            Publicaremos cualquier cambio en esta página e informaremos a los
            usuarios si es necesario.
          </p>
        </section>

        <footer className="my-6 text-center text-gray">
          <p>
            Si tiene alguna pregunta sobre esta política, contáctenos en{' '}
            <a
              href="mailto:contacto@ejemplo.com"
              className="text-linkblue underline hover:text-skyblue"
            >
              contacto@ejemplo.com
            </a>
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
