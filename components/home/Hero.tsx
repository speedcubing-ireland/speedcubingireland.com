import { Competition } from '../../utils/wca-api/types';

interface ItemProps {
  title: JSX.Element
  name: string
  desc: JSX.Element
}

function CardItem({ title, name, desc }: ItemProps) {
  return (
    <a href="./" className="stat px-4 hover:opacity-60">
      <div className="stat-title opacity-100">{title}</div>
      <div className="stat-value text-lg">{name}</div>
      <div className="stat-desc opacity-100">{desc}</div>
    </a>
  );
}

function Card({ children }: { children: JSX.Element | JSX.Element[] }) {
  return (
    <div className="stats stats-vertical max-w-sm w-full shadow-xl">
      {children}
    </div>
  );
}

// TODO: handle belfast comps :)
interface HeroProps {
  comps: Competition[];
}

function getCardTitle(comp: Competition) {
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
      <span className="font-bold text-primary">{comp.city.split(',').pop() ?? comp.city}</span>
      &nbsp;
      {date}
    </>
  );
}

function getCardDesc(comp: Competition) {
  // Current date
  const now = new Date();
  let regText: string;
  let regClass: string;
  if (now > new Date(comp.registration_close)) {
    regText = 'Registration is closed';
    regClass = 'text-accent';
  } else {
    // get time until registration opens like opens in 2 hours or opens in 3 weeks
    const diff = new Date(comp.registration_open).getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    regClass = 'text-secondary';
    if (days > 0) {
      regText = `Registration opens in ${days} days`;
    } else if (hours > 0) {
      regText = `Registration opens in ${hours} hours`;
    } else if (minutes > 0) {
      regText = `Registration opens in ${minutes} minutes`;
    } else if (seconds > 0) {
      regText = `Registration opens in ${seconds} seconds`;
    } else {
      regText = 'Registration is now open!';
      regClass = 'text-primary';
    }
  }
  return <span className={regClass}>{regText}</span>;
}

function HeroCard({ comps }: HeroProps) {
  if (comps.length === 0) {
    return (
      <Card>
        <CardItem
          title={<span className="font-bold text-primary">No upcoming competitions</span>}
          name="Check back later!"
          desc={<span className="text-secondary">No competitions are currently scheduled</span>}
        />
      </Card>
    );
  }

  const compStat = (comp: Competition) => (
    <CardItem
      key={comp.id}
      title={getCardTitle(comp)}
      name={comp.name}
      desc={getCardDesc(comp)}
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
          <h1 className="text-5xl font-bold">Upcoming Competitions</h1>
          <p className="py-6 text-lg">
            Welcome to Speedcubing Ireland, the official WCA regional organization
            for promoting and supporting the exciting world of speedcubing in Ireland!

            Check out our list of upcoming competitions to get involved and join the fun!
          </p>
          <button type="button" className="btn">See More!</button>
        </div>
        <HeroCard comps={comps} />
      </div>
    </div>
  );
}

export default Hero;