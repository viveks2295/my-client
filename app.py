from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import smtplib
from email.mime.text import MIMEText
from flask_cors import CORS
import os

app = Flask(__name__, static_folder=".")
CORS(app)

DB = "database.db"

# ================= EMAIL FUNCTION =================
def send_email(name, mobile, date, product):
    try:
        sender_email = "glittersdairy@gmail.com"
        sender_password = "egew omsb mltl xavr"   # Gmail App Password
        receiver_email = "glittersdairy@gmail.com"

        body = f"""
NEW BOOKING RECEIVED 🔔

Name   : {name}
Mobile : {mobile}
Date   : {date}
Service: {product}
"""

        msg = MIMEText(body)
        msg["Subject"] = "New Booking - Glitter Diary"
        msg["From"] = sender_email
        msg["To"] = receiver_email

        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()

        print("✅ Email sent successfully")

    except Exception as e:
        print("❌ Email error:", e)


# ================= ROUTES =================

@app.route("/")
def home():
    return send_from_directory(".", "index.html")


@app.route("/<path:filename>")
def static_files(filename):
    if os.path.exists(filename):
        return send_from_directory(".", filename)
    return "File not found", 404


@app.route("/book", methods=["POST"])
def book():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Invalid JSON"}), 400

    try:
        conn = sqlite3.connect(DB)
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO bookings (name, mobile, date, product) VALUES (?, ?, ?, ?)",
            (
                data.get("name"),
                data.get("mobile"),
                data.get("date"),
                data.get("product")
            )
        )
        conn.commit()
        conn.close()

        send_email(
            data.get("name"),
            data.get("mobile"),
            data.get("date"),
            data.get("product")
        )

        return jsonify({"message": "Booking saved & email sent"})

    except Exception as e:
        print("❌ DB error:", e)
        return jsonify({"error": "Booking failed"}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000 debug=True)
