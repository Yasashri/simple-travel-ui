import React from "react";
import "../styles/TravelGuide.css";

const TravelGuide = () => {
  return (
    <div className="travel-guide-container">
     

      <header className="intro-section">
        <h2>Explore the Best of Australia, England & New Zealand</h2>
        <p>Your complete travel guide to unforgettable destinations.</p>
      </header>

      <section className="country-section">
        <h3>🇦🇺 Australia</h3>
        <img src="aus.webp" alt="Australia" />
        <p>
          Australia is a land of vibrant cities, stunning coastlines, and the
          outback. From the iconic Sydney Opera House to the Great Barrier Reef,
          there's something for every traveler.
        </p>
        <ul>
          <li>🏙 Sydney: Opera House, Harbour Bridge, Bondi Beach</li>
          <li>🏝 Great Barrier Reef: Snorkeling, scuba diving, cruises</li>
          <li>🌵 Uluru: Sacred rock formations and desert landscapes</li>
        </ul>
      </section>

      <section className="country-section">
        <h3>🇬🇧 England</h3>
        <img src="uk.jpg" alt="England" />
        <p>
          England offers a mix of royal heritage, modern life, and cozy
          countryside. Visit iconic landmarks and experience rich history.
        </p>
        <ul>
          <li>🏰 London: Big Ben, Buckingham Palace, London Eye</li>
          <li>🌳 Lake District: Hiking, lakeside villages, nature</li>
          <li>⚽ Manchester: Football culture, nightlife, museums</li>
        </ul>
      </section>

      <section className="country-section">
        <h3>🇳🇿 New Zealand</h3>
        <img src="nz.webp" alt="New Zealand" />
        <p>
          Known for its breathtaking nature, New Zealand is perfect for
          adventurers and nature lovers. Explore glaciers, fjords, and Maori culture.
        </p>
        <ul>
          <li>⛰ Queenstown: Adventure sports, mountain views</li>
          <li>🏞 Milford Sound: Cruises, waterfalls, wildlife</li>
          <li>🌋 Rotorua: Geothermal parks, Maori culture, hot springs</li>
        </ul>
      </section>

      
    </div>
  );
};

export default TravelGuide;
