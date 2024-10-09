import "../../../assets/customer/sass/components/_revieworder.scss";
import { useState } from "react";

interface YourOrdersProps {
  onCheckAvailability: () => void;
}

const YourOrders: React.FC<YourOrdersProps> = ({ onCheckAvailability }) => {
  const [orderItems, setOrderItems] = useState([
    {
      name: "Raymond Formal",
      color: "Black",
      quantity: 1,
      price: 1500,
      selected: false,
    },
    {
      name: "Raymond Formal",
      color: "Black",
      quantity: 1,
      price: 1500,
      selected: true,
    },
    {
      name: "Raymond Formal",
      color: "Black",
      quantity: 1,
      price: 1500,
      selected: false,
    },
  ]);

  const handleSelectAll = (selected: boolean) => {
    setOrderItems(orderItems.map((item) => ({ ...item, selected })));
  };

  const handleItemSelect = (index: number, selected: boolean) => {
    const updatedItems = [...orderItems];
    updatedItems[index].selected = selected;
    setOrderItems(updatedItems);
  };

  return (
    <div className="review-order">
      <p>Your Recent Orders</p>
      <div className="order">
        <div className="order-header">
          <label>
            <input
              type="checkbox"
              onChange={(e) => handleSelectAll(e.target.checked)}
              checked={orderItems.every((item) => item.selected)}
            />
            Select All Items
          </label>
          <span>
            {" "}
            <span className="label"> Total Amount</span> Rs. 3000
          </span>
        </div>

        <div className="order-items">
          {orderItems.map((item, index) => (
            <Orders
              key={index}
              name={item.name}
              color={item.color}
              quantity={item.quantity}
              price={item.price}
              selected={item.selected}
              onSelect={(selected) => handleItemSelect(index, selected)}
            />
          ))}
        </div>
      </div>
      <div className="button-container">
        <button onClick={onCheckAvailability}>Check Availability</button>
      </div>
    </div>
  );
};

interface Order {
  name: string;
  color: string;
  quantity: number;
  price: number;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

const Orders: React.FC<Order> = ({
  name,
  color,
  quantity,
  price,
  selected,
  onSelect,
}) => {
  return (
    <div className={`order-item ${selected ? "selected" : ""}`}>
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onSelect(e.target.checked)}
        className="order-item-checkbox"
      />
      <div className="order-item-image">IMAGE</div>
      <div className="order-item-details">
        <h3>{name}</h3>
        <p>
          {" "}
          <span className="label">Color</span>{" "}
          <span className="value">{color} </span>
        </p>
        <p>
          {" "}
          <span className="label">Quantity</span>{" "}
          <span className="value">{quantity}</span>
        </p>
        <p>
          {" "}
          <span className="label">Unit Price</span>{" "}
          <span className="value">{price} Rs</span>
        </p>
      </div>
    </div>
  );
};

export default YourOrders;
