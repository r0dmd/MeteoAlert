import { NavLink } from 'react-router-dom';

// React icons
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';

// ------------------------------------------
const Footer = () => {
  return (
    <footer className="h-fit border-t-8 border-t-sunnyyellow bg-darkgray text-whitegray">
      <div className="mx-auto flex h-full flex-wrap justify-center gap-8 p-6">
        {/* MeteoAlert Links */}
        <ul className="flex flex-col items-center gap-4 text-center">
          <li className="font-poppins">MeteoAlert</li>
          <NavLink title="Acerca de" to="/about">
            <li className="">Acerca de</li>
          </NavLink>
          <NavLink title="Política de privacidad" to="/privacy">
            <li>Política de privacidad</li>
          </NavLink>
        </ul>

        {/* Redes sociales */}
        <ul className="flex flex-col items-center gap-4 text-center">
          <li className="font-poppins">Síguenos en</li>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
            >
              <FaYoutube className="h-8 w-8 text-red transition-transform hover:scale-110 hover:text-whitegray" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter"
            >
              <FaTwitter className="h-8 w-8 text-skyblue transition-transform hover:scale-110 hover:text-whitegray" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="h-8 w-8 text-green transition-transform hover:scale-110 hover:text-whitegray" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="h-8 w-8 text-vibrantblue transition-transform hover:scale-110 hover:text-whitegray" />
            </a>
          </div>
        </ul>
      </div>
      <p className="grow p-2 text-center font-montserrat text-sm italic">
        r0dmd &copy; 2024
      </p>
    </footer>
  );
};

export default Footer;
