import { Link, useLocation } from "react-router-dom";

import { Tooltip } from "@mui/material";

import dashboardIcon from "/assets/dashboard.svg";
import menuIcon from "/assets/manage-menu-items.svg";
import ordersIcon from "/assets/manage-orders.svg";
import statisticsIcon from "/assets/statistics.svg";

const Sidebar = () => {
  const location = useLocation().pathname;

  const sidebarItems = [
    {
      title: "Kezelőfelület",
      path: "/admin/kezelofelulet",
      icon: dashboardIcon,
    },
    {
      title: "Ételek kezelése",
      path: "/admin/etelek-kezelese",
      icon: menuIcon,
    },
    {
      title: "Rendelések kezelése",
      path: "/admin/rendelesek-kezelese",
      icon: ordersIcon,
    },
    {
      title: "Statisztikák",
      path: "/admin/statisztikak",
      icon: statisticsIcon,
    },
  ];

  return (
    <div className="sidebar">
      {sidebarItems.map((item, i) => (
        <Tooltip key={i} title={item.title} placement="right">
          <Link to={item.path}>
            <img
              className={location == item.path ? "selected-img" : ""}
              src={item.icon}
            />
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export default Sidebar;
