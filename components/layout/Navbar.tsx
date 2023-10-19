/* eslint-disable jsx-a11y/no-noninteractive-tabindex */ // daisyUI uses tabIndex
import {
  faAward, faBars, faBolt, faCircleInfo, faHome, faMoon, faSun,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CAT_COMPS_URL } from '../../utils/constants';
import Logo from '../../public/logos/speedcubing-ireland-logo.svg';
import DarkLogo from '../../public/logos/speedcubing-ireland-logo-dark.svg';
import { isThemeDark } from '../../utils/theme';

function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isDark = mounted && isThemeDark(resolvedTheme);

  const router = useRouter();
  useEffect(() => setMounted(true), []);

  const themeButton = (classes: string) => {
    if (!mounted) return undefined;

    const icon = isDark ? faSun : faMoon;
    const handleThemeChange = () => setTheme(isDark ? 'emerald' : 'forest');

    return (
      <li className={classes}>
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          onClick={handleThemeChange}
          className="btn btn-ghost text-xl btn-block"
        >
          <FontAwesomeIcon icon={icon} className="pt-0.5" />
        </button>
      </li>
    );
  };

  const logo = isDark ? <DarkLogo className="h-full p-1" /> : <Logo className="h-full p-1" />;

  const navbarItems = [
    {
      text: 'Home',
      icon: faHome,
      url: '/',
    },
    {
      text: 'WCA Live',
      icon: faBolt,
      url: '/redirects/wca-live',
    },
    {
      text: 'Competicions',
      icon: faAward,
      url: CAT_COMPS_URL,
    },
    {
      text: 'Sobre nosaltres',
      icon: faCircleInfo,
      url: '/posts/about',
    },
  ].filter((item) => router.pathname !== item.url);

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
        <Link
          href="/"
          className="btn btn-ghost h-16"
          aria-label="Speedcubing Ireland Logo"
        >
          {logo}
        </Link>
      </div>
      <div className="navbar-end w-full">
        <ul className="menu menu-horizontal px-1">
          <div className="dropdown dropdown-end dropdown-hover lg:hidden">
            <li>
              <label tabIndex={0}>
                <FontAwesomeIcon icon={faBars} />
              </label>
            </li>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              {navbarListItems('block')}
              <hr />
              {themeButton('block')}
            </ul>
          </div>
          {navbarListItems('hidden lg:flex')}
          {themeButton('hidden lg:flex')}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
