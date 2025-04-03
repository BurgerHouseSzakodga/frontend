import "../sass/pages/contact-us.css";
import Footer from "../components/Footer";

const ContactUs = () => {
  return (
    <div>
      <div className="contact-us">
        <h1>Kapcsolat</h1>
        <p>
          Ha bármilyen kérdése van, vagy szeretne többet megtudni rólunk, ne
          habozzon kapcsolatba lépni velünk!
        </p>
        <div className="contact-info">
          <p>
            <strong>Cím:</strong> Budapest, 1234 Valahol utca 12.
          </p>
          <p>
            <strong>Telefon:</strong> +36 1 234 5678
          </p>
          <p>
            <strong>Email:</strong> info@pelda.hu
          </p>
        </div>
        <div className="map-container">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2381.690217107928!2d-6.260309684228515!3d53.34980597997995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48670e9b8f0e0b0b%3A0x2b0e0b0b0b0b0b0b!2sGoogle!5e0!3m2!1sen!2sus!4v1633021234567!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
