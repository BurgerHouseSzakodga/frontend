import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/admin/kezelofelulet">Kezelőfelület</Link>
      <Link to="/admin/etelek-kezelese">Ételek kezelése</Link>
    </div>
  );
};

export default Sidebar;
