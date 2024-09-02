import { NavLink } from "react-router-dom";
import TopBar from "./TopBar";
import SearchIcon from "@mui/icons-material/Search";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import "../../assets/sass/components/_header.scss";
import logo from "../../assets/images/logo.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate("/cart");
  };

  return (
    <>
      <TopBar />
      <nav>
        <div className="menu_list">
          <div className="menu_list_container">
            <div className="menu_list_container_section">
              <div className="logo_left">
                <img src={logo} alt="LOGO" />
              </div>
              <div className="center">
                <ul>
                  <li>
                    <NavLink
                      to="/home"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/shop"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Shop <ExpandMoreIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/aboutUs"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Collections <ExpandMoreIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/blogs"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Blogs <ExpandMoreIcon />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contactUs"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </div>
              <div className="list_right">
                <ul>
                  {" "}
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      <PermIdentityIcon />
                      &nbsp; Login / Register
                    </NavLink>
                  </li>
                  <li>
                    <SearchIcon />
                  </li>
                  <li>
                    <LocalMallIcon onClick={handleCartClick} />
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
