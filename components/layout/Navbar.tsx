/* eslint-disable jsx-a11y/no-noninteractive-tabindex */ // daisyUI uses tabIndex
/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import Logo from '../../public/speedcubing-ireland-logo.svg';
import MenuHamburger from '../../public/menu-hamburger.svg';
import { IRISH_COMPS_URL } from '../../utils/constants';

function Navbar() {
  const navbarItems = [
    { text: 'WCA Live', url: '/redirects/wca-live' },
    { text: 'Comp Groups', url: '/redirects/comp-groups' },
    { text: 'Competitions', url: IRISH_COMPS_URL },
    { text: 'Item 4', url: '#' },
    { text: 'Item 5', url: '#' },
  ];

  const navbarListItems = () => navbarItems.map((item) => (
    <li key={item.url}>
      <Link href={item.url}>
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
      <div className="navbar-end w-full">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost lg:hidden h-16">
            <MenuHamburger className="h-6" />
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            {navbarListItems()}
          </ul>
        </div>
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          {navbarListItems()}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
