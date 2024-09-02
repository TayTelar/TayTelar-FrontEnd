import "../../assets/sass/pages/_cart.scss";
import item from "../../assets/images/hover_img_4.webp";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CartModal = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
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

  const handleQuantityChange = (id, increment = true) => {
    setCartItems((prevItems) =>
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

  const handleSizeChange = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, size } : item))
    );
  };

  const handleCheckboxChange = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const selectedItemsCount = cartItems.filter((item) => item.isChecked).length;

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div className="cart-modal">
      <div className="cart-content">
        <div className="cart-items">
          <div className="cart-header">
            <h5>
              {selectedItemsCount} OUT OF {cartItems.length} ITEMS SELECTED
            </h5>
          </div>
          <div className="cart-items-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <div className="cart-item-checkbox">
                  <input
                    type="checkbox"
                    checked={item.isChecked}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </div>
                <div className="cart-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-title">
                    <h5>{item.name}</h5>
                    <button
                      className="remove-item"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <RemoveCircleIcon />
                    </button>
                  </div>
                  <span>{item.description}</span>
                  <div className="cart-item-price">
                    <span className="price">Rs. {item.price}</span>
                    <span className="original-price">
                      Rs. {item.originalPrice}
                    </span>
                    <span className="discount">{item.discount}</span>
                  </div>
                  <div className="cart-item-options">
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
                      <button
                        onClick={() => handleQuantityChange(item.id, true)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p>14 days return available</p>
                </div>
              </div>
            ))}
          </div>
        </div>
          <div className="price-details">
            <h5>
              PRICE DETAILS ({selectedItemsCount} Item
              {selectedItemsCount > 1 && "s"})
            </h5>
            <div>
              <span>Total MRP</span>
              <span>
                Rs.{" "}
                {cartItems.reduce(
                  (acc, item) =>
                    acc + (item.isChecked ? item.originalPrice : 0),
                  0
                )}
              </span>
            </div>
            <div>
              <span>Discount on MRP</span>
              <span>
                - Rs.{" "}
                {cartItems.reduce(
                  (acc, item) =>
                    acc +
                    (item.isChecked ? item.originalPrice - item.price : 0),
                  0
                )}
              </span>
            </div>
            <div>
              <span>Platform Fee</span>
              <span className="free">FREE</span>
            </div>
            <div>
              <span>Shipping Fee</span>
              <span className="free">FREE</span>
            </div>
            <div className="total-amount">
              <span>TOTAL AMOUNT</span>
              <span>
                Rs.{" "}
                {cartItems.reduce(
                  (acc, item) => acc + (item.isChecked ? item.price : 0),
                  0
                )}
              </span>
            </div>
            <button className="place-order" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </div>
      </div>
    </div>
  );
};

export default CartModal;
