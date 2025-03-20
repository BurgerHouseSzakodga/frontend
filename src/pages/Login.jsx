import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/contexts";
import emailIcon from "/assets/email.svg";
import passwordIcon from "/assets/password.svg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loginError } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <h3>Bejelentekezés</h3>
        <div>
          <label htmlFor="email">Email cím:</label>
          <div>
            <img src={emailIcon} />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              name="email"
              placeholder="Írd be az email címed..."
            />
          </div>
          {loginError.email && <p>{loginError.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Jelszó:</label>
          <div>
            <img src={passwordIcon} />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              name="password"
              placeholder="Írd be a jelszavad..."
            />
          </div>
          {loginError.password && <p>{loginError.password}</p>}
        </div>
        <div>
          <Link to="/regisztracio" className="link">Nincs még fiókja?<br/> Csináljon egyet most!</Link>
          <input type="submit" value="Bejelentkezés" />
        </div>
      </form>
    </div>
  );
};

export default Login;
