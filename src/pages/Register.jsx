import { useContext, useState } from "react";

import { AuthContext } from "../context/contexts";

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
        <div>
          <label htmlFor="name">Felhasználónév:</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            name="name"
          />
          {registerError.name && <p>{registerError.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email cím:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
          />
          {registerError.email && <p>{registerError.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Jelszó:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
          />
          {registerError.password && <p>{registerError.password}</p>}
        </div>
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
          <input type="submit" value="Regisztráció" />
        </div>
      </form>
    </div>
  );
};

export default Register;
