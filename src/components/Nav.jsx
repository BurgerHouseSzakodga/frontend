import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import { AuthContext } from "../context/contexts";
import logo from "/assets/logo.png";
import locationIcon from "/assets/location.svg";
import searchIcon from "/assets/search.svg";
import accountIcon from "/assets/account.svg";
import cartIcon from "/assets/cart.svg";
import gearIcon from "/assets/gear.svg";
import { Tooltip } from "@mui/material";

const Nav = () => {
  const { user, isAdmin } = useContext(AuthContext);

  const [menuClassName, setMenuClassName] = useState("");

  const handleOpenMenu = () => {
    if (!menuClassName) {
      setMenuClassName(" open");
    } else {
      setMenuClassName("");
    }
  };

  return (
    <div className="nav">
      <Link className="nav__logo hide-on-mobile" to="/">
        <img src={logo} />
      </Link>
      {user && (
        <div className="nav__address">
          <img src={locationIcon} />
          <p>Átvétel:</p>
          <Tooltip
            title={user.address ? user.address : "Étteremben"}
            placement="bottom"
          >
            <strong className="address_name">
              {user.address ? user.address : "Étteremben"}
            </strong>
          </Tooltip>
        </div>
      )}
      <button
        onClick={handleOpenMenu}
        className={"burger-menu" + menuClassName}
      >
        <span></span>
      </button>
      <div className="nav__buttons hide-on-mobile">
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
      <div className={"nav__menu" + menuClassName}>
        <div className="button-wrapper">
          <Link
            to="/rendeles"
            className="find-food-button"
            onClick={() => setMenuClassName("")}
          >
            <img src={searchIcon} />
            <p> Felfedezés</p>
          </Link>
          {user ? (
            <>
              <Link
                to="/felhasznalo"
                className="action-button"
                onClick={() => setMenuClassName("")}
              >
                <img src={accountIcon} />
                <p> Felhasználó</p>
              </Link>
              <Link
                to="/kosar"
                className="action-button"
                onClick={() => setMenuClassName("")}
              >
                <img src={cartIcon} />
                <p> Kosár</p>
              </Link>
              {isAdmin && (
                <Link
                  to="/admin/kezelofelulet"
                  className="action-button"
                  onClick={() => setMenuClassName("")}
                >
                  <img src={gearIcon} />
                  <p> Kezelőfelület</p>
                </Link>
              )}
            </>
          ) : (
            <Link
              to="/bejelentkezes"
              className="action-button"
              onClick={() => setMenuClassName("")}
            >
              <img src={accountIcon} />
              <p>Bejelentkezés</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
