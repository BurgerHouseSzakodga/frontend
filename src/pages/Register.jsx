import { useContext, useState } from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/register.css";
import emailIcon from "/assets/email.svg"; // A helyes útvonalra állítsd be
import userIcon from "/assets/users.svg"; 
import passwordIcon from "/assets/password.svg"; 

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const { register, registerError } = useContext(AuthContext);

  // Jelszó validáció
  const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/; // Minimum 8 karakter, és tartalmaz egy speciális karaktert

  const handleRegister = (event) => {
    event.preventDefault();

    // Ha a jelszó nem felel meg a regexnek, ne engedjük a regisztrációt
    if (!passwordRegex.test(password)) {
      setPasswordError("A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell speciális karaktert.");
      return;
    }

    if (password !== passwordConfirmation) {
      setPasswordError("A jelszavak nem egyeznek meg.");
      return;
    }

    setPasswordError(""); // Töröljük a hibát, ha minden rendben

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
        <div className="nameDiv">
          <label htmlFor="name">Felhasználónév:</label>
          <div className="input-container">
            <img src={userIcon} alt="User icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
              placeholder="Példa János"
            />
          </div>
          {registerError?.name && <p>{registerError.name}</p>}
        </div>
        <div className="emailDiv">
          <label htmlFor="email">Email cím:</label>
          <div className="input-container">
            <img src={emailIcon} alt="Email icon" />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              name="email"
              placeholder="peldajani@freemail.hu"
            />
          </div>
          {registerError?.email && <p>{registerError.email}</p>}
        </div>
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
          {registerError?.password && <p>{registerError.password}</p>}
        </div>
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
        <div className="submitDiv">
          <input type="submit" value="Regisztráció" />
        </div>
      </form>
    </div>
  );
};

export default Register;
