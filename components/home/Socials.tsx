import { faDiscord, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function Socials() {
  return (
    <div className="bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto py-12 lg:py-16 px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" id="newsletter-headline">
            Segueix-nos a les xarxes socials!
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6">
            Estigues a l'aguait de les darreres competicions a Catalunya i més notícies als nostres comptes de Facebook i Instagram, o uneix-te al nostre Discord!
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <Link className="btn btn-ghost text-5xl" href="https://www.facebook.com/SpeedcubingIreland" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link className="btn btn-ghost text-5xl" href="https://www.instagram.com/speedcubingireland/" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link className="btn btn-ghost text-5xl" href="https://discord.gg/FCdnfetK7c" aria-label="Discord">
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Socials;
