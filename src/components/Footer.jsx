import { Link } from "react-router-dom";
import "../sass/components/footer.css";

export default function Foot() {
  return (
    <footer className="footer-container">
      <div className="footer-content">

        <div className="footer-column">
          <h2 className="footer-title">Kapcsolat</h2>
          <p className="footer-text">Cím: Budapest, 1234 Valahol utca 12.</p>
          <p className="footer-text">Telefon: +36 1 234 5678</p>
          <p className="footer-text">E-mail: info@pelda.hu</p>
        </div>


        <div className="footer-column">
          <h2 className="footer-title">Hasznos linkek</h2>
          <ul className="footer-links">
            <li>
              <Link to="/rolunk" className="footer-link">Rólunk</Link>
            </li>
            <li>
              <Link to="/szolgaltatas" className="footer-link">Szolgáltatásaink</Link>
            
            </li>
           
            <li>
              <Link to="/kapcsolat" className="footer-link">Kapcsolat</Link>
            </li>
          </ul>
        </div>

  
        <div className="footer-column">
          <img src="../public/assets/logo.png" alt="Logo"  />
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-text">
          © {new Date().getFullYear()} Burger House. Minden jog fenntartva.va.
        </p>
      </div>
    </footer>
  );
}