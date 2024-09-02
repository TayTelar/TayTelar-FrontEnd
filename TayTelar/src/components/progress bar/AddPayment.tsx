import "../../assets/sass/components/_payment.scss";
import React, { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface AddPaymentProps {
  onProceed: () => void;
}

const banksList = [
  "State Bank of India",
  "HDFC Bank",
  "ICICI Bank",
  "Axis Bank",
  "Kotak Mahindra Bank",
  "Yes Bank",
  "Bank of Baroda",
  "Punjab National Bank",
  "Union Bank of India",
];

const AddPayment: React.FC<AddPaymentProps> = ({ onProceed }) => {
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [showUpiDetails, setShowUpiDetails] = useState<boolean>(false);
  const [showNetBanking, setShowNetBanking] = useState<boolean>(false);
  const [showCashOnDelivery, setShowCashOnDelivery] = useState<boolean>(false);

  const handleDropdownClick = (paymentType: string) => {
    if (paymentType === "card") {
      setShowCardDetails((prevState) => !prevState);
      setShowUpiDetails(false);
      setShowNetBanking(false);
      setShowCashOnDelivery(false);
    } else if (paymentType === "upi") {
      setShowUpiDetails((prevState) => !prevState);
      setShowCardDetails(false);
      setShowNetBanking(false);
      setShowCashOnDelivery(false);
    } else if (paymentType === "netbanking") {
      setShowNetBanking((prevState) => !prevState);
      setShowCardDetails(false);
      setShowUpiDetails(false);
      setShowCashOnDelivery(false);
    } else if (paymentType === "cash") {
      setShowCashOnDelivery((prevState) => !prevState);
      setShowCardDetails(false);
      setShowUpiDetails(false);
      setShowNetBanking(false);
    }
  };

  return (
    <div className="add-payment">
      <p className="header">Select a payment method</p>
      <div className="section">
        <div className="payment-mode-section">
          <div className="payment-mode">
            <label>Debit Card/Credit Card</label>
            <button
              className="btn-dropdown"
              onClick={() => handleDropdownClick("card")}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
          {showCardDetails && (
            <div className="card-details">
              <div className="input-group">
                <label>Card Number</label>
                <input type="text" />
              </div>
              <div className="input-group">
                <label>Card Name</label>
                <input type="text" />
              </div>
              <div className="input-group">
                <label>Expiry Date</label>
                <input type="text" placeholder="MM/YY" />
              </div>
              <div className="input-group">
                <label>CVV</label>
                <input type="text" />
              </div>
              <button className="btn-add-card">Add Card</button>
            </div>
          )}
          <div className="payment-mode">
            <label>Net Banking</label>
            <button
              className="btn-dropdown"
              onClick={() => handleDropdownClick("netbanking")}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
          <div
            className={`netbanking-section ${showNetBanking ? "expanded" : ""}`}
          >
            {showNetBanking && (
              <div className="netbanking-dropdown">
                <ul>
                  {banksList.map((bank, index) => (
                    <li key={index}>{bank}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="payment-mode">
            <label>UPI Payment</label>
            <button
              className="btn-dropdown"
              onClick={() => handleDropdownClick("upi")}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
          {showUpiDetails && (
            <div className="upi-details">
              <div className="upi-input-container">
                <div className="input-group">
                  <label>Enter UPI ID</label>
                  <input type="text" style={{ width: "100%" }} />
                </div>
                <button className="btn-verify">Proceed</button>
              </div>
            </div>
          )}
          <div className="payment-mode">
            <label>Cash On Delivery</label>
            <button
              className="btn-dropdown"
              onClick={() => handleDropdownClick("cash")}
            >
              <ArrowDropDownIcon />
            </button>
          </div>
          {showCashOnDelivery && (
            <div className="cash-on-delivery-details">
              <p>
                Your order will be delivered to your address and you can pay
                with cash when you receive it.
              </p>
              <button className="btn-proceed">Proceed</button>
            </div>
          )}
        </div>
      </div>
      {!showCashOnDelivery && (
        <button onClick={onProceed} className="btn-continue">
          Continue
        </button>
      )}
    </div>
  );
};

export default AddPayment;
