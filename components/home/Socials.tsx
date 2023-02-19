import { faDiscord, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

function Socials() {
  return (
    <div className="bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto py-12 lg:py-16 px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" id="newsletter-headline">
            Follow us on social media!
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6">
            Stay up-to-date on the latest Speedcubing Ireland
            competitions and news with our Facebook and Instagram pages,
            or join our Discord communty!
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <Link className="btn btn-ghost text-5xl" href="https://www.facebook.com/SpeedcubingIreland">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link className="btn btn-ghost text-5xl" href="https://www.instagram.com/speedcubingireland/">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link className="btn btn-ghost text-5xl" href="https://discord.gg/FCdnfetK7c">
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Socials;
