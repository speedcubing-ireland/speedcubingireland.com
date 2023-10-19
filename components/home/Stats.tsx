import { faPeopleGroup, faStopwatch, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Stat(title: string, value: string, color: string, icon: any) {
  return (
    <div key={title} className="pt-4">
      <p className={`font-extrabold gap-2  ${color}`}>
        <span className="align-middle text-3xl">
          <FontAwesomeIcon icon={icon} className="pt-1.5" />
        </span>
        {' '}
        <span className="align-middle text-5xl">{value}</span>
      </p>
      <p className="text-lg font-bold">{title}</p>
    </div>
  );
}

function Stats() {
  const stats = [
    {
      title: 'Competidors', value: '750+', color: 'text-secondary', icon: faPeopleGroup,
    },
    {
      title: 'Resolucions', value: '55000+', color: 'text-primary', icon: faStopwatch,
    },
    {
      title: 'Competicions', value: '25+', color: 'text-secondary', icon: faTrophy,
    },
  ];

  return (
    <div className="bg-base-200">
      <div className="columns-1 md:columns-3 text-center max-w-4xl m-auto pt-4 pb-6">
        {stats.map((stat) => (Stat(stat.title, stat.value, stat.color, stat.icon)))}
      </div>
    </div>
  );
}

export default Stats;
