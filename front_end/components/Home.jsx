// pages/Home.jsx
// The main landing page. Sections:
//   1. Hero — full-height banner with restaurant name
//   2. Info bar — address, phone, hours
//   3. Story teaser — brief intro to the restaurant
//   4. Featured dishes — 3 highlight menu items
//   5. Awards — recognition strip
//   6. Newsletter signup

import { Link } from "react-router-dom";
import NewsletterSignup from "../components/NewsletterSignup";
// import "./Home.css";

// Three featured dishes shown on the homepage
const FEATURED = [
  {
    name: "Grilled Salmon",
    desc: "Lemon butter sauce, seasonal vegetables",
    price: "$22",
    category: "Main Course",
  },
  {
    name: "Ribeye Steak",
    desc: "12 oz prime cut, garlic mashed potatoes",
    price: "$28",
    category: "Main Course",
  },
  {
    name: "Tiramisu",
    desc: "Classic Italian with mascarpone",
    price: "$7.50",
    category: "Dessert",
  },
];

const AWARDS = [
  { year: "2022", title: "Culinary Excellence Award" },
  { year: "2023", title: "Restaurant of the Year" },
  { year: "2023", title: "Best Fine Dining — Foodie Magazine" },
];

export default function Home() {
  return (
    <main className="home">
      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero__overlay" />
        <div className="hero__content">
          <p className="section-label fade-up fade-up-1">
            Washington, DC · Est. 2010
          </p>
          <div className="gold-line fade-up fade-up-2" />
          <h1 className="hero__title fade-up fade-up-2">Café Fausse</h1>
          <p className="hero__subtitle fade-up fade-up-3">
            Where Italian tradition meets modern culinary artistry
          </p>
          <div className="hero__cta fade-up fade-up-4">
            <Link to="/reservations" className="btn-gold">
              Reserve a Table
            </Link>
            <Link to="/menu" className="hero__menu-link">
              View Our Menu →
            </Link>
          </div>
        </div>
        {/* Decorative corner ornaments */}
        <span className="hero__corner hero__corner--tl" />
        <span className="hero__corner hero__corner--br" />
      </section>

      {/* ── Info Bar ── */}
      <div className="info-bar">
        <div className="container">
          <div className="info-bar__grid">
            <div className="info-bar__item">
              <span className="info-bar__label">Address</span>
              <span>1234 Culinary Ave, Suite 100, Washington, DC</span>
            </div>
            <div className="info-bar__divider" />
            <div className="info-bar__item">
              <span className="info-bar__label">Phone</span>
              <span>(202) 555-4567</span>
            </div>
            <div className="info-bar__divider" />
            <div className="info-bar__item">
              <span className="info-bar__label">Hours</span>
              <span>Mon–Sat 5–11 PM &nbsp;|&nbsp; Sun 5–9 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Story Teaser ── */}
      <section className="section story">
        <div className="container">
          <div className="story__inner">
            <div className="story__text">
              <p className="section-label">Our Story</p>
              <div className="gold-line left" />
              <h2 className="section-title">
                A Passion for Exceptional Dining
              </h2>
              <p className="story__body">
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria
                Lopez, Café Fausse has spent over a decade crafting
                unforgettable moments at the table. Our menu celebrates the
                finest locally sourced ingredients, elevated by classical
                Italian technique and a spirit of modern innovation.
              </p>
              <Link
                to="/about"
                className="btn-gold"
                style={{ marginTop: 32, display: "inline-block" }}
              >
                Our Story
              </Link>
            </div>
            <div className="story__stats">
              {[
                ["2010", "Founded"],
                ["30", "Tables"],
                ["14+", "Years of Excellence"],
              ].map(([num, label]) => (
                <div key={label} className="story__stat">
                  <span className="story__stat-num">{num}</span>
                  <span className="story__stat-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Menu ── */}
      <section className="section featured">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label">From Our Kitchen</p>
            <div className="gold-line" />
            <h2 className="section-title">Chef's Selections</h2>
          </div>
          <div className="featured__grid">
            {FEATURED.map((dish) => (
              <div key={dish.name} className="dish-card">
                <p className="dish-card__category">{dish.category}</p>
                <h3 className="dish-card__name">{dish.name}</h3>
                <p className="dish-card__desc">{dish.desc}</p>
                <p className="dish-card__price">{dish.price}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link to="/menu" className="btn-gold">
              View Full Menu
            </Link>
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="awards-strip">
        <div className="container">
          <div className="awards-strip__grid">
            {AWARDS.map((a) => (
              <div key={a.title} className="awards-strip__item">
                <span className="awards-strip__year">{a.year}</span>
                <span className="awards-strip__title">{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Newsletter ── */}
      <NewsletterSignup />
    </main>
  );
}
