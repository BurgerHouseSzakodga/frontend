import { useContext } from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/register.css";
import emailIcon from "/assets/email.svg";
import userIcon from "/assets/users.svg";
import passwordIcon from "/assets/password.svg";

const Register = () => {
  const { register } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();

    const payload = {
      name: event.target.name.value,
      email: event.target.email.value,
      password: event.target.password.value,
      password_confirmation: event.target.passwordConfirmation.value,
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
          <div className="input-container">
            <img src={userIcon} alt="User icon" />
            <input
              type="text"
              name="name"
              placeholder="Példa János"
            />
          </div>
        </div>

        {/* Email cím */}
        <div className="emailDiv">
          <label htmlFor="email">Email cím:</label>
          <div className="input-container">
            <img src={emailIcon} alt="Email icon" />
            <input
              type="email"
              name="email"
              placeholder="peldajani@freemail.hu"
            />
          </div>
        </div>

        {/* Jelszó */}
        <div className="passDiv">
          <label htmlFor="password">Jelszó:</label>
          <div className="input-container">
            <img src={passwordIcon} alt="Password icon" />
            <input
              type="password"
              name="password"
              placeholder="123456@"
            />
          </div>
        </div>

        {/* Jelszó megerősítése */}
        <div className="passConfDiv">
          <label htmlFor="password-confirmation">Jelszó mégegyszer:</label>
          <div className="input-container">
            <img src={passwordIcon} alt="Password icon" />
            <input
              type="password"
              name="passwordConfirmation"
              placeholder="123456@"
            />
          </div>
        </div>

        <div >
          <label htmlFor="password-confirmation">Jelszó mégegyszer:</label>
          <div className="input-container">
            <img src={passwordIcon} alt="Password icon" />
            <input
              type="password"
              name="passwordConfirmation"
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
