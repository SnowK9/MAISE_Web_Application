// App.jsx
// The root component. Sets up React Router to handle navigation between pages.
// Every page shares the same Navbar and Footer, which live here.

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Menu from "../components/Menu";
import Reservations from "../components/Reservations";
import About from "../components/About";
import Gallery from "../components/Gallery";

export default function App() {
  return (
    // BrowserRouter enables URL-based navigation (e.g. /menu, /reservations)
    <BrowserRouter>
      {/* Navbar sits above every page */}
      <Navbar />

      {/* Routes: only the matching component renders */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        {/* Fallback: redirect unknown paths to home */}
        <Route path="*" element={<Home />} />
      </Routes>

      {/* Footer sits below every page */}
      <Footer />
    </BrowserRouter>
  );
}
