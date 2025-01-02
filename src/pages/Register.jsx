import { useContext, useState } from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/register.css";
import emailIcon from "/assets/email.svg"; // A helyes útvonalra állítsd be

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { register, registerError } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

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
        <h3>Registráció</h3>
        <div className="nameDiv">
          <label htmlFor="name">Felhasználónév:</label>
          <div className="input-container">
            <img src={emailIcon} alt="Email icon" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              name="name"
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
            />
          </div>
          {registerError?.email && <p>{registerError.email}</p>}
        </div>
        <div className="passDiv">
          <label htmlFor="password">Jelszó:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          {registerError?.password && <p>{registerError.password}</p>}
        </div>
        <div className="passConfDiv">
          <label htmlFor="password-confirmation">Jelszó mégegyszer:</label>
          <input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            name="password-confirmation"
          />
        </div>
        <div className="submitDiv">
          <input type="submit" value="Regisztráció" />
        </div>
      </form>
    </div>
  );
};

export default Register;
