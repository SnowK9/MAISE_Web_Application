// Navbar.jsx
// Fixed top navigation bar. Turns opaque when the user scrolls down.
// Uses React's useState and useEffect hooks to detect scroll position.

import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
// import "./Navbar.css";

export default function Navbar() {
  // Track whether the user has scrolled past 40px
  const [scrolled, setScrolled] = useState(false);
  // Track whether the mobile menu is open
  const [menuOpen, setMenuOpen] = useState(false);

  // useLocation tells us which page we're currently on
  const location = useLocation();

  // Listen for scroll events; add/remove the "scrolled" class
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    // Cleanup: remove the listener when this component is removed from the page
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu whenever the user navigates to a new page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/reservations", label: "Reservations" },
    { to: "/about", label: "About Us" },
    { to: "/gallery", label: "Gallery" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        {/* Logo / Brand name */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-main">Café Fausse</span>
          <span className="navbar__logo-sub">Washington, DC</span>
        </Link>

        {/* Desktop navigation links */}
        <ul className="navbar__links">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <Link
                to={to}
                className={`navbar__link ${location.pathname === to ? "navbar__link--active" : ""}`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Reserve button (desktop) */}
        <Link to="/reservations" className="navbar__reserve btn-gold">
          Reserve a Table
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          className={`navbar__hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}
      >
        {navLinks.map(({ to, label }) => (
          <Link key={to} to={to} className="navbar__mobile-link">
            {label}
          </Link>
        ))}
        <Link
          to="/reservations"
          className="btn-gold"
          style={{ marginTop: 24, textAlign: "center" }}
        >
          Reserve a Table
        </Link>
      </div>
    </nav>
  );
}
