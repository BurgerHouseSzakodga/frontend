import '../sass/pages/service.css';
import Foot from '../components/Footer';

const Service = () => {
    return (
        <div>
            <div className="service-container">
                <h1 className="service-title">Szolgáltatásaink</h1>
                <p className="service-description">Széles körű szolgáltatásokat kínálunk az Ön igényeinek kielégítésére.</p>
                <ul className="service-list">
                    <li>🍔 Hamburgerek készítése</li>
                    <li>⚡ Gyors kiszolgálás</li>
                    <li>💻 Online rendelés</li>
                    <li>🚚 Házhoz szállítás</li>
                    <li>💵 Készpénzes vagy bankkártyás fizetés</li>
                    <li>👨‍🍳 Személyre szabott hamburgerek rendelése</li>
                    <li>📋 Széles választék</li>
                    <li>😋 Ízletes, finom ételek</li>
                    <li>💸 Havi kedvezmények</li>
                </ul>
            </div>
            <Foot />
        </div>
    );
};

export default Service;
