import { useContext, useState } from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/register.css";
import emailIcon from "/assets/email.svg"; 
import userIcon from "/assets/users.svg"; 
import passwordIcon from "/assets/password.svg"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { register, registerError } = useContext(AuthContext);

  // Jelszó regex: minimum 8 karakter és kell speciális karakter
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

  // Email regex: valid email formátum
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleRegister = (event) => {
    event.preventDefault();

    // Felhasználónév validálása
    if (!name) {
      setNameError("A felhasználónév kötelező.");
      return;
    } else {
      setNameError("");
    }

    // Email validálása
    if (!email) {
      setEmailError("Az email cím kötelező.");
      return;
    } else if (!emailRegex.test(email)) {
      setEmailError("Érvénytelen email cím.");
      return;
    } else {
      setEmailError("");
    }

    // Jelszó validálása
    if (!passwordRegex.test(password)) {
      setPasswordError("A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell speciális karaktert.");
      return;
    } else if (password !== passwordConfirmation) {
      setPasswordError("A jelszavak nem egyeznek meg.");
      return;
    } else {
      setPasswordError("");
    }

    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    };

    register(payload);
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <h3>Regisztráció</h3>
        
        {/* Felhasználónév */}
        <div className="nameDiv">
          <label htmlFor="name">Felhasználónév:</label>
          <div className={`input-container ${nameError ? "error" : ""}`}>
            <img src={userIcon} alt="User icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Példa János"
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
        </div>
        
        {/* Email cím */}
        <div className="emailDiv">
          <label htmlFor="email">Email cím:</label>
          <div className={`input-container ${emailError ? "error" : ""}`}>
            <img src={emailIcon} alt="Email icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="peldajani@freemail.hu"
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
        </div>
        
        {/* Jelszó */}
        <div className="passDiv">
          <label htmlFor="password">Jelszó:</label>
          <div className={`input-container ${passwordError ? "error" : ""}`}>
            <img src={passwordIcon} alt="Password icon" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="123456@"
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
        </div>

        {/* Jelszó megerősítése */}
        <div className="passConfDiv">
          <label htmlFor="password-confirmation">Jelszó mégegyszer:</label>
          <div className="input-container">
            <img src={passwordIcon} alt="Password icon" />
            <input
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type="password"
              name="password-confirmation"
              placeholder="123456@"
            />
          </div>
        </div>

        {/* Submit gomb */}
        <div className="submitDiv">
          <input type="submit" value="Regisztráció" />
        </div>
      </form>
    </div>
  );
};

export default Register;
