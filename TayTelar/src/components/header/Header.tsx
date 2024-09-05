import { NavLink } from "react-router-dom";
import TopBar from "./TopBar";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "../../assets/sass/components/_header.scss";
import logo from "../../assets/images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import { useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleCartClick = () => {
    navigate("/cart");
  };

  const toggleMenu = () => {
    const centerMenu = document.querySelector('.center');
  
    if (centerMenu) {
      if (menuOpen) {
        centerMenu.classList.add('closing');
  
        setTimeout(() => {
          setMenuOpen(false);
          centerMenu.classList.remove('open', 'closing');
          document.body.style.overflow = "auto";
        }, 300);
  
      } else {
        setMenuOpen(true);
        document.body.style.overflow = "hidden";
      }
    }
  };
  
  return (
    <>
      <TopBar />
      <nav>
        <div className="menu_list" >
          <div className="menu_list_container">
            <div className={`menu_list_container_section ${menuOpen ? "menu-overlay" : ""}`}>
              <div className={`hamburger`} onClick={toggleMenu}>
                <MenuSharpIcon />
                <SearchIcon className="searchicon" />
              </div>
              <div className="logo_left">
                <img src={logo} alt="LOGO" />
              </div>
              <div className={`center ${menuOpen ? "open" : ""}`}>
                <ul>
                  <li><p>Menu</p><ClearSharpIcon className="x-mark" onClick={toggleMenu}/></li>
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
                      &nbsp; Login / Register
                    </NavLink>
                  </li>
                  <li>
                    <SearchIcon className="icon" />
                  </li>
                  <li>
                    <LocalMallIcon onClick={handleCartClick} className="icon" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
