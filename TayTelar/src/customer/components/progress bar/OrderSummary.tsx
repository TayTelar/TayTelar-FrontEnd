import React, { useState, useEffect } from "react";
import "../../assets/sass/components/_loyalty.scss";

interface OrderSummaryProps {
  exchange: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ exchange }) => {
  const initialSubTotal = 2675; // Initial subtotal without exchange
  const totalLoyaltyPoints = 1000; // Example total loyalty points
  const deliveryCharge = "FREE"; // Assuming delivery is always free

  const [subTotal, setSubTotal] = useState<number>(initialSubTotal);
  const [grandTotal, setGrandTotal] = useState<number>(initialSubTotal);

  useEffect(() => {
    // If exchange is true, set subtotal and grand total to 0
    if (exchange) {
      setSubTotal(0);
      setGrandTotal(0);
    } else {
      setSubTotal(initialSubTotal);
      setGrandTotal(initialSubTotal);
    }
  }, [exchange]);

  return (
    <div className="order-summary">
      {/* Subtotal Row */}
      <div className="order-summary__row">
        <span className="order-summary__label">Sub Total</span>
        <span className="order-summary__value">Rs. {subTotal}</span>
      </div>

      {/* Loyalty Points Input */}
      <div className="order-summary__loyalty">
        <input
          type="text"
          placeholder="Enter Loyalty Points"
          disabled={exchange} // Disable if exchange is true
        />
        <button
          className="order-summary__apply-btn"
          disabled={exchange} // Disable if exchange is true
        >
          Apply
        </button>
      </div>

      {/* Display Total Loyalty Points */}
      <span className="order-summary__points">
        Total Loyalty Points - {totalLoyaltyPoints}
      </span>

      {/* Delivery Charge Row */}
      <div className="order-summary__row">
        <span className="order-summary__label">Delivery Charge</span>
        <span className="order-summary__value order-summary__value--free">
          {deliveryCharge}
        </span>
      </div>

      {/* Grand Total Row */}
      <div className="order-summary__total">
        <span className="order-summary__label">Grand Total</span>
        <span className="order-summary__value">Rs. {grandTotal}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
