/* eslint-disable jsx-a11y/anchor-is-valid */
import Logo from '../../public/speedcubing-ireland-logo.svg';

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
          <li><a>Item 1</a></li>
          <li><a>Item 2</a></li>
        </ul>

        <ul className="menu menu-horizontal px-1">
          <li><a>Item 3</a></li>
          <li><a>Item 4</a></li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;