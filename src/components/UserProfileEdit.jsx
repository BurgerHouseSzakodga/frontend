import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/contexts";
import { apiClient } from "../api/axios";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import orderIcon from "/assets/orders.svg";
import '../sass/components/user-profile-edit.css';

export default function UserProfileEdit() {
  const {user, patchUser} = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
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
    e.preventDefault(); // Megakadályozzuk az oldal újratöltését

    setIsLoading(true);
    setMessage("");

    try {
        // Ellenőrizzük, hogy a "street" tartalmazza-e az "utca" szót
        const streetWithUtca = addressData.street.toLowerCase().includes("utca")
            ? addressData.street.trim()
            : `${addressData.street.trim()} utca`;

        const updatedAddress = `${addressData.zip}, ${addressData.city}, ${streetWithUtca}, ${addressData.num}`;
        const payload = {
            name,
            email,
            address: updatedAddress,
        };

        await patchUser(payload); // Használjuk a patchUser függvényt az API-híváshoz
        setMessage("Profil sikeresen frissítve!");
    } catch (error) {
        console.error("Hiba a profil frissítésekor:", error);

        if (error.response) {
            console.log("Backend válasz:", error.response.data);
            setMessage(error.response.data.message || "Hiba történt a mentés során!");
        } else {
            console.log("Általános hiba:", error);
            setMessage("Hiba történt a mentés során!");
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <h3>Profil szerkesztése</h3>
        {message && <div className="message">{message}</div>}
        
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
              required
            />
          </div>
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
              required
            />
          </div>
        </div>

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
