import item from "../../assets/images/hover_img_4.webp";
import img2 from "../../assets/images/shipped.png";
import { useState } from "react";

interface CancelledOrder {
    id: number;
    name: string;
    description: string;
    orderID: string;
    orderDate: string;
    cancellationDate: string;
    Total: number;
    image: string;
  }

const CancelledOrder = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, _setItems] = useState<CancelledOrder[]>([
    {
      id: 1,
      name: "Camel Stretch Pants",
      description: "White Accordion Pleated A-Line Formal Pant",
      orderID: "40706098733185123",
      orderDate: "20 Aug 2024",
      cancellationDate: "22 Aug 2024",
      Total: 5000,
      image: item,
    },
  ]);

  // const [items, setItems] = useState<MyOrder[]>([]);

  return (
    <div className="canceled-order">
      {items.length === 0 ? (
        <div className="nothing_to_show">
          <img src={img2} alt="Nothing to Show" />
          <p>All your orders were shipped</p>
        </div>
      ) : (
        <div className="canceled-order-list">
          {items.map((item) => (
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
                  Order ID - <span className="label">{item.orderID}</span>
                </span>
                <span>
                  Order Date - <span className="label">{item.orderDate}</span>
                </span>
                <span>
                  Cancellation Date -{" "}
                  <span className="label">{item.cancellationDate}</span>
                </span>
                <span>
                  Total Price - <span className="label">Rs. {item.Total}</span>
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
