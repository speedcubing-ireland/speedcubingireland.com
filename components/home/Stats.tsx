import { faPeopleGroup, faStopwatch, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const stats = [
  {
    title: 'Competitors',
    value: '1,750+',
    color: 'text-cube-green',
    icon: faPeopleGroup,
  },
  {
    title: 'Solves',
    value: '270K+',
    color: 'text-cube-blue',
    icon: faStopwatch,
  },
  {
    title: 'Competitions',
    value: '85+',
    color: 'text-cube-red',
    icon: faTrophy,
  },
];

function Stats() {
  return (
    <div className="bg-base-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-0 sm:grid-cols-3 text-center">
          {stats.map((stat) => (
            <div key={stat.title}>
              <p className={`font-extrabold gap-2  ${stat.color}`}>
                <span className="align-middle text-3xl">
                  <FontAwesomeIcon icon={stat.icon} className="pt-1.5" />
                </span>
                {' '}
                <span className="align-middle text-3xl">{stat.value}</span>
              </p>
              <p className="text-lg font-bold">{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stats;
