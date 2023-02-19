import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import SILogo from '../../public/logos/speedcubing-ireland-logo.svg';
import SILogoDark from '../../public/logos/speedcubing-ireland-logo-dark.svg';
import WCALogo from '../../public/logos/wca-logo.svg';
import WCALogoDark from '../../public/logos/wca-logo-dark.svg';
// import UTwistLogo from '../../public/logos/utwistcubes-logo.png';
// import UTwistLogoDark from '../../public/logos/utwistcubes-logo-dark.png';

import { useLightDarkOption } from '../../utils/theme';
import { WCA_URL } from '../../utils/constants';

interface SponsorData {
  name: string;
  lightLogo: StaticImageData;
  darkLogo: StaticImageData;
  link: string;
}

// Disable sponsor logos for now
// const sponsors: SponsorData[] = [
//   {
//     name: 'UTwistCubes',
//     lightLogo: UTwistLogo,
//     darkLogo: UTwistLogoDark,
//     link: 'https://www.utwistcubes.com/',
//   },
// ];

const sponsors: SponsorData[] = [];

function Sponsor({ data, dark }: { data: SponsorData, dark: boolean }) {
  const imgSrc = dark ? data.darkLogo : data.lightLogo;
  return (
    <Link href={data.link} className="btn btn-ghost">
      <Image
        priority
        src={imgSrc}
        alt={`Sponsor logo for ${data.name}`}
        height={48}
      />
    </Link>
  );
}

function AllSponsors({ dark }: { dark: boolean }) {
  let tagline = '';

  if (sponsors.length > 0) {
    tagline = 'Speedcubing Ireland is proudly supported by our sponsor';
  }

  if (sponsors.length > 1) tagline += 's';
  return (
    <>
      <h1 className="text-3xl font-bold pb-4 pt-2">{tagline}</h1>
      {sponsors.map((sponsor) => (<Sponsor key={sponsor.name} data={sponsor} dark={dark} />))}
    </>
  );
}

function SelfSponsor({ dark }: { dark: boolean }) {
  return (
    <>
      <Link href="/" className="btn btn-ghost h-full p-2 mx-4">
        {dark ? <SILogoDark className="h-16" /> : <SILogo className="h-16" />}
      </Link>
      <Link href={WCA_URL} className="btn btn-ghost h-full p-2 mx-4">
        {dark ? <WCALogoDark className="h-16" /> : <WCALogo className="h-16" />}
      </Link>
    </>
  );
}

function Sponsors() {
  const dark = useLightDarkOption(false, true);
  return (
    <div className="bg-base-100 hero">
      <div className="hero-content text-center">
        <div className="this-is-here-to-make-layout-work">
          {sponsors.length > 0 && <AllSponsors dark={dark} />}
          {sponsors.length === 0 && <SelfSponsor dark={dark} />}
        </div>
      </div>
    </div>
  );
}

export default Sponsors;
