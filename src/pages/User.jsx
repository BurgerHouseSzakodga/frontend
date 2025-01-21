import { useContext, useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { AuthContext } from "../context/contexts";
import { useNavigate } from "react-router-dom";
import "../sass/pages/user.css";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import orderIcon from "/assets/orders.svg";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { user, authLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        address: formData.address || undefined,
      };

      // Felhasználói adat frissítése
      const response = await apiClient.put("/api/user/profile", payload);

      setSuccessMessage("Profil sikeresen frissítve!");
      setError('');
    } catch (error) {
      setError("Hiba történt a profil frissítése közben!");
      setSuccessMessage('');
      console.error(error);
    }
  };

  return (
    <div className="user">
      {authLoading && <p>Betöltés...</p>}

      <form onSubmit={handleSubmit}>
        <h2>Üdv {formData.name}! </h2>
        <h3>Profil frissítése</h3>
        <div>
          <label htmlFor="name">Név</label>
          <div className="input-container">
            <img src={userIcon} alt="User Icon" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="email">Email cím</label>
          <div className="input-container">
            <img src={emailIcon} alt="Email Icon" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address">Szállitási cim</label>
          <div className="input-container">
            <img src={orderIcon} alt="Order Icon" />
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="submit" disabled={authLoading}>
          Profil frissítése
        </button>
        <button type="button" onClick={logout}>Kijelentkezés</button>
      </form>
    </div>
  );
};

export default UserProfile;