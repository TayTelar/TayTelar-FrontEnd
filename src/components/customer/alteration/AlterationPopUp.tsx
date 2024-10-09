import { useNavigate } from "react-router-dom";
import logo from "../../../assets/customer/images/logo.png";
import "../../../assets/customer/sass/components/_confirmation.scss";

interface PopupProps {
  date: string;
  slot: string;
  onClose: () => void;
}
const AlterationPopUp: React.FC<PopupProps> = ({ date, slot, onClose }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/home");
  };

  return (
    <div className="overlay">
      <div className="content">
        <div className="logo__container">
          <img src={logo} alt="LOGO"></img>
        </div>
        <p className="text">Thank You !</p>
        <p className="second__text">Your Appointment is Confirmed</p>
        <p className="third__text">
          Our team will arrive at your home on {date} at {slot} for your fitting
          appointment. Reach out to our customer support in Home Page for any
          inquiries.
        </p>
        <button onClick={handleClose} className="close-button ">
          Go To Home
        </button>
      </div>
    </div>
  );
};

export default AlterationPopUp;
