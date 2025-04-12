import { useState, useContext } from "react";
import { AuthContext } from "../context/contexts";
import "../sass/components/change-password.css";

function ChangePassword() {
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const { patchPassword, updatePasswordMessage } = useContext(AuthContext);

  const handleChange = (e) => {
    const spassword = { ...passwords };
    spassword[e.target.name] = e.target.value;
    setPasswords(spassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await patchPassword(passwords);

      setPasswords({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (error) {
      if (error.response?.status === 422) {
        console.error("Validációs hibák:", error.response.data.errors);
      } else {
        console.error("Hiba történt a jelszó módosítása során:", error);
      }
    }
  };

  return (
    <div className="change-password">
      <form onSubmit={handleSubmit}>
        <h3>Jelszó módosítása</h3>
        {/* Sikeres üzenet megjelenítése */}
        {updatePasswordMessage?.success && (
          <div className="alert success">{updatePasswordMessage.success}</div>
        )}
        {/* Hibák megjelenítése */}
        {updatePasswordMessage?.current_password && (
          <p className="message">{updatePasswordMessage.current_password}</p>
        )}
        <div className="password_group">
          <label htmlFor="current_password">Jelenlegi jelszó:</label>
          <input
            type="password"
            id="current_password"
            name="current_password"
            placeholder="Jelenlegi jelszó"
            value={passwords.current_password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="new_password">Új jelszó:</label>
          <input
            type="password"
            id="new_password"
            name="new_password"
            placeholder="Új jelszó"
            value={passwords.new_password}
            onChange={handleChange}
            required
          />
          {updatePasswordMessage?.new_password && (
            <p className="message">{updatePasswordMessage.new_password}</p>
          )}
        </div>

        <div>
          <label htmlFor="new_password_confirmation">
            Új jelszó megerősítése:
          </label>
          <input
            type="password"
            id="new_password_confirmation"
            name="new_password_confirmation"
            placeholder="Új jelszó megerősítése"
            value={passwords.new_password_confirmation}
            onChange={handleChange}
            required
          />
          {updatePasswordMessage?.new_password_confirmation && (
            <p className="message">
              {updatePasswordMessage.new_password_confirmation}
            </p>
          )}
        </div>
        <button type="submit">Módosítás</button>
      </form>
    </div>
  );
}

export default ChangePassword;
