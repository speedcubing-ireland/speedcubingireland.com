import {
  faDiscord, faFacebook, faGithub, faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import WhiteLogo from '../../public/logos/speedcubing-ireland-logo-outline.svg';
import { DISCORD_URL, FACEBOOK_URL, INSTAGRAM_URL } from '../../utils/constants';

function Footer() {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div>
        <WhiteLogo className="w-20 h-20" />
        <p>
          Speedcubing Ireland
          <br />
          <a href="https://github.com/speedcubing-ireland/speedcubingireland.com">
            <FontAwesomeIcon icon={faGithub} />
            {' '}
            Developed by
            {' '}
            <span className="font-bold">Speedcubing Ireland&apos;s Software Team</span>
          </a>
        </p>
      </div>
      <div>
        <span className="footer-title">Social</span>
        <div className="grid grid-flow-col gap-4 text-2xl">
          <a aria-label="Facebook link" href={FACEBOOK_URL}><FontAwesomeIcon icon={faFacebook} /></a>
          <a aria-label="Instagram link" href={INSTAGRAM_URL}><FontAwesomeIcon icon={faInstagram} /></a>
          <a aria-label="Discord link" href={DISCORD_URL}><FontAwesomeIcon icon={faDiscord} /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
