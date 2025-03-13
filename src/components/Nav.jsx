import { Link } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/contexts";
import logo from "/assets/logo.png";
import locationIcon from "/assets/location.svg";
import searchIcon from "/assets/search.svg";
import accountIcon from "/assets/account.svg";
import cartIcon from "/assets/cart.svg";
import gearIcon from "/assets/gear.svg";
import "../sass/components/nav.css";

const Nav = () => {
  const { user, isAdmin } = useContext(AuthContext);


  return (
    <div className="nav">
      <Link className="nav__logo" to="/">
        <img src={logo} />
      </Link>
      <div className="nav__address">
        <img src={locationIcon} />
        <p>Kiszállítás ide:</p>
        <strong className="address_name">{user ? user.address : "2040, Budaörs, Lévai utca 29."}</strong>
      </div>
      <div className="nav__buttons">
        <Link to="/rendeles" className="find-food-button">
          <img src={searchIcon} />
          <p> Felfedezés</p>
        </Link>
        {user ? (
          <>
            <Link to="/felhasznalo" className="action-button">
              <img src={accountIcon} />
            </Link>
            <Link to="/kosar" className="action-button">
              <img src={cartIcon} />
            </Link>
            {isAdmin && (
              <Link to="/admin/kezelofelulet" className="action-button">
                <img src={gearIcon} />
              </Link>
            )}
          </>
        ) : (
          <Link to="/bejelentkezes" className="action-button">
            <img src={accountIcon} />
            <p>Bejelentkezés</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Nav;
