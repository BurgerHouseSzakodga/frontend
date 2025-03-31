import { useContext } from "react";
import { AuthContext } from "../context/contexts";
import "../sass/pages/user.css";
import UserOrderTable from "../components/UserOrderTable";
import UserProfileEdit from "../components/UserProfileEdit";
import ChangePassword from "../components/ChangePassword";

const UserProfile = () => {
  const { logout } = useContext(AuthContext);
  const scroolToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="user">
      <UserProfileEdit />
      <ChangePassword />
      <UserOrderTable />
      <button className="logoutButton" onClick={logout}>
        Kijelentkezés
      </button>
      <button className="scrollButton" onClick={scroolToTop}>
        Lap tetejére
      </button>
    </div>
  );
};
export default UserProfile;
