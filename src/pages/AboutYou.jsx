import '../sass/pages/about-you.css';
import Foot from '../components/Footer';

const AboutYou = () => {

    return (
        <div >
            <div className="about-you">
                <h1>Rólunk</h1>
                <p>
                    Üdvözöljük a mi hamburger éttermünkben! Szenvedélyünk a finom ételek készítése, és célunk, hogy minden vendégünk elégedetten távozzon.
                </p>
                <h2>Küldetésünk</h2>
                <p>
                    Küldetésünk, hogy a legjobb minőségű alapanyagokból készült hamburgereket kínáljuk, amelyek nemcsak ízletesek, hanem egészségesek is. Minden egyes hamburgerünket gondosan készítjük el, hogy a lehető legjobb élményt nyújtsuk vendégeinknek.
                </p>
                <h2>Értékeink</h2>
                <ul>
                    <li>Minőség: Csak a legjobb alapanyagokat használjuk.</li>
                    <li>Frissesség: Minden nap frissen készítjük ételeinket.</li>
                    <li>Ügyfélközpontúság: Vendégeink elégedettsége a legfontosabb számunkra.</li>
                </ul>
            </div>
            <Foot />
        </div >
    );

};

export default AboutYou;
