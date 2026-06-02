// pages/Menu.jsx
// Displays the full menu organized into four categories.
// Each category is its own section with a list of items, descriptions, and prices.
// All menu data comes directly from the SRS requirements document.

// import "./Menu.css";

// The complete menu as a data structure.
// Keeping data separate from layout makes it easy to update later.
const MENU = [
  {
    category: "Starters",
    items: [
      {
        name: "Bruschetta",
        desc: "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
        price: "$8.50",
      },
      {
        name: "Caesar Salad",
        desc: "Crisp romaine with homemade Caesar dressing",
        price: "$9.00",
      },
    ],
  },
  {
    category: "Main Courses",
    items: [
      {
        name: "Grilled Salmon",
        desc: "Served with lemon butter sauce and seasonal vegetables",
        price: "$22.00",
      },
      {
        name: "Ribeye Steak",
        desc: "12 oz prime cut with garlic mashed potatoes",
        price: "$28.00",
      },
      {
        name: "Vegetable Risotto",
        desc: "Creamy Arborio rice with wild mushrooms",
        price: "$18.00",
      },
    ],
  },
  {
    category: "Desserts",
    items: [
      {
        name: "Tiramisu",
        desc: "Classic Italian dessert with mascarpone",
        price: "$7.50",
      },
      {
        name: "Cheesecake",
        desc: "Creamy cheesecake with berry compote",
        price: "$7.00",
      },
    ],
  },
  {
    category: "Beverages",
    items: [
      {
        name: "Red Wine (Glass)",
        desc: "A selection of Italian reds",
        price: "$10.00",
      },
      {
        name: "White Wine (Glass)",
        desc: "Crisp and refreshing",
        price: "$9.00",
      },
      {
        name: "Craft Beer",
        desc: "Local artisan brews",
        price: "$6.00",
      },
      {
        name: "Espresso",
        desc: "Strong and aromatic",
        price: "$3.00",
      },
    ],
  },
];

export default function Menu() {
  return (
    <main className="menu-page">
      {/* Page header */}
      <div className="page-header">
        <div className="container">
          <p className="section-label fade-up fade-up-1">Our Offerings</p>
          <div className="gold-line fade-up fade-up-2" />
          <h1 className="section-title page-header__title fade-up fade-up-2">
            The Menu
          </h1>
          <p className="page-header__sub fade-up fade-up-3">
            Crafted with locally sourced ingredients and classical Italian
            technique
          </p>
        </div>
      </div>

      {/* Menu categories */}
      <div className="section container">
        {MENU.map((section, i) => (
          <div key={section.category} className="menu-section">
            {/* Category header */}
            <div className="menu-section__header">
              <span className="menu-section__num">0{i + 1}</span>
              <h2 className="menu-section__title">{section.category}</h2>
              <div className="menu-section__rule" />
            </div>

            {/* Items list */}
            <div className="menu-section__items">
              {section.items.map((item) => (
                <div key={item.name} className="menu-item">
                  <div className="menu-item__left">
                    <h3 className="menu-item__name">{item.name}</h3>
                    <p className="menu-item__desc">{item.desc}</p>
                  </div>
                  {/* Dotted line stretches between name and price */}
                  <span className="menu-item__dots" aria-hidden="true" />
                  <span className="menu-item__price">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Dietary note */}
        <p className="menu-note">
          Please inform your server of any dietary restrictions or allergies.
          Menu items and prices are subject to seasonal change.
        </p>
      </div>
    </main>
  );
}
