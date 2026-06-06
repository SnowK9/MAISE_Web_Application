// pages/Gallery.jsx
// Displays a photo gallery with a lightbox (click to enlarge).
// Also features awards and customer reviews.
// Uses CSS grid for the masonry-style layout.

import { useState } from "react";
import "../styles/Gallery.css";

import imgInterior from "../gallery/gallery-cafe-interior.webp";
import imgRibeye from "../gallery/gallery-ribeye-steak.webp";
import imgEvent from "../gallery/gallery-special-event.webp";
import imgCafe from "../gallery/home-cafe-fausse.webp";
import imgSalmon from "../gallery/grilled_Salmon.jpg";
import imgBar from "../gallery/exterior_bar.jpg";
import imgTiramisu from "../gallery/Tiramisu.jpg";
const GALLERY_ITEMS = [
  {
    id: 1,
    label: "The Dining Room",
    category: "Interior",
    src: imgInterior,
  },
  {
    id: 2,
    label: "Grilled Salmon",
    category: "Cuisine",
    src: imgSalmon,
  },
  {
    id: 3,
    label: "Private Dining",
    category: "Interior",
    src: imgCafe,
  },
  {
    id: 4,
    label: "Ribeye Steak",
    category: "Cuisine",
    src: imgRibeye,
  },
  {
    id: 5,
    label: "The Bar",
    category: "Exterior",
    src: imgBar,
  },
  {
    id: 6,
    label: "Tiramisu",
    category: "Cuisine",
    src: imgTiramisu,
  },
  {
    id: 7,
    label: "Chef's Table Evening",
    category: "Events",
    src: imgEvent,
  },
  // {
  //   id: 8,
  //   label: "Behind the Scenes",
  //   category: "Events",
  //   gradient: "linear-gradient(135deg, #1a2214 0%, #223018 100%)",
  // },
  // {
  //   id: 9,
  //   label: "Vegetable Risotto",
  //   category: "Cuisine",
  //   gradient: "linear-gradient(135deg, #1a2218 0%, #1e3020 100%)",
  // },
];

const AWARDS = [
  {
    year: "2022",
    title: "Culinary Excellence Award",
    body: "Recognizing outstanding achievement in fine dining and culinary innovation.",
  },
  {
    year: "2023",
    title: "Restaurant of the Year",
    body: "Honored by the DC Dining Association for consistent excellence across all categories.",
  },
  {
    year: "2023",
    title: "Best Fine Dining Experience",
    body: "Awarded by Foodie Magazine for exceptional food, service, and atmosphere.",
    source: "Foodie Magazine",
  },
];

const REVIEWS = [
  {
    quote: "Exceptional ambiance and unforgettable flavors.",
    source: "Gourmet Review",
  },
  {
    quote: "A must-visit restaurant for food enthusiasts.",
    source: "The Daily Bite",
  },
];

// The active filter: "All", "Interior", "Cuisine", or "Events"
const FILTERS = ["All", "Interior", "Cuisine", "Events"];

export default function Gallery() {
  // Which photo is open in the lightbox (null = closed)
  const [lightboxItem, setLightboxItem] = useState(null);
  // Active category filter
  const [filter, setFilter] = useState("All");

  // Filter the gallery items based on the selected category
  const visible =
    filter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === filter);

  return (
    <main className="gallery-page">
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <p className="section-label fade-up fade-up-1">Visual Stories</p>
          <div className="gold-line fade-up fade-up-2" />
          <h1 className="section-title page-header__title fade-up fade-up-2">
            Gallery
          </h1>
          <p className="page-header__sub fade-up fade-up-3">
            A window into the world of Café Fausse
          </p>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="gallery-filters">
        <div className="container">
          <div className="gallery-filters__row">
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`gallery-filter-btn ${filter === f ? "gallery-filter-btn--active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Photo grid */}
      <div className="section">
        <div className="container">
          <div className="gallery-grid">
            {visible.map((item) => (
              <button
                key={item.id}
                className="gallery-tile"
                style={item.src ? undefined : { background: item.gradient }}
                onClick={() => setLightboxItem(item)}
                aria-label={`View larger image: ${item.label}`}
              >
                {item.src && (
                  <img
                    src={item.src}
                    alt={item.label}
                    className="gallery-tile__img"
                  />
                )}
                <div className="gallery-tile__overlay">
                  <span className="gallery-tile__label">{item.label}</span>
                  <span className="gallery-tile__cat">{item.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox — shown when a tile is clicked */}
      {lightboxItem && (
        <div
          className="lightbox"
          onClick={() => setLightboxItem(null)} // Click backdrop to close
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged view of ${lightboxItem.label}`}
        >
          <div
            className="lightbox__content"
            onClick={(e) => e.stopPropagation()} // Don't close when clicking the image
          >
            <div
              className="lightbox__image"
              style={
                lightboxItem.src
                  ? undefined
                  : { background: lightboxItem.gradient }
              }
            >
              {lightboxItem.src ? (
                <img
                  src={lightboxItem.src}
                  alt={lightboxItem.label}
                  className="lightbox__img"
                />
              ) : (
                <p className="lightbox__placeholder">{lightboxItem.label}</p>
              )}
            </div>
            <div className="lightbox__caption">
              <span className="lightbox__label">{lightboxItem.label}</span>
              <span className="lightbox__cat">{lightboxItem.category}</span>
            </div>
            <button
              className="lightbox__close"
              onClick={() => setLightboxItem(null)}
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Awards */}
      <section className="section awards-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p className="section-label">Recognition</p>
            <div className="gold-line" />
            <h2 className="section-title">Awards & Accolades</h2>
          </div>
          <div className="awards-grid">
            {AWARDS.map((a) => (
              <div key={a.title} className="award-card">
                <span className="award-card__year">{a.year}</span>
                <h3 className="award-card__title">{a.title}</h3>
                {a.source && <p className="award-card__source">{a.source}</p>}
                <p className="award-card__body">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p className="section-label">What People Are Saying</p>
            <div className="gold-line" />
            <h2 className="section-title">Guest Reviews</h2>
          </div>
          <div className="reviews-grid">
            {REVIEWS.map((r) => (
              <div key={r.source} className="review-card">
                <p className="review-card__quote">"{r.quote}"</p>
                <p className="review-card__source">— {r.source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
