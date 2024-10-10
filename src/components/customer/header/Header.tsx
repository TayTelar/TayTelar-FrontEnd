import { NavLink } from "react-router-dom";
import TopBar from "./TopBar";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "../../../assets/customer/sass/components/_header.scss";
import logo from "../../../assets/customer/images/logo.png";
import { useNavigate } from "react-router-dom";
import MenuSharpIcon from "@mui/icons-material/MenuSharp";
import ClearSharpIcon from "@mui/icons-material/ClearSharp";
import { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Popup from "../../../pages/customer/doorstep/Popup";
import { RiArrowDropDownLine } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleCartClick = () => {
    navigate("/cart");
  };
  const handleMyProfileClick = () => {
    navigate("/myProfile");
  };

  const handleDoorstepFitClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const handleOptionClick = (option: string) => {
    setDropdownOpen(false);
    toggleMenu(); 
    if (option === "Alteration") {
      navigate("/alteration");
    } else if (option === "Fit Appointment") {
      setPopupOpen(true);
    }
  };

  const toggleMenu = () => {
    const centerMenu = document.querySelector(".center");

    if (centerMenu) {
      if (menuOpen) {
        centerMenu.classList.add("closing");

        setTimeout(() => {
          setMenuOpen(false);
          centerMenu.classList.remove("open", "closing");
        }, 300);
      } else {
        setMenuOpen(true);
      }
    }
  };

  return (
    <>
      <TopBar />
      <nav>
        <div className="menu_list">
          <div className="menu_list_container">
            <div
              className={`menu_list_container_section ${
                menuOpen ? "menu-overlay" : ""
              }`}
            >
              <div className={`hamburger`} onClick={toggleMenu}>
                <MenuSharpIcon />
                <SearchIcon className="searchicon" />
              </div>
              <div className="logo_left">
                <img src={logo} alt="LOGO" />
              </div>
              <div className={`center ${menuOpen ? "open" : ""}`}>
                <ul>
                  <li>
                    <p>Menu</p>
                    <ClearSharpIcon className="x-mark" onClick={toggleMenu} />
                  </li>
                  <li>
                    <NavLink
                      to="/home"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleMenu}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/shop"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Shop
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/order"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleMenu}
                    >
                      My Orders
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contactUs"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleMenu}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to=""
                      className={`custom ${dropdownOpen ? "sparkle" : ""}`} // Add sparkle class here
                      onClick={handleDoorstepFitClick}
                    >
                      Customization{" "}
                      <RiArrowDropDownLine
                        className={`icon ${dropdownOpen ? "rotated" : ""}`}
                      />
                    </NavLink>
                    {dropdownOpen && (
                      <div className="dropdown">
                        <div onClick={() => handleOptionClick("Alteration")}>
                          Alteration at Doorstep
                        </div>
                        <div
                          onClick={() => handleOptionClick("Fit Appointment")}
                        >
                          Fit Appointment
                        </div>
                        <div>Smart Measurement Scan</div>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              <div className="list_right">
                <ul>
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <PermIdentityIcon className="icon" />
                      &nbsp; <p>Login / Register</p>
                    </NavLink>
                  </li>
                  <li>
                    <SearchIcon className="icon" />
                  </li>
                  <li>
                    <LocalMallIcon onClick={handleCartClick} className="icon" />
                  </li>
                  <li>
                    <AccountCircleIcon
                      onClick={handleMyProfileClick}
                      className="icon"
                    />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </>
  );
};

export default Header;
