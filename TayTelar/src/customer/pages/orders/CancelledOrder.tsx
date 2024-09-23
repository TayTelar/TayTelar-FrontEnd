import React, { useContext } from 'react';
import { OrderContext, OrderContextType } from './OrderContext'; // Adjust path as necessary
import img2 from "../../assets/images/shipped.png";

const CancelledOrder: React.FC = () => {
  const { cancelledOrders } = useContext(OrderContext) as OrderContextType;

  return (
    <div className="canceled-order">
      {cancelledOrders.length === 0 ? (
        <div className="nothing_to_show">
          <img src={img2} alt="Nothing to Show" />
          <p>All your orders were shipped</p>
        </div>
      ) : (
        <div className="canceled-order-list">
          {cancelledOrders.map((item) => (
            <div className="canceled-order-item" key={item.id}>
              <div className="canceled-order-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="canceled-order-details">
                <div className="canceled-order-title">
                  <h5>{item.name}</h5>
                </div>
                <span className="description">{item.description}</span>
                <span>
                  Order ID - <span className="label">{item.orderId}</span>
                </span>
                <span>
                  Order Date - <span className="label">{item.orderDate}</span>
                </span>
                <span>
                  Cancellation Date -{" "}
                  <span className="label">{item.cancellationDate}</span>
                </span>
                <span>
                  Total Price - <span className="label">Rs. {item.price}</span>
                </span>
              </div>
              <div className="actionButtons">
                <button className="btn-buy-again">Buy Item</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CancelledOrder;
