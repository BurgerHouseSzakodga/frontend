import { Link, useLocation } from "react-router-dom";

import dashboardIcon from "/assets/dashboard.svg";
import menuIcon from "/assets/manage-menu-items.svg";
import ordersIcon from "/assets/manage-orders.svg";
import { Tooltip } from "@mui/material";

const Sidebar = () => {
  const location = useLocation().pathname;

  return (
    <div className="sidebar">
      <Tooltip title="Kezelőfelület" placement="right-start" arrow>
        <Link to="/admin/kezelofelulet">
          <img
            className={location == "/admin/kezelofelulet" ? "selected-img" : ""}
            src={dashboardIcon}
          />
        </Link>
      </Tooltip>
      <Tooltip title="Ételek kezelése" placement="right-start" arrow>
        <Link to="/admin/etelek-kezelese">
          <img
            className={
              location == "/admin/etelek-kezelese" ? "selected-img" : ""
            }
            src={menuIcon}
          />
        </Link>
      </Tooltip>
      <Tooltip title="Rendelések kezelése" placement="right-start" arrow>
        <Link to="/admin/rendelesek-kezelese">
          <img
            className={
              location == "/admin/rendelesek-kezelese" ? "selected-img" : ""
            }
            src={ordersIcon}
          />
        </Link>
      </Tooltip>
    </div>
  );
};

export default Sidebar;
