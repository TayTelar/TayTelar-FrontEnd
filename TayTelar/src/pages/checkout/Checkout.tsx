import "../../assets/sass/pages/_checkout.scss";
import CreateIcon from "@mui/icons-material/Create";
import PaymentIcon from "@mui/icons-material/Payment";
import GradingIcon from "@mui/icons-material/Grading";
import { useState } from "react";
import AddressForm from "../../components/progress bar/AddressForm";
import AddressList from "../../components/progress bar/AddressList";
import OrderSummary from "../../components/progress bar/OrderSummary";
import AddPayment from "../../components/progress bar/AddPayment";
import ReviewOrder from "../../components/progress bar/ReviewOrder";

const ProgressBar = ({ currentStep }) => {
  const stepIcons = [
    <CreateIcon key="address" />,
    <PaymentIcon key="payment" />,
    <GradingIcon key="review" />,
  ];

  const steps = ["Add Address", "Payment", "Review"];

  return (
    <div>
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${
              currentStep === index ? "active" : ""
            } ${currentStep > index ? "completed" : ""}`}
          >
            <div className="step-icon">{stepIcons[index]}</div>
            <p className="step-label">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  // Add new address
  const addAddress = (address) => {
    setAddresses([...addresses, address]);
  };

  // Remove an address by index
  const removeAddress = (index) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  // Update an existing address
  const handleSave = (index, updatedAddress) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[index] = updatedAddress;
      return updatedAddresses;
    });
  };

  // Proceed to payment step
  const proceedToPayment = () => {
    setCurrentStep(2);
  };

  // Proceed to review step
  const proceedToReview = () => {
    setCurrentStep(3);
  };

  return (
    <>
      <ProgressBar currentStep={currentStep} />
      <div className="checkout_content">
        {currentStep === 1 && (
          <div className="checkout_content_left">
            <AddressList
              addresses={addresses}
              onRemove={removeAddress}
              onProceed={proceedToPayment}
              onSave={handleSave} // Pass onSave here
            />
            <AddressForm addAddress={addAddress} />
          </div>
        )}
        {currentStep === 2 && (
          <div className="checkout_content_right">
            <AddPayment onProceed={proceedToReview} />
          </div>
        )}
        {currentStep === 3 && (
          <div className="checkout_content_right">
            <ReviewOrder />
          </div>
        )}
        <div className="checkout_content_right">
          <OrderSummary />
        </div>
      </div>
    </>
  );
};

export default Checkout;
