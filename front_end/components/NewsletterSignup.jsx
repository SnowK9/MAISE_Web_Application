// NewsletterSignup.jsx
// A reusable email signup form that calls the Flask backend.
// Shows success/error messages after submission.

import { useState } from "react";
import "../styles/NewsletterSignup.css";

// API_URL points to our Flask backend (running on port 5000 locally)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function NewsletterSignup() {
  // Controlled input: React tracks the value of the email field
  const [email, setEmail] = useState("");
  // Status can be: "" | "loading" | "success" | "error"
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    // Prevent the browser from refreshing the page on form submit
    e.preventDefault();
    setStatus("loading");

    try {
      // Send the email to our Flask /api/newsletter endpoint
      const res = await fetch(`${API_URL}/api/newsletter`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail(""); // Clear the field on success
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      // Network error (e.g. backend not running)
      setStatus("error");
      setMessage("Unable to connect. Please try again later.");
    }
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter__inner">
          <div className="newsletter__text">
            <p className="section-label">Stay Connected</p>
            <h2 className="newsletter__title">The Café Fausse Newsletter</h2>
            <p className="newsletter__desc">
              Seasonal menus, exclusive events, and stories from our kitchen —
              delivered to your inbox.
            </p>
          </div>

          {/* Show the form unless signup succeeded */}
          {status === "success" ? (
            <div className="newsletter__success">
              <span className="newsletter__check">✦</span>
              <p>{message}</p>
            </div>
          ) : (
            <form
              className="newsletter__form"
              onSubmit={handleSubmit}
              noValidate
            >
              <input
                type="email"
                className="newsletter__input"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="btn-gold newsletter__btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Subscribing…" : "Subscribe"}
              </button>
              {/* Show inline error if validation fails */}
              {status === "error" && (
                <p className="newsletter__error">{message}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
