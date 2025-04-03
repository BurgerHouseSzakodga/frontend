import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/contexts";
import '../sass/components/user-profile-edit.css';

export default function UserProfileEdit() {
  const { user, patchUser, updateMessage, setUpdateMessage } = useContext(AuthContext);
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
        const payload = {
            name,
            email,
            zip: addressData.zip.trim(),
            city: addressData.city.trim(),
            street: addressData.street.trim().toLowerCase().includes("utca")
                ? addressData.street.trim()
                : `${addressData.street.trim()} utca`,
            num: addressData.num.trim(),
        };

        console.log("Elküldött adatok:", payload); 

        await patchUser(payload);
        console.log("Profil sikeresen frissítve!");
    } catch (error) {
        if (error.response?.status === 422) {
            setUpdateMessage(error.response.data.errors); // Hibák mentése
        } else {
            console.error("Hiba történt a profil frissítése közben:", error);
            setUpdateMessage({ error: "Ismeretlen hiba történt." });
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <h3>Profil szerkesztése</h3>
        {updateMessage?.success && (
          <div className="alert success">{updateMessage.success}</div>
        )}
        {updateMessage?.error && (
          <p className="alert error">{updateMessage.error}</p>
        )}

        <div className="form-group">
          <label htmlFor="name">Név:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Add meg a neved..."
          />
          {updateMessage?.name && (
            <p className="message">{updateMessage.name[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email cím:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Add meg az email címed..."
          />
          {updateMessage?.email && (
            <p className="message">{updateMessage.email[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="zip">Irányítószám:</label>
          <input
            value={addressData.zip}
            onChange={handleAddressChange('zip')}
            type="text"
            name="zip"
            placeholder="1234"
            required
            pattern="^\d{4}$"
            title="Az irányítószámnak pontosan 4 számjegyből kell állnia."
          />
          {updateMessage?.zip && (
            <p className="message">{updateMessage.zip[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="city">Város:</label>
          <input
            value={addressData.city}
            onChange={handleAddressChange('city')}
            type="text"
            name="city"
            placeholder="Budapest"
            required
            pattern="^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\s]+$"
            title="A város neve csak betűket tartalmazhat."
          />
          {updateMessage?.city && (
            <p className="message">{updateMessage.city[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="street">Utca:</label>
          <input
            value={addressData.street}
            onChange={handleAddressChange('street')}
            type="text"
            name="street"
            placeholder="Példa utca"
          />
          {updateMessage?.street && (
            <p className="message">{updateMessage.street[0]}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="num">Házszám:</label>
          <input
            value={addressData.num}
            onChange={handleAddressChange('num')}
            type="text"
            name="num"
            placeholder="42"
            required
            pattern="^\s*\d+\s*$"
            title="A házszám csak számokat és opcionális szóközöket tartalmazhat."
          />
          {updateMessage?.num && (
            <p className="message">{updateMessage.num[0]}</p>
          )}
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
