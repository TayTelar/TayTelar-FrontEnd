import React, { useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import PaymentIcon from "@mui/icons-material/Payment";
import GradingIcon from "@mui/icons-material/Grading";
import AddPayment from "../../components/progress bar/AddPayment";
import ReviewOrder from "../../components/progress bar/ReviewOrder";
import "../../assets/sass/pages/_checkout.scss";
import OrderDetails from "../../components/progress bar/OrderDetails";
import { useLocation } from "react-router-dom";

interface ProgressBarProps {
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const stepIcons = [
    <CreateIcon key="address" />,
    <PaymentIcon key="payment" />,
    <GradingIcon key="review" />,
  ];

  const steps = ["Checkout", "Payment", "Review"];

  return (
    <div>
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${currentStep === index ? "active" : ""
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
  const { selectedProducts, pricingDetails } = location.state || { selectedProducts: [] };
  const [currentStep, setCurrentStep] = useState<number>(1);

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
        {currentStep === 1 && (
          <div className="checkout_content_left">
            <OrderDetails products={selectedProducts} pricingDetails={pricingDetails} />
          </div>
        )}
        {currentStep === 2 && (
          <div>
            <AddPayment onProceed={proceedToReview} />
          </div>
        )}
        {currentStep === 3 && (
          <div>
            <ReviewOrder />
          </div>
        )}
      </div>
    </>
  );
};
export default Checkout;
