import { useContext, useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { AuthContext } from "../context/contexts";
import { useNavigate } from "react-router-dom";
import "../sass/pages/user.css";

const UserProfile = () => {
  const navigate = useNavigate();
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
  const { register, registerError } = useContext(AuthContext);

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
    e.preventDefault();

    // Ellenőrizzük, hogy a két jelszó mező megegyezik-e
    if (formData.password !== formData.password_confirmation) {
      setError("A jelszavak nem egyeznek meg!");
      return;
    }

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password || undefined,
        password_confirmation: formData.password_confirmation || undefined,
        address: formData.address || undefined,
      };

      // Felhasználói adat frissítése
      register(payload);
      const response = await apiClient.put("/api/user/profile", payload);

      alert("Profil sikeresen frissítve!");
      navigate("/profile")
    } catch (error) {
      if (error.response && error.response.status === 422) {
        // Ha 422-es hiba van, jelenítsük meg a validációs hibákat
        const validationErrors = error.response.data.errors;
        setError(validationErrors.name ? validationErrors.name[0] : "");
        setError(validationErrors.email ? validationErrors.email[0] : "");
        setError(validationErrors.password ? validationErrors.password[0] : "");
        setError(validationErrors.address ? validationErrors.address[0] : "");
      } else {
        // Más típusú hibák kezelése
        setError("Hiba történt a profil frissítése közben!");
        console.error(error);
      }
    }
  };

  return (
    <div className="user">
      {authLoading && <p>Betöltés...</p>}
      <form onSubmit={handleSubmit}>
        <h3>Profil frissítése</h3>
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
        {registerError.name && <p>{registerError.name}</p>}
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
        {registerError.email && <p>{registerError.email}</p>}
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
        {registerError.address && <p>{registerError.address}</p>}
        {error && <p>{error}</p>}
        <button type="submit" disabled={authLoading}>
          Profil frissítése
        </button>
        <button onClick={logout}>Kijelentkezés</button>
      </form>

    </div>
  );
};

export default UserProfile;
