import { useContext, useState } from "react";

import { AuthContext } from "../context/contexts";
import "../sass/pages/regiter.scss";
import emailIcon from "../assets/email.svg";
import passwordIcon from "../assets/password.svg";




const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const { register } = useContext(AuthContext);

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
        <div className="nameDiv">
          <label htmlFor="name">Felhasználónév:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            name="name"
          />
        </div>
        <div className="emailDiv">
          <label htmlFor="email">Email cím:</label>
          <img src={emailIcon} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
        </div>
        <div className="passDiv">
          <label htmlFor="password">Jelszó:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
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
