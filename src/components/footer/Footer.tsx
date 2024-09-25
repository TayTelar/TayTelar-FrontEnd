import React from 'react';
import logo from "../../assets/images/logo_white.png";
import "../../assets/sass/components/_footer.scss";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import HeadsetMicOutlinedIcon from "@mui/icons-material/HeadsetMicOutlined";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer_container">
        <div className="footer_container_section">
          <div className="footer_section1">
            <div className="image_section">
              <img src={logo} alt="LOGO" />
            </div>
            <div className="social_section">
              <i className="fa-brands fa-facebook fa-lg"></i>
              <i className="fa-brands fa-linkedin fa-lg"></i>
              <i className="fa-brands fa-x-twitter fa-lg"></i>
              <i className="fa-brands fa-instagram fa-lg"></i>
              <i className="fa-brands fa-youtube fa-lg"></i>
            </div>
          </div>
          <div className="footer_section2">
            <h4>Information Company</h4>
            <div className="links">
              <ul>
                <li>Our Services</li>
                <li>Industry Solutions</li>
                <li>Investor Relation</li>
                <li>Payment Methods</li>
                <li>Shipping Guide</li>
                <li>Get A Quote</li>
                <li>Contact</li>
              </ul>
            </div>
          </div>
          <div className="footer_section3">
            <h4>More From Rubix</h4>
            <ul>
              <li>Case Study</li>
              <li>Seeking For Career</li>
              <li>Our Clients</li>
              <li>FAQ</li>
              <li>Media Relation</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
            </ul>
          </div>
          <div className="footer_section4">
            <h4>Contact Info</h4>
            <p>
              <HeadsetMicOutlinedIcon />
              &nbsp;&nbsp;(+91) 9008761528
              <br /> &nbsp;&nbsp; support@taytelar.com
            </p>
            <h4>Find Us</h4>
            <p>
              <LocationOnOutlinedIcon /> &nbsp;&nbsp;Box 3233 <br />{" "}
              &nbsp;&nbsp;1810 Kings Way King Street,
              <br /> &nbsp;&nbsp;5th Avenue, New York
            </p>
          </div>
        </div>
      </div>
      <div className="footer_bottom">
        <div className="footer_bottom_container">
          <div className="footer_bottom_left">
            <span>Ⓒ 2024 RUBIX</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
