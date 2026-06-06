# Café Fausse — Restaurant Web Application

A full-stack restaurant website built for Café Fausse, a fine-dining establishment in Washington, DC. The application features a responsive React frontend, a Flask REST API backend, and a PostgreSQL database for managing reservations and newsletter signups.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Setup & Installation](#setup--installation)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Set Up the Database](#2-set-up-the-database)
  - [3. Set Up the Backend](#3-set-up-the-backend)
  - [4. Set Up the Frontend](#4-set-up-the-frontend)
- [Running the Application](#running-the-application)
- [Pages & Features](#pages--features)
- [API Endpoints](#api-endpoints)
- [Design Decisions](#design-decisions)

---

## Project Overview

Café Fausse needed a digital presence that matched the elegance of their brand. This application provides:

- A public-facing website with five pages: Home, Menu, Reservations, About Us, and Gallery
- An online reservation system that checks availability and assigns tables automatically
- A newsletter email signup stored in the database
- A consistent luxury aesthetic using deep charcoal tones, warm gold accents, and editorial typography

---

## Tech Stack

| Layer     | Technology                        |
|-----------|-----------------------------------|
| Frontend  | React 18, JSX, CSS Flexbox & Grid |
| Backend   | Python 3, Flask, Flask-CORS       |
| Database  | PostgreSQL                        |
| Build Tool| Vite                              |
| Routing   | React Router v6                   |

---

## Project Structure

```
MAISE_Web_Application/
│
├── front_end/                 # React application
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   ├── src/
│   │   ├── main.jsx           # App entry point
│   │   └── App.jsx            # Root component with routing
│   ├── components/            # All page and shared components (flat structure)
│   │   ├── Home.jsx           # Landing page
│   │   ├── Menu.jsx           # Full menu by category
│   │   ├── Reservations.jsx   # Booking form
│   │   ├── About.jsx          # Founders and restaurant story
│   │   ├── Gallery.jsx        # Photo gallery with lightbox
│   │   ├── Navbar.jsx         # Fixed navigation bar
│   │   ├── Footer.jsx         # Site-wide footer
│   │   └── NewsletterSignup.jsx  # Reusable email signup form
│   ├── styles/                # Per-component CSS files
│   │   ├── global.css         # CSS variables, resets, shared utilities
│   │   ├── Home.css
│   │   ├── Menu.css
│   │   ├── Reservations.css
│   │   ├── About.css
│   │   ├── Gallery.css
│   │   ├── Navbar.css
│   │   ├── Footer.css
│   │   └── NewsletterSignup.css
│   └── gallery/               # Static image assets (.webp)
│
└── back_end/                  # Flask API
    ├── app.py                 # All routes and database logic
    ├── requirements.txt       # Python dependencies
    └── .env.example           # Environment variable template
```

---

## Prerequisites

Make sure the following are installed on your machine before proceeding:

- **Node.js** v18 or higher — [Download here](https://nodejs.org/)
- **Python** 3.9 or higher — [Download here](https://python.org/)
- **PostgreSQL** 14 or higher — [Download here](https://www.postgresql.org/download/)
- **pip** (comes with Python)
- **npm** (comes with Node.js)

---

## Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/cafe-fausse.git
cd cafe-fausse
```

---

### 2. Set Up the Database

Open the PostgreSQL shell (psql) and run the following commands to create the database:

```sql
CREATE DATABASE cafe_fausse;
```

You do not need to create the tables manually. The Flask backend creates them automatically the first time it starts up.

---

### 3. Set Up the Backend

Navigate to the backend folder and install the Python dependencies:

```bash
cd back_end
pip install -r requirements.txt
```

Create your environment file by copying the example:

```bash
cp .env.example .env
```

Open `.env` and fill in your PostgreSQL credentials:

```
DB_HOST=localhost
DB_NAME=cafe_fausse
DB_USER=postgres
DB_PASSWORD=your_actual_password_here
```

---

### 4. Set Up the Frontend

Navigate to the frontend folder and install the JavaScript dependencies:

```bash
cd ../front_end
npm install
```

---

## Running the Application

You need two terminal windows — one for the backend, one for the frontend.

**Terminal 1 — Start the Flask backend:**

```bash
cd back_end
python app.py
```

You should see:

```
Database tables ready.
 * Running on http://127.0.0.1:5001
```

**Terminal 2 — Start the React frontend:**

```bash
cd front_end
npm run dev
```

You should see:

```
  VITE ready in Xms
  ➜  Local: http://localhost:3000/
```

Open your browser and go to **http://localhost:3000** to view the site.

---

## Pages & Features

| Page          | URL              | Key Features                                                  |
|---------------|------------------|---------------------------------------------------------------|
| Home          | `/`              | Hero section, contact info, featured dishes, awards, newsletter signup |
| Menu          | `/menu`          | Full menu in four categories: Starters, Mains, Desserts, Beverages |
| Reservations  | `/reservations`  | Booking form with validation, availability check, table assignment |
| About Us      | `/about`         | Restaurant history, founder bios, core values                 |
| Gallery       | `/gallery`       | Filterable photo grid, lightbox viewer, awards, guest reviews |

### Reservation System Logic

1. The customer fills out the form (name, email, optional phone, date/time, number of guests)
2. Client-side validation runs before any data is sent
3. Flask receives the request and queries the database for already-booked tables at that time slot
4. If all 30 tables are taken, a "fully booked" error is returned
5. If tables are available, one is randomly assigned
6. The customer record and reservation are saved to the database
7. A confirmation with the table number is shown to the customer

### Newsletter Signup

- Available in the footer of the Home page
- Validates email format before submission
- Stores the email in the `customers` table with `newsletter = TRUE`
- Handles duplicate emails gracefully — updating existing records rather than creating duplicates

---

## API Endpoints

All endpoints are served by the Flask backend at `http://localhost:5001`.

### `POST /api/reservations`

Creates a new reservation.

**Request body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "(202) 555-0000",
  "time_slot": "2025-12-27T19:00:00",
  "num_guests": 2
}
```

**Success response (201):**
```json
{
  "message": "Reservation confirmed! You have been assigned table 14.",
  "reservation_id": 7,
  "table_number": 14
}
```

**Error responses:**
- `400` — Missing required field
- `409` — Time slot fully booked
- `500` — Server/database error

---

### `POST /api/newsletter`

Subscribes an email address to the newsletter.

**Request body:**
```json
{
  "email": "guest@example.com"
}
```

**Success response (201):**
```json
{
  "message": "Thanks for signing up! You'll hear from us soon."
}
```

---

### `GET /api/availability`

Checks how many tables remain for a given time slot.

**Query parameter:** `?time_slot=2025-12-27T19:00:00`

**Response:**
```json
{
  "time_slot": "2025-12-27T19:00:00",
  "available_tables": 22,
  "is_available": true
}
```

---

## Design Decisions

**Aesthetic direction:** A luxury fine-dining aesthetic was chosen — deep charcoal backgrounds (`#1a1a18`), warm gold accents (`#c9a84c`), Cormorant Garamond for display text, and Jost for body text. The goal was a visual identity consistent with a high-end DC restaurant rather than a generic template.

**CSS layout approach:** CSS Flexbox is used for navigation, footers, and horizontal arrangements. CSS Grid is used for multi-column page layouts (menu sections, gallery, founder cards). This satisfies the SRS requirement for Flexbox or Grid usage.

**API communication:** The frontend calls the Flask backend directly using the `VITE_API_URL` environment variable (set to `http://localhost:5001`). Flask-CORS is configured to allow requests from the frontend origin (`http://localhost:3000`). A Vite proxy is also defined in `vite.config.js` as a fallback, but the direct URL approach via `VITE_API_URL` is the active path.

**Table assignment:** Tables are randomly selected from the pool of unbooked tables for a given time slot using Python's `random.choice()`. The `ON CONFLICT` clause on customer inserts prevents duplicate customer records when the same email is used for multiple reservations.

**Form validation:** Validation happens at two levels — client-side in React (immediate user feedback) and server-side in Flask (data integrity). Both layers are required; client-side alone can be bypassed.
