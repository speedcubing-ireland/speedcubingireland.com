import {
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import Link from 'next/link';
import solveCount100Badge from '../../public/images/badges/solve-count-100.webp';
import solveCount1000Badge from '../../public/images/badges/solve-count-1000.webp';
import prStreak50Badge from '../../public/images/badges/pr-streak-50.webp';
import podiumWinBadge from '../../public/images/badges/podium-progression-win-event.webp';

const ACHIEVEMENTS_URL = 'https://achievements.speedcubingireland.com';

const displayFont = (wdth = 110): React.CSSProperties => ({
  fontVariationSettings: `"wdth" ${wdth}, "slnt" 0`,
});

function Achievements() {
  return (
    <section className="overflow-hidden">

      <div className="relative bg-black">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 50% 60% at 20% 50%, rgba(14,155,74,0.18) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
          <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-14">
            <div className="shrink-0 grid grid-cols-2 gap-2.5 w-52 sm:w-60 md:w-64 lg:w-[300px]">
              <Image
                src={solveCount100Badge}
                alt="Solve Count 100 badge"
                className="w-full h-auto"
              />
              <Image
                src={solveCount1000Badge}
                alt="Solve Count 1,000 badge"
                className="w-full h-auto"
              />
              <Image
                src={prStreak50Badge}
                alt="50 Competition PR Streak badge"
                className="w-full h-auto"
              />
              <Image
                src={podiumWinBadge}
                alt="Podium: Win an Event badge"
                className="w-full h-auto"
              />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2
                className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[3.15rem] xl:text-[4.5em] text-white uppercase leading-[0.88]"
                style={displayFont(120)}
              >
                Compete
                <br />
                <span className="text-cube-yellow">Earn</span>
                <br />
                Collect
              </h2>

              <p className="mt-5 text-sm sm:text-base text-white/80 max-w-xl mx-auto lg:mx-0">
                Speedcubing Ireland Achievements &mdash; 39 unique badges
                across 8 categories, automatically tracked from your WCA
                competition history.
              </p>
            </div>
          </div>

          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 justify-center sm:justify-start">
            <Link
              href={ACHIEVEMENTS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 bg-cube-red hover:bg-cube-red/80 text-white px-8 py-3.5 rounded-md transition-colors"
            >
              <span
                className="font-sans text-sm uppercase tracking-widest"
              >
                Explore Achievements
              </span>
              <FontAwesomeIcon
                icon={faArrowUpRightFromSquare}
                className="w-3"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Achievements;
