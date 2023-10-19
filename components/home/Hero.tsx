import { faCaretRight, faLocationArrow, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { CAT_COMPS_URL, WCA_URL } from '../../utils/constants';

// TODO: handle belfast comps :)

export interface HeroComp {
  id: string;
  name: string;
  registration_open: string;
  registration_close: string;
  start_date: string;
  end_date: string;
  city: string;
}

interface ItemProps {
  title: JSX.Element
  name: string
  desc: JSX.Element
  url: string
  icon?: any
}

function CardItem({
  title,
  name,
  desc,
  url,
  icon,
}: ItemProps) {
  return (
    <Link href={url} className="stat px-4 hover:bg-base-200">
      <div className="stat-title opacity-100">{title}</div>
      <div className="stat-value text-lg">{name}</div>
      <div className="stat-desc opacity-100">{desc}</div>
      {icon && <div className="stat-figure"><FontAwesomeIcon icon={icon} className="text-accent" /></div>}
    </Link>
  );
}

function Card({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="stats stats-vertical max-w-sm w-full shadow-xl">
      {children}
    </div>
  );
}

interface HeroProps {
  comps: HeroComp[];
}

function getCardTitle(comp: HeroComp) {
  const startDate = new Date(comp.start_date);
  const endDate = new Date(comp.end_date);

  // Extreme case: Dec 31, 2022 - Jan 1, 2023
  const startYear = startDate.getFullYear();
  const startMonth = startDate.toLocaleString('default', { month: 'short' });
  const startDay = startDate.getDate();

  const endYear = endDate.getFullYear();
  const endMonth = endDate.toLocaleString('default', { month: 'short' });
  const endDay = endDate.getDate();

  let date = `${startMonth} ${startDay}`;
  if (startYear !== endYear) date += `, ${startYear}`;
  date += ' - ';
  if (startMonth !== endMonth || startYear !== endYear) date += `${endMonth} `;
  // date += `${endDay}, ${endYear}`;
  date += `${endDay}`;

  return (
    <>
      <FontAwesomeIcon icon={faLocationArrow} className="text-primary" />
      &nbsp;
      <span className="font-bold text-primary">{comp.city.split(',').pop()?.trim() ?? comp.city}</span>
      &nbsp;
      {date}
    </>
  );
}

function getCardDesc(comp: HeroComp) {
  // Current date
  const now = new Date();
  let regText: string;
  let regClass: string;
  if (now > new Date(comp.registration_close)) {
    regText = 'Registre tancat';
    regClass = '';
  } else {
    // get time until registration opens like opens in 2 hours or opens in 3 weeks
    const diff = new Date(comp.registration_open).getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    regClass = 'text-primary';
    if (days > 0) {
      regText = `El registre obre en ${days} dies`;
    } else if (hours > 0) {
      regText = `El registre obre en ${hours} hores`;
    } else if (minutes > 0) {
      regText = `El registre obre en ${minutes} minuts`;
    } else if (seconds > 0) {
      regText = `El registre obre en ${seconds} segons`;
    } else {
      regText = 'El registre està obert!';
    }
  }
  return <span className={regClass}>{regText}</span>;
}

function HeroCard({ comps }: HeroProps) {
  if (comps.length === 0) {
    return (
      <Card>
        <CardItem
          title={<span className="font-bold text-primary">No hi han properes competicions</span>}
          name="Check back later!"
          desc={<span className="text-secondary">Actualment no hi han competicions programades</span>}
          url={CAT_COMPS_URL}
        />
      </Card>
    );
  }

  const compStat = (comp: HeroComp) => (
    <CardItem
      key={comp.id}
      title={getCardTitle(comp)}
      name={comp.name.slice(0, -4)}
      desc={getCardDesc(comp)}
      url={`${WCA_URL}/competitions/${comp.id}`}
      icon={comp.name.includes('Championship') && faTrophy}
    />
  );

  return (
    <Card>
      {comps.map((c) => compStat(c))}
    </Card>
  );
}

function Hero({ comps }: HeroProps) {
  return (
    <div
      className="hero bg-gradient-to-br from-primary to-secondary"
    >
      <div className="hero-content flex-col lg:flex-row-reverse py-10 gap-12">
        <div className="text-center text-primary-content lg:text-left">
          <h1 className="text-5xl font-bold gap-2">Properes competicions</h1>
          <p className="py-6 text-lg text-left">
            Benvingut a l'ACSC, l'organització regional que promou i dóna suport al interessant món del speedcubing a Catalunya!
            Revisa el llistat de les properes competicions per participar i formar part de la diversió!
          </p>
          <Link className="btn gap-2" href={CAT_COMPS_URL}>
            Veure més!
            <FontAwesomeIcon icon={faCaretRight} />
          </Link>
        </div>
        <HeroCard comps={comps} />
      </div>
    </div>
  );
}

export default Hero;
