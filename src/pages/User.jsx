import { useContext} from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/user.css";
import UserOrderTable from "../components/UserOrderTable";
import UserProfileEdit from "../components/UserProfileEdit";


const UserProfile = () => {
  const { logout } = useContext(AuthContext);

  

  return (
    
    <div className="user">
      <UserProfileEdit/>
      <UserOrderTable/>
      <button onClick={logout}>
        Kijelentkezés
      </button>
    </div>

  );
};
export default UserProfile;