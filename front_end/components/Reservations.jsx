// pages/Reservations.jsx
// The reservation form. Collects guest info, validates all fields,
// then submits to the Flask backend. Shows success or error feedback.

import { useState } from "react";
import "../styles/Reservations.css";

// Points to our Flask backend. Set VITE_API_URL in your .env file to override.
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper: generate available time slots for the next 30 days
// The restaurant is open Mon-Sat 5–11 PM and Sun 5–9 PM
function generateTimeSlots() {
  const slots = [];
  const now = new Date();

  for (let d = 0; d < 30; d++) {
    const date = new Date(now);
    date.setDate(now.getDate() + d + 1); // Start from tomorrow
    const day = date.getDay(); // 0 = Sunday, 6 = Saturday

    // Determine last seating based on day
    const lastSeating = day === 0 ? 20 : 22; // Sun last at 8 PM, others at 10 PM

    // Generate slots every 30 minutes starting at 5 PM
    for (let hour = 17; hour <= lastSeating; hour++) {
      for (let min of [0, 30]) {
        if (hour === lastSeating && min === 30) continue; // No half-past last seating
        const slotDate = new Date(date);
        slotDate.setHours(hour, min, 0, 0);

        // Format for display: "Fri, Dec 27 — 7:30 PM"
        const label = slotDate.toLocaleString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
        });

        // Format for backend: ISO string without timezone issues
        const value = slotDate.toISOString().slice(0, 19);

        slots.push({ label, value });
      }
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

export default function Reservations() {
  // Form field state — one object holds all field values
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    time_slot: "",
    num_guests: "2",
  });

  // Validation errors object — keyed by field name
  const [errors, setErrors] = useState({});

  // Submission state: "" | "loading" | "success" | "error"
  const [status, setStatus] = useState("");
  const [responseMsg, setResponseMsg] = useState("");
  const [tableNumber, setTableNumber] = useState(null);

  // Generic change handler: updates whichever field changed
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear that field's error as soon as the user types
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Client-side validation before hitting the backend
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.includes("@"))
      newErrors.email = "Enter a valid email address.";
    if (!form.time_slot) newErrors.time_slot = "Please select a time slot.";
    if (!form.num_guests || form.num_guests < 1 || form.num_guests > 20)
      newErrors.num_guests = "Guests must be between 1 and 20.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Run validation; if there are errors, show them and stop
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message);
        setTableNumber(data.table_number);
      } else {
        // 409 = slot fully booked; other errors are server-side issues
        setStatus("error");
        setResponseMsg(data.error || "An error occurred. Please try again.");
      }
    } catch {
      setStatus("error");
      setResponseMsg(
        "Unable to connect to the reservation system. Please call us at (202) 555-4567.",
      );
    }
  };

  // If reservation succeeded, show a confirmation card instead of the form
  if (status === "success") {
    return (
      <main className="reservations-page">
        <div className="page-header">
          <div className="container">
            <p className="section-label">Reservations</p>
            <div className="gold-line" />
            <h1 className="section-title page-header__title">
              Your Table Awaits
            </h1>
          </div>
        </div>
        <div className="container section">
          <div className="confirmation-card">
            <div className="confirmation-card__icon">✦</div>
            <h2 className="confirmation-card__title">Reservation Confirmed</h2>
            <p className="confirmation-card__msg">{responseMsg}</p>
            {tableNumber && (
              <p className="confirmation-card__detail">
                Table <strong>{tableNumber}</strong> has been reserved in your
                name. A confirmation will be sent to{" "}
                <strong>{form.email}</strong>.
              </p>
            )}
            <p className="confirmation-card__note">
              We look forward to welcoming you to Café Fausse. If you need to
              modify your reservation, please call us at (202) 555-4567.
            </p>
            <button
              className="btn-gold"
              onClick={() => {
                // Reset everything so user can make another reservation
                setStatus("");
                setForm({
                  name: "",
                  email: "",
                  phone: "",
                  time_slot: "",
                  num_guests: "2",
                });
                setTableNumber(null);
              }}
            >
              Make Another Reservation
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="reservations-page">
      <div className="page-header">
        <div className="container">
          <p className="section-label fade-up fade-up-1">
            Book Your Experience
          </p>
          <div className="gold-line fade-up fade-up-2" />
          <h1 className="section-title page-header__title fade-up fade-up-2">
            Reservations
          </h1>
          <p className="page-header__sub fade-up fade-up-3">
            We hold tables for up to 15 minutes past your reservation time
          </p>
        </div>
      </div>

      <div className="container section">
        <div className="reservations-layout">
          {/* Left: form */}
          <div className="reservations-form-wrap">
            <form className="res-form" onSubmit={handleSubmit} noValidate>
              {/* Guest name */}
              <div className="field">
                <label className="field__label" htmlFor="name">
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`field__input ${errors.name ? "field__input--error" : ""}`}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="field__error">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="field">
                <label className="field__label" htmlFor="email">
                  Email Address *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`field__input ${errors.email ? "field__input--error" : ""}`}
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="field__error">{errors.email}</p>}
              </div>

              {/* Phone (optional) */}
              <div className="field">
                <label className="field__label" htmlFor="phone">
                  Phone Number{" "}
                  <span className="field__optional">(optional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="field__input"
                  placeholder="(202) 555-0000"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>

              {/* Time slot */}
              <div className="field">
                <label className="field__label" htmlFor="time_slot">
                  Date & Time *
                </label>
                <select
                  id="time_slot"
                  name="time_slot"
                  className={`field__input field__select ${errors.time_slot ? "field__input--error" : ""}`}
                  value={form.time_slot}
                  onChange={handleChange}
                >
                  <option value="">Select a time slot…</option>
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
                {errors.time_slot && (
                  <p className="field__error">{errors.time_slot}</p>
                )}
              </div>

              {/* Number of guests */}
              <div className="field">
                <label className="field__label" htmlFor="num_guests">
                  Number of Guests *
                </label>
                <select
                  id="num_guests"
                  name="num_guests"
                  className={`field__input field__select ${errors.num_guests ? "field__input--error" : ""}`}
                  value={form.num_guests}
                  onChange={handleChange}
                >
                  {[...Array(20)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "guest" : "guests"}
                    </option>
                  ))}
                </select>
                {errors.num_guests && (
                  <p className="field__error">{errors.num_guests}</p>
                )}
              </div>

              {/* Server-side error message */}
              {status === "error" && (
                <div className="res-form__error-banner">{responseMsg}</div>
              )}

              <button
                type="submit"
                className="btn-gold res-form__submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Requesting…" : "Request Reservation"}
              </button>
            </form>
          </div>

          {/* Right: info sidebar */}
          <aside className="reservations-info">
            <div className="res-info-card">
              <p className="section-label">Hours</p>
              <div className="gold-line left" style={{ marginTop: 12 }} />
              <p className="res-info-card__hours">Mon – Sat</p>
              <p className="res-info-card__time">5:00 PM – 11:00 PM</p>
              <p className="res-info-card__hours" style={{ marginTop: 16 }}>
                Sunday
              </p>
              <p className="res-info-card__time">5:00 PM – 9:00 PM</p>
            </div>
            <div className="res-info-card">
              <p className="section-label">Contact</p>
              <div className="gold-line left" style={{ marginTop: 12 }} />
              <p className="res-info-card__contact">(202) 555-4567</p>
              <p className="res-info-card__address">
                1234 Culinary Ave, Suite 100
                <br />
                Washington, DC 20002
              </p>
            </div>
            <div className="res-info-card res-info-card--note">
              <p>
                For parties of 8 or more, please contact us directly by phone to
                arrange your event.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
