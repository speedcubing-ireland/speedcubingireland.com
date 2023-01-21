/* eslint-disable jsx-a11y/no-noninteractive-tabindex */ // daisyUI uses tabIndex
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as FASolid from '@fortawesome/free-solid-svg-icons';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRISH_COMPS_URL } from '../../utils/constants';
import Logo from '../../public/speedcubing-ireland-logo.svg';

function Navbar() {
  const navbarItems = [
    {
      text: 'WCA Live',
      icon: FASolid.faBolt,
      url: '/redirects/wca-live',
    },
    {
      text: 'Groups',
      icon: FASolid.faPeopleGroup,
      url: '/redirects/comp-groups',
    },
    {
      text: 'Competitions',
      icon: FASolid.faAward,
      url: IRISH_COMPS_URL,
    },
    {
      text: 'About',
      icon: FASolid.faCircleInfo,
      url: '/',
    },
    {
      text: 'Contact',
      icon: FASolid.faMessage,
      url: '/',
    },
  ];

  const navbarListItems = (classes: string) => navbarItems.map((item) => (
    <li className={classes} key={item.text}>
      <Link href={item.url} className="gap-2">
        <FontAwesomeIcon icon={item.icon} className="pt-0.5" />
        {item.text}
      </Link>
    </li>
  ));

  return (
    <div className="navbar bg-base-100 font-extrabold text-xl">
      <div className="navbar-start">
        <a href="./" className="btn btn-ghost h-16">
          <Logo className="h-full p-1" />
        </a>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1">
          <div className="dropdown dropdown-end dropdown-hover lg:hidden">
            <li>
              <label tabIndex={0}>
                <FontAwesomeIcon icon={FASolid.faBars} />
              </label>
            </li>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {navbarListItems('block')}
            </ul>
          </div>
          {navbarListItems('hidden lg:flex')}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
