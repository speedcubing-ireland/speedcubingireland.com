import Link from 'next/link';

function PageLink() {
  return (
    <div className="border-4 border-primary border-dashed pt-4 px-4 rounded-[var(--tab-radius)]">
      <h3 className="mt-0">
        <Link href="/ddd/">
          DNF Tracker
        </Link>
      </h3>
      <p>
        Check out the
        {' '}
        <Link href="/ddd/">DNF Tracker</Link>
        {' '}
        to see how many DNFs you have, and look at the leaderboard.
        There will be an award for the most solves without a DNF
      </p>
    </div>
  );
}

export default PageLink;
