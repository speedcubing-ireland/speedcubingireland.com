import Image from 'next/image';
import Link from 'next/link';
import UTwistLogo from '../../public/logos/utwistcubes-logo.png';
import UTwistLogoDark from '../../public/logos/utwistcubes-logo-dark.png';
import { useLightDarkOption } from '../../utils/theme-hooks';

function Sponsors() {
  const uTwistLogo = useLightDarkOption(UTwistLogo, UTwistLogoDark);

  return (
    <div className="bg-base-200 hero">
      <div className="hero-content text-center">
        <div className="this-is-here-to-make-layout-work">
          <h1 className="text-3xl font-bold pb-4 pt-2">Speedcubing Ireland is proudly supported by our sponsors</h1>
          <Link href="https://www.utwistcubes.com/" className="btn btn-ghost">
            <Image
              priority
              src={uTwistLogo}
              alt="UTwistCubes Logo"
              height={48}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
