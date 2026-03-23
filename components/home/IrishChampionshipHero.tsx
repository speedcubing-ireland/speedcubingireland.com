import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import IC26Logo from '../../public/images/IC26 Logo.png';
import { WCA_URL } from '../../utils/constants';

const IC26_URL = `${WCA_URL}/competitions/IrishChampionship2026`;

const nickelGothic: React.CSSProperties = {
  fontFamily: '"nickel-gothic-variable", sans-serif',
  fontVariationSettings: '"wdth" 110, "slnt" 0',
};

function IrishChampionshipHero() {
  return (
    <div className="relative bg-black overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 py-8 md:py-10">
        <div className="flex flex-col items-center gap-6 lg:flex-row lg:gap-10">
          <Link
            href={IC26_URL}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 group"
          >
            <Image
              src={IC26Logo}
              alt="Irish Championship 2026 – 24-26 July, SETU Arena, Waterford"
              className="w-56 sm:w-64 md:w-72 transition-transform duration-300 group-hover:scale-[1.02]"
              priority
            />
          </Link>

          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="h-px w-8 bg-primary hidden lg:block" />
              <span className="text-primary text-xs font-bold uppercase tracking-[0.25em]">
                24–26 July · SETU Arena, Waterford
              </span>
              <div className="h-px w-8 bg-primary hidden lg:block" />
            </div>

            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-white uppercase leading-[0.9] mt-3"
              style={nickelGothic}
            >
              Ireland&apos;s
              <br />
              <span className="text-primary">Biggest</span>
              {' '}
              Cubing
              <br />
              Weekend
            </h2>

            <p className="mt-3 text-sm md:text-base text-white/50 max-w-md leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
              Esse praesentium assumenda ea soluta aut.
            </p>

            <div className="mt-4">
              <Link
                href={IC26_URL}
                className="btn btn-primary gap-2"
                target="_blank"
                rel="noreferrer"
              >
                Find Out More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IrishChampionshipHero;
