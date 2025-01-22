import { useContext, useState } from "react";
import '../sass/pages/register.css';
import { AuthContext } from "../context/contexts";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import passwordIcon from "/assets/password.svg";
import orderIcon from "/assets/orders.svg";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress] = useState("");

  const { register, registerError } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      address,
    };

    register(payload);
  };

  return (
    <div className="register">

      <form onSubmit={handleRegister}>
        <h1>Regisztráció</h1>
        <div className="input-container">
          <label htmlFor="name">Teljes nevem:</label>
          <img src={userIcon} />
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="name"
            placeholder="Add meg a teljes neved"
          />
        </div>
        {registerError.name && <p>{registerError.name}</p>}

        <div className="input-container">
          <label htmlFor="email">Email cím:</label>
          <img src={emailIcon} />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            placeholder="Email cím"
          />
        </div>
        {registerError.email && <p>{registerError.email}</p>}

        <div className="input-container">
          <label htmlFor="password">Jelszó:</label>
          <img src={passwordIcon} />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            placeholder="Add meg a jelszavad"
          />
        </div>
        {registerError.password && <p>{registerError.password}</p>}

        <div className="input-container">
          <label htmlFor="password-confirmation">Jelszó mégegyszer:</label>
          <img src={passwordIcon} />
          <input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            name="password-confirmation"
            placeholder="Add meg újra a jelszavad"
          />
        </div>

        <div className="input-container">
          <label htmlFor="address">Szállítási cím:</label>
          <img src={orderIcon} />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="address"
            placeholder="Szállítási cím"
          />
        </div>
        {registerError.address && <p>{registerError.address}</p>}

        <div>
          <input type="submit" value="Regisztráció" />
        </div>
      </form>
    </div>
  );
};

export default Register;
