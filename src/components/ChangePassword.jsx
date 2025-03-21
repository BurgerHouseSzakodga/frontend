import { useState, useContext } from 'react';
import { AuthContext } from '../context/contexts';
import passwordIcon from "/assets/password.svg";
import '../sass/components/change-password.css';

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });

  
  // Használjuk a patchPassword függvényt és az updatePasswordError-t az AuthContext-ből
  const { patchPassword, updatePasswordError } = useContext(AuthContext);

  const handleChange = (e) => {
    console.log("Changed field:", e.target.name, "New value:", e.target.value);
    const spassword = { ...passwords };
    spassword[e.target.name] = e.target.value;
    setPasswords(spassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = await patchPassword(passwords);
      console.log("Jelszó módosítása sikeres:", updatedData);
      setPasswords({
        current_password: '***********',
        new_password: '***********',
        new_password_confirmation: '***********'
      });
    } catch (error) {
      console.error("Hiba történt a jelszó módosítása során:", error);
      // Feltételezzük, hogy az updatePasswordError tömb lehet, ezért összefűzzük a hibaüzeneteket
    }
  };

  return (
    <div className="change-password">
      <form onSubmit={handleSubmit}>
        <h3>Jelszó módosítása</h3>
        {/* Sikeres üzenet megjelenítése */}
        {updatePasswordError?.success && (
          <div className="alert success">{updatePasswordError.success}</div>
        )}
        {/* Hibák megjelenítése */}
        {updatePasswordError?.current_password && (
          <p className="error">{updatePasswordError.current_password}</p>
        )}
        <div className="password_group">
          <label htmlFor="current_password">Jelenlegi jelszó:</label>
          <img src={passwordIcon} alt="Password icon" />
          <input
            type="password"
            id="current_password"
            name="current_password"
            value={passwords.current_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="new_password">Új jelszó:</label>
          <img src={passwordIcon} alt="Password icon" />
          <input
            type="password"
            id="new_password"
            name="new_password"
            value={passwords.new_password}
            onChange={handleChange}
            required
          />
          {updatePasswordError?.new_password && (
            <p className="error">{updatePasswordError.new_password}</p>
          )}
        </div>

        <div>
          <label htmlFor="new_password_confirmation">Új jelszó megerősítése:</label>
          <img src={passwordIcon} alt="Password icon" />
          <input
            type="password"
            id="new_password_confirmation"
            name="new_password_confirmation"
            value={passwords.new_password_confirmation}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Módosítás</button>
      </form>
    </div>
  );
}

export default ChangePassword;
