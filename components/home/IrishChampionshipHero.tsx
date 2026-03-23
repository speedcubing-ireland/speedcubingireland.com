import {
  faArrowUpRightFromSquare,
  faCalendarDays,
  faCubesStacked,
  faLocationDot,
  faShirt,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import IC26Logo from '../../public/images/IC26 Logo.png';
import { WCA_URL } from '../../utils/constants';

const IC26_URL = `${WCA_URL}/competitions/IrishChampionship2026`;

const displayFont = (wdth = 110): React.CSSProperties => ({
  fontVariationSettings: `"wdth" ${wdth}, "slnt" 0`,
});

function SellingPoint({
  bg,
  icon,
  text,
}: {
  bg: string;
  icon: typeof faTrophy;
  text: string;
}) {
  return (
    <div className={`px-5 py-5 sm:px-6 sm:py-6 flex items-start gap-3.5 ${bg}`}>
      <p
        className="font-sans font-bold text-white text-base sm:text-lg lg:text-xl leading-snug align-top hidden md:block"
      >
        <FontAwesomeIcon
          icon={icon}
          className="w-4 sm:w-[18px] mt-0.5 text-white shrink-0"
        />
      </p>
      <p
        className="font-sans font-bold text-white text-base sm:text-lg lg:text-xl leading-snug align-top"
      >
        {text}
      </p>
    </div>
  );
}

function IrishChampionshipHero() {
  return (
    <section className="overflow-hidden">
      <div className="py-2.5 px-4 text-center bg-cube-yellow">
        <p
          className="font-sans font-bold text-black text-[10px] sm:text-xs uppercase tracking-[0.3em]"
        >
          Registration Open Now &middot; New Competitors Welcome
        </p>
      </div>

      <div className="relative bg-black">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(14,155,74,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-14">
            <Link
              href={IC26_URL}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <Image
                src={IC26Logo}
                alt="Irish Championship 2026 – 24 to 26 July, SETU Arena, Waterford"
                className="w-52 sm:w-60 md:w-64 lg:w-[300px]"
                priority
              />
            </Link>

            <div className="flex-1 text-center lg:text-left">
              <h2
                className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[3.15rem] xl:text-[4.5em] text-white uppercase leading-[0.88]"
                style={displayFont(120)}
              >
                Ireland&apos;s
                <br />
                <span className="text-cube-yellow">Biggest</span>
                <br />
                Cubing Weekend
              </h2>

              <div className="flex flex-wrap gap-x-6 gap-y-1.5 mt-5 justify-center lg:justify-start text-sm text-white">
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className="w-3.5 text-white"
                  />
                  24–26 July 2026
                </span>
                <span className="flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="w-3.5 text-white"
                  />
                  SETU Arena, Co. Waterford
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 mt-9 lg:mt-12">
            <SellingPoint
              bg="bg-cube-orange"
              icon={faTrophy}
              text="Compete alongside the best Irish & international cubers"
            />
            <SellingPoint
              bg="bg-cube-blue"
              icon={faCubesStacked}
              text="Newcomers welcome! Meet other cubers and set personal records!"
            />
            <SellingPoint
              bg="bg-si-green"
              icon={faShirt}
              text="Free t-shirt & goodie bag for every competitor"
            />
          </div>

          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center sm:justify-start">
            <Link
              href={IC26_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-cube-red hover:bg-cube-red/50 text-white px-8 py-3.5"
            >
              <span
                className="font-sans text-sm uppercase tracking-widest"
              >
                Register Now
              </span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3"
              />
            </Link>
            <span className="text-white text-md tracking-wide">
              Registration closes 3 July
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IrishChampionshipHero;
