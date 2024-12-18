import { useContext } from "react";

import { AuthContext } from "../context/contexts";

const User = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <button onClick={logout}>Kijelentkezés</button>
    </div>
  );
};

export default User;
