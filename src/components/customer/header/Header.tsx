import { NavLink, useLocation, useNavigate } from "react-router-dom";
import TopBar from "./TopBar";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "../../../assets/customer/sass/components/_header.scss";
import logo from "../../../assets/customer/images/logo.png";
import MenuSharpIcon from '@mui/icons-material/MenuSharp';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import AccountCircleIcon  from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
 
  const handleMyProfileClick = () => {
    navigate('/myProfile'); 
  };
  const [username, setUsername] = useState<string | null>(null); 
  const location = useLocation();

  useEffect(() => {
    const storedFirstName = location.state?.firstName || localStorage.getItem("userName");
    if (storedFirstName) {
      setUsername(storedFirstName); 
    }
  }, [location.state]);

  const toggleMenu = () => {
    const centerMenu = document.querySelector('.center');
  
    if (centerMenu) {
      if (menuOpen) {
        centerMenu.classList.add('closing');
  
        setTimeout(() => {
          setMenuOpen(false);
          centerMenu.classList.remove('open', 'closing');
        }, 300);
  
      } else {
        setMenuOpen(true);
      }
    }
  };
  const handleLoginChange = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUsername(JSON.parse(storedUser));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId"); 
    localStorage.removeItem("userName"); 
    setUsername(null);
  };
  
  useEffect(() => {
    window.addEventListener("storageChanged", handleLoginChange);
    return () => {
      window.removeEventListener("storageChanged", handleLoginChange);
    };
  }, []);

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
                {username ? (
                    <>
                      <li>
                        <NavLink to="/profile">
                          <PermIdentityIcon className="icon" />
                          &nbsp;<p>{username}</p>
                        </NavLink>
                      </li>
                      <li onClick={handleLogout} >
                        <p>Logout</p>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink to="/login">
                          <PermIdentityIcon className="icon" />
                          &nbsp;<p>Login / Register</p>
                        </NavLink>
                      </li>
                    </>
                  )}
                  <li>
                    <SearchIcon className="icon" />
                  </li>
                  <li>
                    <NavLink
                      to="/cart"
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={toggleMenu}
                    >
                    <LocalMallIcon />
                    </NavLink>
                  </li>
                  <li>
                    <AccountCircleIcon  onClick={handleMyProfileClick} className="icon" />
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
