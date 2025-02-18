import { useContext, useState } from "react";
import '../sass/pages/register.css';
import { AuthContext } from "../context/contexts";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import passwordIcon from "/assets/password.svg";
import orderIcon from "/assets/orders.svg";
import '../sass/pages/register.css'; 
import { Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress] = useState({zip: "", city:"",  street: "",num: ""});

  const { register, registerError } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      address: address.zip + ", " +address.city+","+ address.street +" utca" +"," + address.num,
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
          <label htmlFor="address">Irányitó szám:</label>
          <img src={orderIcon} />
          <input
            value={address.zip}
            onChange={(e) => setAddress((prevAddress) => ({...prevAddress, zip: e.target.value}))}
            type="text"
            name="address"
            placeholder="1119"
          />
        </div>
        {registerError.address && <p>{registerError.address}</p>}
        <div className="input-container">
          <label htmlFor="address">Település:</label>
          <img src={orderIcon} />
          <input
            value={address.city}
            onChange={(e) => setAddress((prevAddress) => ({...prevAddress, city: e.target.value}))}
            type="text"
            name="address"
            placeholder="Budapest"
          />
        </div>

        <div className="input-container">
          <label htmlFor="address">Utca:</label>
          <img src={orderIcon} />
          <input
            value={address.street}
            onChange={(e) => setAddress((prevAddress) => ({...prevAddress, street: e.target.value}))}
            type="text"
            name="address"
            placeholder="Rátz László"
          />
        </div>

        <div className="input-container">
          <label htmlFor="address">Ház szám:</label>
          <img src={orderIcon} />
          <input
            value={address.num}
            onChange={(e) => setAddress((prevAddress) => ({...prevAddress, num: e.target.value}))}
            type="text"
            name="address"
            placeholder="3"
          />
        </div>
        {registerError.address && <p>{registerError.address}</p>}
       
        <div>
        <Link to="/bejelentkezes">Bejelentkezés</Link>
          <input type="submit" value="Regisztráció" />
        </div>
      </form>
    </div>
  );
};

export default Register;
