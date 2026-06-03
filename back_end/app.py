# app.py — Flask backend for Café Fausse
# This file is the heart of the backend. It defines all the API routes
# (URLs that the React frontend will call) and handles the database logic.

import os
import random
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor
from dotenv import load_dotenv

# Load environment variables from a .env file (keeps secrets out of code)
load_dotenv()

# Create the Flask application instance
app = Flask(__name__)
print("LOADED MY APP.PY")
# Allow the React frontend (running on a different port) to call this backend.
# Without this, browsers block "cross-origin" requests for security.
CORS(app, origins=["http://localhost:3000"])

# ─────────────────────────────────────────────
# DATABASE CONNECTION
# ─────────────────────────────────────────────

def get_db_connection():
    """
    Opens a new connection to the PostgreSQL database.
    Uses environment variables so credentials are never hardcoded.
    RealDictCursor makes rows return as Python dicts instead of tuples.
    """
    conn = psycopg2.connect(
        host=os.getenv("DB_HOST", "localhost"),
        database=os.getenv("DB_NAME", "cafe_fausse"),
        user=os.getenv("DB_USER", "postgres"),
        password=os.getenv("DB_PASSWORD", ""),
        cursor_factory=RealDictCursor
    )
    return conn


def init_db():
    """
    Creates the database tables if they don't already exist.
    Call this once when the server starts up.
    """
    conn = get_db_connection()
    cur = conn.cursor()

    # Customers table: stores everyone who has made a reservation or signed up
    cur.execute("""
        CREATE TABLE IF NOT EXISTS customers (
            customer_id   SERIAL PRIMARY KEY,
            customer_name VARCHAR(255) NOT NULL,
            email         VARCHAR(255) UNIQUE NOT NULL,
            phone_number  VARCHAR(50),
            newsletter    BOOLEAN DEFAULT FALSE,
            created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    # Reservations table: one row per booking
    # customer_id is a foreign key linking back to the customers table
    cur.execute("""
        CREATE TABLE IF NOT EXISTS reservations (
            reservation_id SERIAL PRIMARY KEY,
            customer_id    INTEGER REFERENCES customers(customer_id),
            time_slot      TIMESTAMP NOT NULL,
            table_number   INTEGER NOT NULL,
            num_guests     INTEGER NOT NULL,
            created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

    conn.commit()
    cur.close()
    conn.close()
    print("Database tables ready.")


# ─────────────────────────────────────────────
# ROUTE: POST /api/reservations
# ─────────────────────────────────────────────

@app.route("/api/test")
def test():
    return jsonify({"status": "ok"})

@app.route("/api/reservations", methods=["POST"])
def create_reservation():
    """
    Handles a new reservation request from the React frontend.

    Steps:
    1. Read the JSON data sent by the form
    2. Validate required fields
    3. Find which tables are already booked for that time slot
    4. Pick a random available table (out of 30 total)
    5. Save the customer and reservation to the database
    6. Return a success or error message
    """
    data = request.get_json()

    # Check all required fields are present
    required = ["name", "email", "time_slot", "num_guests"]
    for field in required:
        if not data.get(field):
            return jsonify({"error": f"Missing required field: {field}"}), 400

    name       = data["name"]
    email      = data["email"]
    phone      = data.get("phone", "")        # Optional field
    time_slot  = data["time_slot"]            # Expected: "2025-12-25T19:00:00"
    num_guests = int(data["num_guests"])

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Find tables already booked for this exact time slot
        cur.execute("""
            SELECT table_number
            FROM reservations
            WHERE time_slot = %s
        """, (time_slot,))

        booked_tables = {row["table_number"] for row in cur.fetchall()}

        # Build a list of the 30 tables that are still free
        all_tables = set(range(1, 31))
        available_tables = list(all_tables - booked_tables)

        # If no tables are free, tell the customer to pick another time
        if not available_tables:
            cur.close()
            conn.close()
            return jsonify({
                "error": "Sorry, all tables are fully booked for that time. Please choose another slot."
            }), 409  # 409 = Conflict (slot taken)

        # Pick a random table from the available ones
        assigned_table = random.choice(available_tables)

        # Upsert customer: insert if new email, or get existing customer_id
        # ON CONFLICT means "if this email already exists, just return their id"
        cur.execute("""
            INSERT INTO customers (customer_name, email, phone_number)
            VALUES (%s, %s, %s)
            ON CONFLICT (email) DO UPDATE
                SET customer_name = EXCLUDED.customer_name
            RETURNING customer_id
        """, (name, email, phone))

        customer_id = cur.fetchone()["customer_id"]

        # Insert the new reservation row
        cur.execute("""
            INSERT INTO reservations (customer_id, time_slot, table_number, num_guests)
            VALUES (%s, %s, %s, %s)
            RETURNING reservation_id
        """, (customer_id, time_slot, assigned_table, num_guests))

        reservation_id = cur.fetchone()["reservation_id"]
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({
            "message": f"Reservation confirmed! You have been assigned table {assigned_table}.",
            "reservation_id": reservation_id,
            "table_number": assigned_table
        }), 201  # 201 = Created

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────────
# ROUTE: POST /api/newsletter
# ─────────────────────────────────────────────

@app.route("/api/newsletter", methods=["POST"])
def newsletter_signup():
    """
    Saves an email address for the newsletter.
    Validates the email format and avoids duplicates.
    """
    data = request.get_json()
    email = data.get("email", "").strip()

    # Basic email validation: must contain @ and a dot after it
    if not email or "@" not in email or "." not in email.split("@")[-1]:
        return jsonify({"error": "Please enter a valid email address."}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # Insert the email, or if it already exists, just mark newsletter = true
        cur.execute("""
            INSERT INTO customers (customer_name, email, newsletter)
            VALUES ('Newsletter Subscriber', %s, TRUE)
            ON CONFLICT (email) DO UPDATE
                SET newsletter = TRUE
            RETURNING customer_id
        """, (email,))

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({"message": "Thanks for signing up! You'll hear from us soon."}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────────
# ROUTE: GET /api/availability
# ─────────────────────────────────────────────

@app.route("/api/availability", methods=["GET"])
def check_availability():
    """
    Optional helper route: returns how many tables are still available
    for a given time slot. The frontend can call this to show availability
    before the user submits the full form.

    Usage: GET /api/availability?time_slot=2025-12-25T19:00:00
    """
    time_slot = request.args.get("time_slot")
    if not time_slot:
        return jsonify({"error": "time_slot parameter is required"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT COUNT(*) as booked_count
            FROM reservations
            WHERE time_slot = %s
        """, (time_slot,))

        booked = cur.fetchone()["booked_count"]
        available = 30 - booked
        cur.close()
        conn.close()

        return jsonify({
            "time_slot": time_slot,
            "available_tables": available,
            "is_available": available > 0
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ─────────────────────────────────────────────
# START THE SERVER
# ─────────────────────────────────────────────

if __name__ == "__main__":
    # Initialize database tables before accepting requests
    init_db()
    # debug=True reloads the server automatically when you save this file
    app.run(debug=True, port=5001)
