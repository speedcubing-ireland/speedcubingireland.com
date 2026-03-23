import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import SILogo from '../../public/logos/speedcubing-ireland-logo.svg';
import SILogoDark from '../../public/logos/speedcubing-ireland-logo-dark.svg';
import WCALogo from '../../public/logos/wca-logo.svg';
import WCALogoDark from '../../public/logos/wca-logo-dark.svg';

import { useLightDarkOption } from '../../utils/theme';
import { WCA_URL } from '../../utils/constants';

interface SponsorData {
  name: string;
  lightLogo: StaticImageData;
  darkLogo: StaticImageData;
  link: string;
}

const sponsors: SponsorData[] = [];

function Sponsor({ data, dark }: { data: SponsorData, dark: boolean }) {
  const imgSrc = dark ? data.darkLogo : data.lightLogo;
  return (
    <Link href={data.link} className="btn btn-ghost h-auto p-3">
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
      <h3 className="text-sm font-bold uppercase tracking-wider text-base-content/40 mb-4">
        {tagline}
      </h3>
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {sponsors.map((sponsor) => (
          <Sponsor key={sponsor.name} data={sponsor} dark={dark} />
        ))}
      </div>
    </>
  );
}

function SelfSponsor({ dark }: { dark: boolean }) {
  return (
    <div className="flex items-center justify-center gap-6 flex-wrap">
      <Link href="/" className="btn btn-ghost h-auto p-3" aria-label="Speedcubing Ireland Logo">
        {dark ? <SILogoDark className="h-14" /> : <SILogo className="h-14" />}
      </Link>
      <Link href={WCA_URL} className="btn btn-ghost h-auto p-3" aria-label="WCA Logo">
        {dark ? <WCALogoDark className="h-14" /> : <WCALogo className="h-14" />}
      </Link>
    </div>
  );
}

function Sponsors() {
  const dark = useLightDarkOption(false, true);
  return (
    <div className="bg-base-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        {sponsors.length > 0 && <AllSponsors dark={dark} />}
        {sponsors.length === 0 && <SelfSponsor dark={dark} />}
      </div>
    </div>
  );
}

export default Sponsors;
