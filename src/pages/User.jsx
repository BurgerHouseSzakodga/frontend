import { useContext, useEffect, useState } from "react";
import { apiClient } from "../api/axios";
import { AuthContext } from "../context/contexts";
import { useNavigate } from "react-router-dom";
import "../sass/pages/user.css";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import passwordIcon from "/assets/password.svg";
import orderIcon from "/assets/orders.svg";

const UserProfile = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const { user, authLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address || '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [editableField, setEditableField] = useState(null);
  const [isPasswordChange, setIsPasswordChange] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        address: user.address || '',
        current_password: '',
        new_password: '',
        confirm_password: ''
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

  const handleInputDoubleClick = (field) => {
    setEditableField(field);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPasswordChange) {
      // Ellenőrizzük, hogy a két jelszó mező megegyezik-e
      if (formData.new_password !== formData.confirm_password) {
        setError("A jelszavak nem egyeznek meg!");
        return;
      }

      try {
        const payload = {
          current_password: formData.current_password,
          new_password: formData.new_password,
          confirm_password: formData.confirm_password,
        };

        // Jelszó módosítása
        const response = await apiClient.patch("/api/user/change-password", payload);

        setSuccessMessage("Jelszó sikeresen módosítva!");
        setError('');
        setIsPasswordChange(false); // Visszaállítás a profil módosítási nézetre
      } catch (error) {
        setError("Hiba történt a jelszó módosítása közben!");
        setSuccessMessage('');
        console.error(error);
      }
    } else {
      try {
        const payload = {
          name: formData.name,
          email: formData.email,
          address: formData.address || undefined,
        };

        // Felhasználói adat frissítése
        const response = await apiClient.patch("/api/user/profile", payload);

        setSuccessMessage("Profil sikeresen frissítve!");
        setError('');
      } catch (error) {
        setError("Hiba történt a profil frissítése közben!");
        setSuccessMessage('');
        console.error(error);
      }
    }
  };

  return (
    <div className="user">
      {authLoading && <p>Betöltés...</p>}

      <form onSubmit={handleSubmit}>
        <h2>Üdv {formData.name}! </h2>
        <h3>{isPasswordChange ? "Jelszó módosítása" : "Profil frissítése"}</h3>

        {isPasswordChange ? (
          <>
            <div>
              <label htmlFor="current_password">Jelenlegi jelszó</label>
              <div className="input-container">
                <img src={passwordIcon} alt="Password Icon" />
                <input
                  type="password"
                  id="current_password"
                  name="current_password"
                  value={formData.current_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="new_password">Új jelszó</label>
              <div className="input-container">
                <img src={passwordIcon} alt="Password Icon" />
                <input
                  type="password"
                  id="new_password"
                  name="new_password"
                  value={formData.new_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="confirm_password">Jelszó megerősítése</label>
              <div className="input-container">
                <img src={passwordIcon} alt="Password Icon" />
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="edit-buttons">
              <button
                type="button"
                className="edit"
                onClick={() => setIsPasswordChange(false)}
              >
                Vissza
              </button>
              <button className="edit" type="submit" disabled={authLoading}>
                Jelszó módosítása
              </button>
            </div>
          </>
        ) : (
          <>
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
                  onDoubleClick={() => handleInputDoubleClick('name')}
                  readOnly={editableField !== 'name'}
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
                  onDoubleClick={() => handleInputDoubleClick('email')}
                  readOnly={editableField !== 'email'}
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
                  onDoubleClick={() => handleInputDoubleClick('address')}
                  readOnly={editableField !== 'address'}
                />
              </div>
            </div>
            <div className="edit-buttons">
              <button className="edit" type="submit" disabled={authLoading}>
                Profil frissítése
              </button>
              <button
                className="edit"
                type="button"
                onClick={() => setIsPasswordChange(true)}
              >
                Jelszó módosítás
              </button>
            </div>
          </>
        )}

        {error && <p>{error}</p>}
        {successMessage && <p>{successMessage}</p>}
        <button type="button" onClick={logout}>Kijelentkezés</button>
      </form>
    </div>
  );
};

export default UserProfile;