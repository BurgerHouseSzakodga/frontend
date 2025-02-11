import React from "react";
import "../sass/components/footer.css";

export default function Foot() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Első oszlop */}
        <div className="footer-column">
          <h2 className="footer-title">Kapcsolat</h2>
          <p className="footer-text">Cím: Budapest, 1234 Valahol utca 12.</p>
          <p className="footer-text">Telefon: +36 1 234 5678</p>
          <p className="footer-text">E-mail: info@pelda.hu</p>
        </div>

        {/* Második oszlop */}
        <div className="footer-column">
          <h2 className="footer-title">Hasznos linkek</h2>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">Rólunk</a>
            </li>
            <li>
              <a href="#" className="footer-link">Szolgáltatásaink</a>
            </li>
            <li>
              <a href="#" className="footer-link">GYIK</a>
            </li>
            <li>
              <a href="#" className="footer-link">Kapcsolat</a>
            </li>
          </ul>
        </div>

        {/* Harmadik oszlop */}
        <div className="footer-column">
          <h2 className="footer-title">Hírlevél</h2>
          <p className="footer-text">Iratkozz fel, hogy ne maradj le az újdonságokról!</p>
          <form className="footer-form">
            <input
              type="email"
              placeholder="E-mail címed"
              className="footer-input"
            />
            <button
              type="submit"
              className="footer-button"
            >
              Feliratkozás
            </button>
          </form>
        </div>
      </div>

      {/* Alsó szekció */}
      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © {new Date().getFullYear()} Példa Kft. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  );
}