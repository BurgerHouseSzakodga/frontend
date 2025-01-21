import { useContext, useState } from "react";
import '../sass/pages/register.css' 
import { AuthContext } from "../context/contexts";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [address, setAddress]=useState("");

  const { register, registerError } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

    const payload = {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      address
    };

    register(payload);
  };

  return (
    <div className="register">
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="name">Teljes nevem:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            name="name"
          />
        </div>
        {registerError.name && <p>{registerError.name}</p>}
        <div>
          <label htmlFor="email">Email cím:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
        </div>
        {registerError.email && <p>{registerError.email}</p>}
        <div>
          <label htmlFor="password">Jelszó:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
        </div>
        {registerError.password && <p>{registerError.password}</p>}
        <div>
          <label htmlFor="password-confirmation">Jelszó mégegyszer:</label>
          <input
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            type="password"
            name="password-confirmation"
          />
        </div>
       
         <div>
          <label htmlFor="address">Szállitási cim:</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="address"
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
