import AddressCard from "./AddressCard";

const Header = () => {
  return (
    <div className="header">
      <div className="header__title">
        <h1>Éhes vagy?</h1>
        <p>Pár kattintás és élvezheted kedvenc hamburgered.</p>
      </div>
      <AddressCard />
    </div>
  );
};

export default Header;
