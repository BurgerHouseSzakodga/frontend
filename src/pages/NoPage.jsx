import { Link } from "react-router-dom";
import noPageIcon from "/assets/404.svg";

const NoPage = () => {
  return (
    <div className="no-page">
      <div className="img-container">
        <img src={noPageIcon} />
      </div>
      <h2>Hoppá!</h2>
      <p>Úgy tűnik rossz helyen jársz! Térj vissza a főoldalra:</p>
      <Link to="/">Főoldal</Link>
    </div>
  );
};

export default NoPage;
