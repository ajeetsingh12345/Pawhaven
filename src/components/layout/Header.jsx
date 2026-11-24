import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";

const navigationLinks = [
  ["Home", "/"],
  ["Our puppies", "/puppies"],
  ["Our story", "/about"],
  ["How it works", "/how-it-works"],
  ["FAQs", "/faq"],
  ["Contact", "/contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeNavigation = () => setOpen(false);

  return (
    <>
      <div className="topline">
        A little love goes a long way <span>♡</span> Find your forever friend
        with PawHaven
      </div>

      <header className="header">
        <Link to="/" className="brand" onClick={closeNavigation}>
          <img
            className="brand-logo"
            src="/images/pawhaven-logo.png"
            alt="PawHaven"
          />
        </Link>

        <button
          className="menu-toggle"
          onClick={() => setOpen((current) => !current)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? "nav open" : "nav"}>
          {navigationLinks.map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              onClick={closeNavigation}
            >
              {label}
            </NavLink>
          ))}
          <Link
            className="button nav-cta"
            to="/puppies"
            onClick={closeNavigation}
          >
            Meet the puppies <ArrowUpRight size={16} />
          </Link>
        </nav>
      </header>
    </>
  );
}
