import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CreateIcon from "@mui/icons-material/Create";
import PaymentIcon from "@mui/icons-material/Payment";
import GradingIcon from "@mui/icons-material/Grading";
import AddressForm from "../../components/progress bar/AddressForm";
import AddressList from "../../components/progress bar/AddressList";
import OrderSummary from "../../components/progress bar/OrderSummary";
import AddPayment from "../../components/progress bar/AddPayment";
import ReviewOrder from "../../components/progress bar/ReviewOrder";
import "../../assets/sass/pages/_checkout.scss";

interface Address {
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pinCode: string;
  mobileNumber: string;
  addressType: "HOME" | "WORK" | "OTHERS";
}

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
   
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

const Checkout: React.FC = () => {
  const location = useLocation();
  
  const exchange = (location.state as { exchange?: boolean })?.exchange || false;
 
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [_subtotal, setSubtotal] = useState<number>(2675); // Initial subtotal value
  const [_total, setTotal] = useState<number>(2675);
  const [_isExchange, setIsExchange] = useState<boolean>(false);

  useEffect(() => {
    // Fetching 'exchange' from URL query params
    const params = new URLSearchParams(location.search);
    const exchangeParam = params.get("exchange") === "true";
    setIsExchange(exchangeParam);

    if (exchangeParam) {
      // If exchange offer is true, set subtotal and total to 0
      setSubtotal(0);
      setTotal(0);
    } else {
      // Otherwise, set to the original values
      setSubtotal(2675);
      setTotal(2675);
    }
  }, [location.search]);

  const addAddress = (address: Address) => {
    setAddresses([...addresses, address]);
  };

  const removeAddress = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const handleSave = (index: number, updatedAddress: Address) => {
    setAddresses((prevAddresses) => {
      const updatedAddresses = [...prevAddresses];
      updatedAddresses[index] = updatedAddress;
      return updatedAddresses;
    });
  };

  const proceedToPayment = () => {
    setCurrentStep(2);
  };

  const proceedToReview = () => {
    setCurrentStep(3);
  };

  return (
    <>
      <ProgressBar currentStep={currentStep} />
      <div className="checkout_content">
        {/* Step 1: Address */}
        {currentStep === 1 && (
          <div className="checkout_content_left">
            <AddressList
              addresses={addresses}
              onRemove={removeAddress}
              onProceed={proceedToPayment}
              onSave={handleSave}
            />
            <AddressForm addAddress={addAddress} />
          </div>
        )}
        
        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <div>
            <AddPayment onProceed={proceedToReview} />
          </div>
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && (
          <div>
            <ReviewOrder />
          </div>
        )}

        {/* Order Summary Section */}
        <div className="checkout_content_right">
          {/* Pass `isExchange` as a prop to OrderSummary */}
          <OrderSummary exchange={exchange} />
        </div>
      </div>
    </>
  );
};

export default Checkout;
