import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Smart Travel Companion</h1>

      <section className="company-info">
        <p>
          Smart Travel Companion is a Sri Lanka-based travel tech company dedicated to helping travelers plan unforgettable journeys. 
          From flight bookings to hotel recommendations and vehicle rentals, we bring everything under one intelligent platform. 
          With a focus on user experience, local expertise, and real-time updates, we ensure your adventures are safe, smart, and seamless.
        </p>
      </section>

      <section className="contact-section">
        <h2>Get in Touch</h2>

        <div className="contact-buttons">
          <a href="tel:+94712345678" className="call-button">📞 Call Us</a>
        </div>

        <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert("Message sent!"); }}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
          />
          <button type="submit">Send Email</button>
        </form>
      </section>
    </div>
  );
};

export default Contact;
