/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Logo from '../../public/speedcubing-ireland-logo.svg';
import { IRISH_COMPS_URL } from '../../utils/constants';

function Navbar() {
  return (
    <div className="navbar bg-base-100 font-extrabold text-xl">
      <div className="navbar-start">
        <a href="./" className="btn btn-ghost h-16">
          <Logo className="h-full p-1" />
        </a>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <li><Link href="/redirects/wca-live">WCA Live</Link></li>
          <li><Link href="/redirects/comp-groups">Comp Groups</Link></li>
          <li><Link href={IRISH_COMPS_URL}>Competitions</Link></li>
          <li><a>Item 4</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
