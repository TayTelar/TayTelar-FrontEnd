import { useNavigate } from "react-router-dom";
import { useState } from "react";
import item from "../../assets/images/hover_img_4.webp";
import img1 from "../../assets/images/no-purchase.jpg";

interface BuyAgain {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  size: string;
  quantity: number;
  isChecked: boolean;
  image: string;
}

const BuyAgain = () => {
  const [items, setItems] = useState<BuyAgain[]>([
    {
      id: 1,
      name: "Camel Stretch Pants",
      description: "White Accordion Pleated A-Line Formal Pant",
      price: 2675,
      originalPrice: 2899,
      discount: "50% OFF",
      size: "36",
      quantity: 1,
      isChecked: true,
      image: item,
    },
    {
      id: 2,
      name: "Camel Stretch Pants",
      description: "White Accordion Pleated A-Line Formal Pant",
      price: 2675,
      originalPrice: 2899,
      discount: "50% OFF",
      size: "36",
      quantity: 1,
      isChecked: false,
      image: item,
    },
    {
      id: 3,
      name: "Camel Stretch Pants",
      description: "White Accordion Pleated A-Line Formal Pant",
      price: 2675,
      originalPrice: 2899,
      discount: "50% OFF",
      size: "36",
      quantity: 1,
      isChecked: false,
      image: item,
    },
  ]);

  // const [items, setItems] = useState<BuyAgain[]>([]);

  const handleQuantityChange = (id: number, increment: boolean = true) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: increment
                ? item.quantity + 1
                : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const handleSizeChange = (id: number, size: string) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, size } : item))
    );
  };

  const navigate = useNavigate();

  const handleBuyAgain = () => {
    navigate("/checkout");
  };

  const handleAddToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="buy-again">
      {items.length === 0 ? (
        <div className="nothing_to_show">
          <img src={img1} alt="Nothing to Show" />
          <p>No Recent Purchase To Show</p>
        </div>
      ) : (
        <>
          {items.map((item) => (
            <div className="buy-again-item" key={item.id}>
              <div className="buy-again-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="buy-again-details">
                <div className="buy-again-title">
                  <h5>{item.name}</h5>
                </div>
                <span>{item.description}</span>
                <div className="buy-again-price">
                  <span className="price">Rs. {item.price}</span>
                  <span className="original-price">
                    Rs. {item.originalPrice}
                  </span>
                  <span className="discount">{item.discount}</span>
                </div>
                <div className="buy-again-options">
                  <div className="size-dropdown">
                    <select
                      id="size"
                      value={item.size}
                      onChange={(e) =>
                        handleSizeChange(item.id, e.target.value)
                      }
                    >
                      <option value="32">32</option>
                      <option value="34">34</option>
                      <option value="36">36</option>
                      <option value="38">38</option>
                    </select>
                  </div>
                  <div className="quantity-control">
                    <button
                      onClick={() => handleQuantityChange(item.id, false)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item.id, true)}>
                      +
                    </button>
                  </div>
                </div>
                <p>14 days return available</p>
              </div>
              <div className="actionButtons">
                <button className="btn-buy-again" onClick={handleBuyAgain}>
                  Buy Again
                </button>
                <button className="btn-cart" onClick={handleAddToCart}>
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BuyAgain;
