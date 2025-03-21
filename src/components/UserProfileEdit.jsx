import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/contexts";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import orderIcon from "/assets/orders.svg";
import '../sass/components/user-profile-edit.css';

export default function UserProfileEdit() {
  const { user, patchUser, updateMessage , setUpdateMessage} = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [addressData, setAddressData] = useState({
    zip: '',
    city: '',
    street: '',
    num: ''
  });

  useEffect(() => {
    if (user?.address) {
      const addressParts = user.address.split(',');
      setAddressData({
        zip: addressParts[0] || '',
        city: addressParts[1] || '',
        street: addressParts[2] || '',
        num: addressParts[3] || ''
      });
    }
  }, [user]);

  const handleAddressChange = (field) => (e) => {
    const value = e.target.value;

    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const streetWithUtca = addressData.street.toLowerCase().includes("utca")
        ? addressData.street.trim()
        : `${addressData.street.trim()} utca`;

      const updatedAddress = `${addressData.zip}, ${addressData.city}, ${streetWithUtca}, ${addressData.num}`;
      const payload = {
        name,
        email,
        address: updatedAddress,
      };

      await patchUser(payload);
      console.log("Profil sikeresen frissítve!");
    } catch (error) {
      setUpdateMessage("Hiba történt a profil frisitésekor"+error);

    }
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <h3>Profil szerkesztése</h3>
        {/* Sikeres üzenet megjelenítése */}
        {updateMessage?.success && (
          <div className="alert success">{updateMessage.success}</div>
        )}
        {/* Hibák megjelenítése */}
        {updateMessage?.errorr && (
          <p className="alert success">{updateMessage.error}</p>
        )}

        <div className="form-group">
          <label htmlFor="name">Név:</label>
          <div className="input-container">
            <img src={userIcon} alt="User icon" className="input-icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Add meg a neved..."

            />
          </div>
          {updateMessage.name && <p className="message">{updateMessage.name}</p>} {/* Formázott hibaüzenet */}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email cím:</label>
          <div className="input-container">
            <img src={emailIcon} alt="Email icon" className="input-icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Add meg az email címed..."

            />
          </div>
          {updateMessage.email && <p className="message">{updateMessage.email}</p>} {/* Formázott hibaüzenet */}
        </div>
        {updateMessage.address && <p className="message">{updateMessage.address}</p>} {/* Formázott hibaüzenet */}
        <div className="form-group">
          <label htmlFor="zip">Irányítószám:</label>
          <div className="input-container">
            <img src={orderIcon} alt="Address icon" className="input-icon" />
            <input
              value={addressData.zip}
              onChange={handleAddressChange('zip')}
              type="text"
              name="zip"
              placeholder="1234"
              required
              pattern="^\d{4}$" // Csak 4 számjegy
              title="Az irányítószámnak pontosan 4 számjegyből kell állnia."
            />
          </div>

        </div>

        <div className="form-group">
          <label htmlFor="city">Város:</label>
          <div className="input-container">
            <img src={orderIcon} alt="Address icon" className="input-icon" />
            <input
              value={addressData.city}
              onChange={handleAddressChange('city')}
              type="text"
              name="city"
              placeholder="Budapest"
              required
              pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$" // Csak betűk és szóközök
              title="A város neve csak betűket tartalmazhat."
            />
          </div>
         
        </div>

        <div className="form-group">
          <label htmlFor="street">Utca:</label>
          <div className="input-container">
            <img src={orderIcon} alt="Address icon" className="input-icon" />
            <input
              value={addressData.street}
              onChange={handleAddressChange('street')}
              type="text"
              name="street"
              placeholder="Példa utca"
              required
            />
          </div>
      
        </div>

        <div className="form-group">
          <label htmlFor="num">Házszám:</label>
          <div className="input-container">
            <img src={orderIcon} alt="Address icon" className="input-icon" />
            <input
              value={addressData.num}
              onChange={handleAddressChange('num')}
              type="text"
              name="num"
              placeholder="42"
              required
              pattern="^\s*\d+\s*$" // Számok előtt és után opcionális szóközök
              title="A házszám csak számokat és opcionális szóközöket tartalmazhat."
            />
          </div>
        
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="submit-button"
        >
          {isLoading ? 'Mentés...' : 'Mentés'}
        </button>
      </form>
    </div>
  );
}
