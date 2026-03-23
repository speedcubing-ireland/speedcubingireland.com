import {
  faArrowRight, faLocationArrow, faPeopleGroup, faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IRISH_COMPS_URL, WCA_URL } from '../../utils/constants';

export type HeroComp = {
  name: string;
  registration_open: string;
  registration_close: string;
  start_date: string;
  end_date: string;
  city: string;
} & ({ id: string, series: false } | { series: true });

interface HeroProps {
  comps: HeroComp[];
}

export function formatCompDates(comp: HeroComp): string {
  const startDate = new Date(comp.start_date);
  const endDate = new Date(comp.end_date);

  const startYear = startDate.getFullYear();
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.toLocaleString('default', { month: 'short' });
  const endDay = endDate.getDate();

  let date = `${startMonth} ${startDay}`;

  if (startDay === endDay && startMonth === endMonth && startYear === endYear) return `${date}, ${startYear}`;

  if (startYear !== endYear) date += `, ${startYear}`;
  date += comp.series ? ' & ' : ' – ';

  if (startMonth !== endMonth || startYear !== endYear) date += `${endMonth} `;
  date += `${endDay}, ${endYear}`;

  return date;
}

function getRegStatus(comp: HeroComp) {
  const now = new Date();
  if (now > new Date(comp.registration_close)) {
    return { text: 'Registration closed', className: 'text-base-content/40' };
  }

  const diff = new Date(comp.registration_open).getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);

  let text: string;
  if (days > 0) {
    text = `Registration opens in ${days} days`;
  } else if (hours > 0) {
    text = `Registration opens in ${hours} hours`;
  } else if (minutes > 0) {
    text = `Registration opens in ${minutes} minutes`;
  } else if (diff > 0) {
    text = 'Registration opens soon';
  } else {
    text = 'Registration open!';
  }
  return { text, className: 'text-primary' };
}

const ACCENT_COLORS = [
  'bg-cube-red',
  'bg-cube-blue',
  'bg-cube-orange',
  'bg-cube-yellow',
];

function CompItem({ comp, index }: { comp: HeroComp; index: number }) {
  const date = formatCompDates(comp);
  const city = (comp.city.split(',').shift()?.trim() ?? comp.city).replace('County', '').trim();
  const compName = (comp.name.slice(0, -4) + (comp.series ? ' (Series)' : '')).replace('Kilkenny Cats', 'Cats');
  const url = comp.series ? IRISH_COMPS_URL : `${WCA_URL}/competitions/${(comp as any).id}`;
  const reg = getRegStatus(comp);

  let icon: IconProp | undefined;
  if (comp.series) icon = faPeopleGroup;
  if (comp.name.includes('Championship')) icon = faTrophy;

  const accent = ACCENT_COLORS[index % ACCENT_COLORS.length];

  return (
    <Link
      href={url}
      className="flex items-start gap-4 p-4 border border-base-content/20 hover:bg-base-200"
    >
      <div className={`w-1 self-stretch rounded-full shrink-0 ${accent}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm text-base-content/50">
          <span className="truncate">
            <FontAwesomeIcon icon={faLocationArrow} className="w-2.5 text-primary mr-2" />
            <span className="font-bold text-primary mr-2">{city}</span>
            &middot;
            &nbsp;
            {date}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <p className="font-bold text-lg mt-0.5 truncate">{compName}</p>
          {icon && (
            <FontAwesomeIcon icon={icon} className="text-xl ml-auto my-auto text-si-gold-light" />
          )}
        </div>
        <p className={`text-sm mt-0.5 ${reg.className}`}>{reg.text}</p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-8 text-base-content/40">
      <p className="font-bold text-lg">No upcoming competitions</p>
      <p className="text-sm mt-1">Check back later for new events!</p>
    </div>
  );
}

function Hero({ comps }: HeroProps) {
  return (
    <div className="bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <div className="lg:w-2/5 lg:py-4">
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              Upcoming
              <br />
              <span className="text-primary">Competitions</span>
            </h2>
            <p className="mt-4 text-base-content/60 leading-relaxed">
              Welcome to Speedcubing Ireland, the official WCA regional organization
              for promoting and supporting the exciting world of speedcubing in Ireland!
              Check out our list of upcoming competitions to get involved and join the fun!
            </p>
            <Link className="btn btn-primary mt-6 gap-2" href={IRISH_COMPS_URL}>
              See All Competitions
              <FontAwesomeIcon icon={faArrowRight} className="w-3" />
            </Link>
          </div>
          <div className="lg:w-3/5">
            {comps.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="flex flex-col gap-3">
                {comps.map((comp, i) => (
                  <CompItem key={comp.name} comp={comp} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
