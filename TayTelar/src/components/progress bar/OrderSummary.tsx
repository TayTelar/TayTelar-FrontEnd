const OrderSummary = () => {
  const subTotal = 2675;
  const totalLoyaltyPoints = 1000;
  const deliveryCharge = "FREE";

  return (
    <div className="order-summary">
      <div className="order-summary__row">
        <span className="order-summary__label">Sub Total</span>
        <span className="order-summary__value">Rs. {subTotal}</span>
      </div>

      <div className="order-summary__loyalty">
        <input type="text" placeholder="Enter Loyalty Points" />
        <button className="order-summary__apply-btn">Apply</button>
      </div>

      <span className="order-summary__points">
        Total Loyalty Points - {totalLoyaltyPoints}
      </span>

      <div className="order-summary__row">
        <span className="order-summary__label">Delivery Charge</span>
        <span className="order-summary__value order-summary__value--free">
          {deliveryCharge}
        </span>
      </div>

      <div className="order-summary__total">
        <span className="order-summary__label">Grand Total</span>
        <span className="order-summary__value">Rs. {subTotal}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
