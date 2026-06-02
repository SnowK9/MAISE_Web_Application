// Footer.jsx
// Displays the restaurant's contact info, hours, and quick links.
// Rendered at the bottom of every page via App.jsx.

import { Link } from "react-router-dom";
// import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Top grid: 3 columns */}
        <div className="footer__grid">
          {/* Brand column */}
          <div className="footer__brand">
            <p className="footer__logo">Café Fausse</p>
            <div className="gold-line left" style={{ margin: "16px 0" }} />
            <p className="footer__tagline">
              Fine dining where tradition meets
              <br />
              modern culinary artistry.
            </p>
          </div>

          {/* Contact column */}
          <div className="footer__col">
            <p className="footer__col-title">Visit Us</p>
            <p>1234 Culinary Ave, Suite 100</p>
            <p>Washington, DC 20002</p>
            <p style={{ marginTop: 12 }}>(202) 555-4567</p>
          </div>

          {/* Hours column */}
          <div className="footer__col">
            <p className="footer__col-title">Hours</p>
            <p>Mon – Sat &nbsp; 5:00 PM – 11:00 PM</p>
            <p>Sunday &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5:00 PM – 9:00 PM</p>
            <div style={{ marginTop: 20 }}>
              <Link
                to="/reservations"
                className="btn-gold"
                style={{ fontSize: 10, padding: "10px 24px" }}
              >
                Reserve a Table
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Café Fausse. All rights reserved.</p>
          <nav className="footer__nav">
            {[
              ["/", "Home"],
              ["/menu", "Menu"],
              ["/reservations", "Reservations"],
              ["/about", "About"],
              ["/gallery", "Gallery"],
            ].map(([to, label]) => (
              <Link key={to} to={to} className="footer__nav-link">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
