import { useState } from "react";

import locationIcon from "/assets/location.svg";
import deliveryIcon from "/assets/delivery.svg";
import cartIcon from "/assets/cart.svg";

const AddressCard = () => {
  const [address, setAddress] = useState("");
  const [isSelected, setIsSelected] = useState({
    deliver: true,
    collect: false,
  });

  const handleClickOption = (deliver) => {
    setIsSelected({ deliver, collect: !deliver });
  };

  const handleSubmitAddress = (event) => {
    event.preventDefault();
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
          Átvtel az étteremben
        </button>
      </div>
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
    </div>
  );
};

export default AddressCard;
