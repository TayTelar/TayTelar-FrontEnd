import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiLocation } from "react-icons/ti";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import "../../../assets/customer/sass/pages/_popup.scss";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const eligiblePincodes = ["123456", "654321"];

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const [pincode, setPincode] = useState("");
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const handleVerify = () => {
    if (eligiblePincodes.includes(pincode)) {
      navigate("/fit");
      setPincode("");
      onClose();
    } else {
      setIsError(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      {isError ? (
        <div className="error-content">
          <div className="error-popup">
            <AiOutlineExclamationCircle className="error-icon" />
            <p className="error-header">We're Sorry!</p>
            <p className="error-text">
              This feature is not available in your location. However, you can
              still shop for pants directly from our shop page. Thank you for
              your understanding!
            </p>
            <div className="actionbutton">
              <button
                className="go-to-shop-button"
                onClick={() => {
                  onClose();
                  navigate("/shop");
                }}
              >
                Go To Shop
              </button>
              <button
                onClick={() => {
                  setIsError(false);
                }}
                className="edit-pincode-button"
              >
                Edit Pincode
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="popup-content">
          <TiLocation className="icon" />
          <p className="header">Check Service Availability</p>
          <input
            type="text"
            placeholder="Enter your Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
          <div className="actionbuttons">
            <button className="verify-button" onClick={handleVerify}>
              Verify
            </button>
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
