import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/contexts";
import { apiClient } from "../api/axios";

export default function UserProfileEdit() {
  const { user } = useContext(AuthContext);
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
      const [zip, city, street, num] = user.address.split(', ');
      setAddressData({
        zip: zip || '',
        city: city || '',
        street: street || '',
        num: num || ''
      });
    }
  }, [user]);

  const handleAddressChange = (field) => (e) => {
    setAddressData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (name !== user.name) {
        await apiClient.patch('/api/user/name', { name });
      }
      
      if (email !== user.email) {
        await apiClient.patch('/api/user/email', { email });
      }

      const [currentZip, currentCity, currentStreet, currentNum] = user.address?.split(', ') || [];
      if (addressData.zip !== currentZip || 
         addressData.city !== currentCity ||
         addressData.street !== currentStreet ||
         addressData.num !== currentNum) {
        await apiClient.patch('/api/user/address', addressData);
      }

      alert("Profil sikeresen frissítve!");
    } catch (error) {
      console.error("Hiba:", error.response?.data);
      alert(error.response?.data?.message || "Hiba történt a mentés során!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-edit">
      <form onSubmit={handleSubmit}>
        <h3>Profil szerkesztése</h3>
        
        <div className="form-group">
          <label htmlFor="name">Név:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Add meg a neved..."
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email cím:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Add meg az email címed..."
            required
          />
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
          />
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
          />
        </div>

        <div className="form-group">
          <label htmlFor="street">Utca:</label>
          <input
            value={addressData.street}
            onChange={handleAddressChange('street')}
            type="text"
            name="street"
            placeholder="Példa utca"
            required
          />
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
          />
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