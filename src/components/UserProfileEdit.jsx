import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/contexts";


export default function UserProfileEdit() {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullAddress = `${addressData.zip}, ${addressData.city}, ${addressData.street}, ${addressData.num}`;
    // Handle form submission with formatted address
  };

  const handleAddressChange = (field) => (e) => {
    setAddressData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Profil szerkesztése</h3>
        
        <div>
          <label htmlFor="name">Név:</label>
          <div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Add meg a neved..."
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email">Email cím:</label>
          <div>
            
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="Add meg az email címed..."
            />
          </div>
        </div>

        <div>
          <label htmlFor="zip">Irányítószám:</label>
          <div>
            <input
              value={addressData.zip}
              onChange={handleAddressChange('zip')}
              type="text"
              name="zip"
              placeholder="1119"
            />
          </div>
        </div>

        <div>
          <label htmlFor="city">Város:</label>
          <div>
            <input
              value={addressData.city}
              onChange={handleAddressChange('city')}
              type="text"
              name="city"
              placeholder="Budapest"
            />
          </div>
        </div>

        <div>
          <label htmlFor="street">Utca:</label>
          <div>
            <input
              value={addressData.street}
              onChange={handleAddressChange('street')}
              type="text"
              name="street"
              placeholder="Példa utca"
            />
          </div>
        </div>

        <div>
          <label htmlFor="num">Házszám:</label>
          <div>
            <input
              value={addressData.num}
              onChange={handleAddressChange('num')}
              type="text"
              name="num"
              placeholder="42"
            />
          </div>
        </div>

        <div>
          <button type="submit">Mentés</button>
        </div>
      </form>
    </div>
  );
}