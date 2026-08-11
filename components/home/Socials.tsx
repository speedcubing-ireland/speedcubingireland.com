import { faDiscord, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { DISCORD_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../../utils/constants';

function Socials() {
  return (
    <div className="bg-primary text-primary-content">
      <div className="max-w-7xl mx-auto py-12 lg:py-16 px-8 lg:flex lg:items-center">
        <div className="lg:w-0 lg:flex-1">
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl" id="newsletter-headline">
            Follow us on social media!
          </h2>
          <p className="mt-3 max-w-3xl text-lg leading-6">
            Stay up-to-date on the latest Speedcubing Ireland
            competitions and news with our Facebook and Instagram pages,
            or join our Discord communty!
          </p>
        </div>
        <div className="mt-8 lg:mt-0 lg:ml-8">
          <Link className="btn btn-ghost text-5xl" href={FACEBOOK_URL} aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
          <Link className="btn btn-ghost text-5xl" href={INSTAGRAM_URL} aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </Link>
          <Link className="btn btn-ghost text-5xl" href={DISCORD_URL} aria-label="Discord">
            <FontAwesomeIcon icon={faDiscord} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Socials;
