import { useContext, useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import { AuthContext } from "../context/contexts";


const User = () => {
  const { logout } = useContext(AuthContext);
  const { user, getUser, authLoading } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  //Itt töltöm be a felhsz. adatait, amikor a komp be tötlödik akkor ha még nincs betöltve
  useEffect(() => {
    if (!user && !authLoading) {
      getUser();
    }
  }, [getUser, user, authLoading]);

//beálitom a formon a felhasználó adatait
  useEffect(() => {
    console.log(user);
   
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "********",
        address: user.address || "",
      });
    }
  }, [user]); 

  //fügvény ha a felhsz uj adatott vissz be
  const handleInputChange=(e)=>{
    const{name, value}=e.target;
    setFormData({...formData, [name]: value});
  }

  //ha kész az adatok elküldjük a backendre ezzel a fvg-vel
  const saveChanges=(e)=>{
    console.log(formData);
    e.preventDefault();
    const payload={
      name: formData.name,
      email: formData.email,
      password: formData.password,
      address: formData.address||undefined, //ha jelszot nem modositunk nem küldöm el
    }

    try{
      //itt kellene a backendnek elküldeni a módosított adatokat
      console.log("Módosítások elküldve", payload);
    }
    catch(error){
      console.error("Nem sikerült a módosítás", error);
    }
  }

  if (authLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Adataim</h3>
      <form onSubmit={saveChanges}>
        <button onClick={logout}>Módostiás</button>
        <div>
          <label htmlFor="name">Teljes nevem :</label>
          <div>
            <input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="name">E-mail cim :</label>
          <div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="password">Jelszó:</label>
          <div>
            <img alt="Jelszó ikon" />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Jelszó"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="address">Szállitási cim:</label>
          <input
            type="text"
            id=""
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>

      </form>

      <button onClick={logout}>Mentés</button>
    </div>
  );
};

export default User;
