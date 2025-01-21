import { useContext, useEffect, useState } from "react";
import { apiClient } from "../api/axios"; // Az axios konfiguráció importálása
import { AuthContext } from "../context/contexts";
import { logoutUser } from "../api/http";

const UserProfile = () => {
  const { logout } = useContext(AuthContext);
  const { user, authLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
    password_confirmation: '',
    address: user?.address || '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '*******',
        password_confirmation: '******',
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
    e.preventDefault(); // Megakadályozza az alapértelmezett form beküldést

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
        password_confirmation: formData.password_confirmation || undefined,
        address: formData.address || undefined,
      };

      const response = await apiClient.put("/api/user/profile", payload);

      alert("Profil sikeresen frissítve!");
    } catch (error) {
      setError("Hiba történt a profil frissítése közben!");
      console.error(error);
    }
  };

  return (
    <div>
      <h3>Profil frissítése</h3>
      {authLoading && <p>Betöltés...</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Név</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email cím</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Új jelszó</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password_confirmation">Jelszó megerősítése</label>
          <input
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            value={formData.password_confirmation}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="address">Szállitási cim</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={authLoading}>
          Profil frissítése
        </button>
      </form>
      <button onClick={logout}>Kijelentkezés</button>
    </div>
  );
};

export default UserProfile;