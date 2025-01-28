import { useContext} from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/user.css";
import UserOrderTable from "../components/UserOrderTable";


const UserProfile = () => {
  const { logout } = useContext(AuthContext);

  

  return (
    
    <div className="user">
      <UserOrderTable/>
      <button onClick={logout}>
        Kijelentkezés
      </button>
    </div>

  );
};
export default UserProfile;