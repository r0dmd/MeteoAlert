import { useDocumentTitle } from '../hooks/index.js';

const AboutPage = () => {
  useDocumentTitle('Acerca de');

  return (
    <div className="container-main text-darkgray">
      <div className="welcome-text">
        <h1 className="font-poppins text-2xl text-darkgray sm:text-3xl lg:text-4xl">
          Acerca de Nosotros
        </h1>
      </div>
      <div className="alert-container">
        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            ¿Quiénes Somos?
          </h2>
          <p className="mt-2">
            Somos una empresa comprometida con ofrecer soluciones accesibles y
            de alta calidad en servicios meteorológicos para el público general.
            Nuestro equipo está formado por profesionales apasionados que
            trabajan para superar las expectativas de nuestros clientes.
          </p>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            Nuestra Misión
          </h2>
          <p className="mt-2">
            Nuestra misión es proporcionar servicios y productos excepcionales
            que impacten positivamente la vida de nuestros clientes y
            comunidades. Creemos en la importancia de la innovación, la
            sostenibilidad y la excelencia.
          </p>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            Nuestros Valores
          </h2>
          <ul className="list-disc pl-5">
            <li className="list-text">
              Integridad: Actuamos con honestidad y ética en todo lo que
              hacemos.
            </li>
            <li className="list-text">
              Innovación: Buscamos constantemente nuevas formas de mejorar.
            </li>
            <li className="list-text">
              Compromiso: Estamos dedicados a la satisfacción de nuestros
              clientes.
            </li>
            <li className="list-text">
              Colaboración: Fomentamos un entorno de trabajo inclusivo y
              respetuoso.
            </li>
          </ul>
        </section>

        <section className="description-text my-4">
          <h2 className="font-poppins text-xl text-sunnyyellow">
            Nuestro Equipo
          </h2>
          <p className="mt-2">
            Contamos con un equipo diverso y talentoso que comparte una visión
            común de excelencia. Cada miembro aporta habilidades únicas que nos
            ayudan a alcanzar nuestros objetivos.
          </p>
        </section>

        <footer className="my-6 text-center text-gray">
          <p>
            ¿Quieres saber más? Contáctanos en{' '}
            <a
              href="mailto:info@ejemplo.com"
              className="text-linkblue underline hover:text-skyblue"
            >
              info@ejemplo.com
            </a>
            . ¡Estaremos encantados de atenderte!
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;
