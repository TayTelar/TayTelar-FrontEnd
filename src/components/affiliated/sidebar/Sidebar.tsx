import React, { useState } from "react";
import "../../../assets/affiliated/sass/sidebar/_sidebar.scss";
import { MdDashboard } from "react-icons/md";
import { CiBoxList } from "react-icons/ci";
import { MdPayment } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { CgLogOut } from "react-icons/cg";
import { IoIosMenu } from "react-icons/io";
import { BiSupport } from "react-icons/bi";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <aside className={`sidebar ${!isOpen ? "sidebar-closed" : ""}`}>
        <div className="logo">
          <span className="logo-text">LOGO</span>
          <IoIosMenu className="menu-toggle" onClick={toggleSidebar} />
        </div>
        {isOpen && (
          <>
            <input
              type="text"
              placeholder="Search"
              className="sidebar-search"
            />
            <nav>
              <ul>
                <li>
                  <a href="dashboard">
                    <MdDashboard className="icon" />
                    Dashboard
                  </a>
                </li>
                <li>
                  <a href="products">
                    <CiBoxList className="icon" />
                    Products
                  </a>
                </li>
                <li>
                  <a href="payment">
                    <MdPayment className="icon" />
                    Payment
                  </a>
                </li>
                <li>
                  <a href="profile">
                    <CgProfile className="icon" />
                    Profile
                  </a>
                </li>
                <li>
                  <a href="support">
                    <BiSupport className="icon" />
                    Support
                  </a>
                </li>
                <li>
                  <a href="/login/affiliate" className="logout-button">
                    <CgLogOut className="icon" />
                    Logout
                  </a>
                </li>
              </ul>
            </nav>
          </>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
