import { useContext, useState } from "react";

import { AuthContext } from "../context/contexts";
import locationIcon from "/assets/location.svg";
import deliveryIcon from "/assets/delivery.svg";
import cartIcon from "/assets/cart.svg";
import { updateAddress } from "../api/http";

const AddressCard = () => {
  const { user, setUser } = useContext(AuthContext);

  const [address, setAddress] = useState("");
  const [isSelected, setIsSelected] = useState({
    deliver: true,
    collect: false,
  });

  const handleClickOption = async (deliver) => {
    setIsSelected({ deliver, collect: !deliver });

    if (!deliver) {
      try {
        await updateAddress(null);
        setUser((prevUser) => ({ ...prevUser, address: null }));
      } catch (error) {
        console.error(error);
        setUser(user);
      }
    }
  };

  const handleSubmitAddress = async (event) => {
    event.preventDefault();

    try {
      await updateAddress(address);
      setUser((prevUser) => ({ ...prevUser, address: address }));
    } catch (error) {
      console.error(error);
      setUser(user);
    }

    setAddress("");
  };

  return (
    <div className="address-card">
      <div className="collect-options">
        <button
          onClick={() => handleClickOption(true)}
          className={
            "collect-options__button" + (isSelected.deliver ? "--active" : "")
          }
        >
          <img src={deliveryIcon} />
          Házhozszállítás
        </button>
        <button
          onClick={() => handleClickOption(false)}
          className={
            "collect-options__button" + (isSelected.collect ? "--active" : "")
          }
        >
          <img src={cartIcon} />
          Átvétel az étteremben
        </button>
      </div>
      {isSelected.deliver && (
        <form className="address-form" onSubmit={handleSubmitAddress}>
          <img src={locationIcon} />
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Írd be a címedet!"
          />
          <button type="submit">Cím megerősítése</button>
        </form>
      )}
    </div>
  );
};

export default AddressCard;
