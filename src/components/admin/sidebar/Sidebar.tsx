import { NavLink } from "react-router-dom";
import "../../../assets/admin/scss/_sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { FaCogs, FaBoxOpen, FaSignOutAlt, FaList } from "react-icons/fa";
import { IoMdPeople } from "react-icons/io";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3>LOGO</h3>
      <nav>
        <ul>
          <li>
            <NavLink to="/admin/admin-dashboard">
              <MdDashboard /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/management">
              <FaList /> Product Management
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/management">
              <IoMdPeople /> Customers
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/view-orders">
              <FaBoxOpen /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings">
              <FaCogs /> Site Settings
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/logout">
              <FaSignOutAlt /> Logout
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
