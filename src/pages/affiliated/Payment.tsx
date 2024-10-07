import "../../assets/affiliated/sass/payment/_payment.scss";
import React, { useState, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

interface AddPaymentProps {
  onProceed?: () => void;
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

const Payment: React.FC<AddPaymentProps> = ({ onProceed }) => {
  const [showCardDetails, setShowCardDetails] = useState<boolean>(false);
  const [showUpiDetails, setShowUpiDetails] = useState<boolean>(false);
  const [showNetBanking, setShowNetBanking] = useState<boolean>(false);
  const [showCashOnDelivery, setShowCashOnDelivery] = useState<boolean>(false);
  const [addedCards, setAddedCards] = useState<
    Array<{ cardName: string; last4: string }>
  >([]);
  const [form, setForm] = useState<{
    cardNumber: string;
    cardName: string;
    expiryDate: string;
    cvv: string;
  }>({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    const savedCards = localStorage.getItem("cards");
    if (savedCards) {
      setAddedCards(JSON.parse(savedCards));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(addedCards));
  }, [addedCards]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleAddCard = () => {
    const { cardNumber, cardName, expiryDate, cvv } = form;
    if (cardNumber && cardName && expiryDate && cvv) {
      setAddedCards((prevCards) => [
        ...prevCards,
        {
          cardName,
          last4: cardNumber.slice(-4),
        },
      ]);
      // Reset form fields
      setForm({
        cardNumber: "",
        cardName: "",
        expiryDate: "",
        cvv: "",
      });
    }
  };

  const handleRemoveCard = (index: number) => {
    setAddedCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  return (
    <div className="add-payment">
      <AddedCards cards={addedCards} onRemoveCard={handleRemoveCard} />
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
                <input
                  type="text"
                  name="cardNumber"
                  value={form.cardNumber}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Card Name</label>
                <input
                  type="text"
                  name="cardName"
                  value={form.cardName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={form.expiryDate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn-add-card" onClick={handleAddCard}>
                Add Card
              </button>
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
                  <input type="text" />
                </div>
                <button className="btn-verify">Proceed</button>
              </div>
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

export default Payment;

interface AddedCardsProps {
  cards: Array<{ cardName: string; last4: string }>;
  onRemoveCard: (index: number) => void;
}

const AddedCards: React.FC<AddedCardsProps> = ({ cards, onRemoveCard }) => {
  return (
    <div className="added-cards">
      <p className="header">Your Saved Cards</p>
      {cards.length > 0 ? (
        <div className="cards-list">
          {cards.map((card, index) => (
            <div key={index} className="card-item">
              <p>{card.cardName}</p>
              <p>**** **** **** {card.last4}</p>
              <div className="actionbuttons">
                <button className="btn-proceed">Proceed</button>
                <button
                  className="btn-remove"
                  onClick={() => onRemoveCard(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No cards added</p>
      )}
    </div>
  );
};
