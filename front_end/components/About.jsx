// pages/About.jsx
// The About Us page. Tells the restaurant's story, highlights the founders,
// and emphasizes the commitment to quality and locally sourced ingredients.
// All content is taken directly from the SRS requirements document.

import "../styles/About.css";

const FOUNDERS = [
  {
    name: "Chef Antonio Rossi",
    role: "Co-Founder & Executive Chef",
    bio: `Born in Florence and trained under some of Italy's most celebrated chefs,
      Antonio Rossi brings the depth of classical Italian cuisine to Washington's
      fine-dining scene. His philosophy is simple: exceptional ingredients, mastered
      technique, and dishes that tell a story. Chef Rossi oversees every aspect of
      the kitchen, personally curating seasonal menus that honor tradition while
      embracing the best of modern culinary innovation.`,
    initial: "AR",
  },
  {
    name: "Maria Lopez",
    role: "Co-Founder & Restaurateur",
    bio: `With over two decades of experience in hospitality management, Maria Lopez
      has shaped Café Fausse into more than just a restaurant — it is an experience.
      Her vision for seamless, warm service paired with an intimate atmosphere has
      earned the restaurant national recognition. Maria works closely with local
      farmers and suppliers to ensure that every ingredient on the plate reflects
      the region's finest seasonal produce.`,
    initial: "ML",
  },
];

const VALUES = [
  {
    title: "Locally Sourced",
    desc: "We partner with regional farms and artisan suppliers to bring the freshest ingredients to your table.",
  },
  {
    title: "Culinary Craft",
    desc: "Classical Italian technique fused with modern creativity — every dish is a reflection of skill and passion.",
  },
  {
    title: "Memorable Experience",
    desc: "From the moment you arrive to the final bite, we are committed to an evening you will not forget.",
  },
];

export default function About() {
  return (
    <main className="about-page">
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <p className="section-label fade-up fade-up-1">Our Story</p>
          <div className="gold-line fade-up fade-up-2" />
          <h1 className="section-title page-header__title fade-up fade-up-2">
            About Us
          </h1>
          <p className="page-header__sub fade-up fade-up-3">
            Founded in 2010 · Washington, DC
          </p>
        </div>
      </div>

      {/* Origin story */}
      <section className="section">
        <div className="container">
          <div className="about-story">
            <div className="about-story__quote">
              <span className="about-story__quotemark">"</span>
              <blockquote>
                Our mission is to provide an unforgettable dining experience
                that reflects both quality and creativity.
              </blockquote>
            </div>
            <div className="about-story__text">
              <p className="section-label">How We Began</p>
              <div className="gold-line left" />
              <h2 className="section-title">A Meeting of Passion & Vision</h2>
              <p className="about-story__body">
                Founded in 2010 by Chef Antonio Rossi and restaurateur Maria
                Lopez, Café Fausse began as a shared dream: to bring the warmth
                and artistry of Italian dining to the heart of Washington, DC.
                Starting with just twelve tables and an unwavering belief in
                quality, they built something the city had not seen before — a
                restaurant where classical tradition and modern spirit coexist
                on every plate.
              </p>
              <p className="about-story__body">
                Over a decade later, Café Fausse has grown to become one of DC's
                most celebrated fine-dining destinations, earning national
                awards and a devoted following of guests who return time and
                again for the food, the atmosphere, and the feeling of being
                genuinely welcomed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__grid">
            {VALUES.map((v) => (
              <div key={v.title} className="about-values__item">
                <div className="gold-line left" style={{ marginBottom: 20 }} />
                <h3 className="about-values__title">{v.title}</h3>
                <p className="about-values__desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <p className="section-label">The People Behind the Experience</p>
            <div className="gold-line" />
            <h2 className="section-title">Meet the Founders</h2>
          </div>
          <div className="founders-grid">
            {FOUNDERS.map((f) => (
              <div key={f.name} className="founder-card">
                {/* Monogram avatar in lieu of photo */}
                <div className="founder-card__avatar">{f.initial}</div>
                <h3 className="founder-card__name">{f.name}</h3>
                <p className="founder-card__role">{f.role}</p>
                <div className="gold-line" style={{ margin: "20px auto" }} />
                <p className="founder-card__bio">{f.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
