# AI Tooling — Café Fausse Web Application

This document summarizes the AI-assisted development tools used during the building of the Café Fausse web application, how they were used, and an honest assessment of what worked well and what did not.

---

## Tools Used

### Claude (claude.ai) — Primary Tool

**Provider:** Anthropic  
**Model:** Claude Sonnet 4.6  
**Interface:** Claude Code (CLI)

Claude Code was the primary AI tool used throughout this project. The Software Requirements Specification (SRS) document was loaded directly into the session, and Claude was used to generate, explain, and refine code across all layers of the stack.

---

## How Claude Was Used

### Backend (Flask / Python)

The SRS document was uploaded to Claude at the start of the project. Claude generated the complete Flask backend (`app.py`) including:

- Database connection logic using `psycopg2`
- Automatic table creation with `CREATE TABLE IF NOT EXISTS` on startup
- `POST /api/reservations` — the full reservation route with availability checking, random table assignment, and customer upsert logic
- `POST /api/newsletter` — email signup with duplicate handling
- `GET /api/availability` — slot availability check
- Flask-CORS configuration to allow the React frontend to communicate with the backend
- Environment variable setup via `python-dotenv`

Every function and logical step was commented in plain English, which made it straightforward to understand and modify the generated code.

### Frontend (React / JSX / CSS)

Claude generated all five React pages and shared components from scratch:

- `Home.jsx` — hero section, info bar, featured dishes, awards strip, newsletter signup
- `Menu.jsx` — full menu organized by category with dotted price lines
- `Reservations.jsx` — booking form with client-side validation, dynamic time slot generation, Flask API integration, and a confirmation card on success
- `About.jsx` — restaurant history, founder bios, values section
- `Gallery.jsx` — filterable photo grid, lightbox viewer, awards cards, guest reviews
- `Navbar.jsx` — fixed navigation with scroll detection and mobile hamburger menu
- `Footer.jsx` — contact info, hours, quick links
- `NewsletterSignup.jsx` — reusable component used across pages

CSS was generated for each component separately and then consolidated into a flat `components/` folder structure to match the project's actual file organization. The design aesthetic — deep charcoal, warm gold accents, Cormorant Garamond and Jost typography — was selected and applied consistently by Claude across all stylesheets.

### Configuration Files

Claude also generated:

- `vite.config.js` — including the `/api` proxy to the Flask backend to avoid CORS issues in development
- `package.json` — with correct dependencies for React 18, React Router v6, and Vite
- `index.html` — the Vite entry point
- `.env.example` files for both frontend and backend
- `README.md` — full project documentation including setup instructions, API reference, and design decisions

---

## What Worked Well

**Loading the SRS directly into the conversation** was the most effective starting point. Because Claude could reference the exact requirements — menu items, prices, founders' names, address, hours, database schema — the generated code was accurate and complete without needing repeated corrections.

**Commented code throughout.** Every file was generated with line-by-line comments explaining what each block does. This was especially useful for understanding Flask concepts like `request.get_json()`, `ON CONFLICT` SQL clauses, and React hooks like `useState` and `useEffect`.

**Iterative refinement worked well.** When the folder structure of the project turned out to be different from what was initially generated (a flat `components/` folder rather than a `components/` + `pages/` split), Claude quickly identified which import paths needed updating and explained exactly what to change.

**Visual explanations.** Claude generated an interactive flowchart showing the step-by-step logic of the reservation route, which was helpful for understanding the backend before the recorded demo.

---

## What Did Not Work as Well

**Placeholder images.** The Gallery page was generated using CSS gradient tiles as stand-ins for real photos, since no actual restaurant images were provided to Claude. Real images needed to be sourced separately and swapped in manually.

**Folder structure assumptions.** The initial code generation assumed a `pages/` subfolder for page-level components. The actual project used a flat `components/` folder, so import paths in `App.jsx` and the CSS imports in each page component needed to be manually updated to match.

**No live browser testing.** Claude generates code but cannot run it or preview it in a browser. Each file had to be copied into the project and tested locally, which is where issues like missing import paths or CSS variable scoping would surface. Testing in the browser remained a manual step throughout.

---

## Summary

| Task                                           | Tool             | Outcome                               |
| ---------------------------------------------- | ---------------- | ------------------------------------- |
| Flask backend (all routes)                     | Claude           | Complete, commented, production-ready |
| React frontend (all 5 pages)                   | Claude           | Complete with responsive CSS          |
| Shared components (Navbar, Footer, Newsletter) | Claude           | Complete, reusable                    |
| Config files (Vite, package.json)              | Claude           | Complete                              |
| Documentation (README, ai-tooling)             | Claude           | Complete                              |
| Code explanation and debugging guidance        | Claude           | Very helpful                          |
| Real restaurant photography                    | Not AI-generated | Sourced separately                    |
