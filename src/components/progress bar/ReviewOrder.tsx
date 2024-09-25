/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../assets/sass/components/_review.scss";
import item from "../../assets/images/hover_img_4.webp";
import { useState } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { useNavigate } from "react-router-dom";

interface CartItem {
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

const ReviewOrder = () => {
  const [cartItems, _setCartItems] = useState<CartItem[]>([
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlaceOrder = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="cart-items">
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <div className="cart-item-title">
                <h5>{item.name}</h5>
              </div>
              <span>{item.description}</span>
              <div className="cart-item-price">
                <span className="price">Rs. {item.price}</span>
                <span className="original-price">Rs. {item.originalPrice}</span>
                <span className="discount">{item.discount}</span>
              </div>
              <div className="size-quantity">
                <p>
                  <span>size - </span>
                  <span>{item.size}</span>
                </p>
                <p>
                  <span>Quantity - </span>
                  <span>{item.quantity}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
      {isModalOpen && <Confirmation onClose={handleCloseModal} />}
    </div>
  );
};

export default ReviewOrder;

interface ConfirmationProps {
  onClose: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({ onClose }) => {
  console.log(onClose);
  
  const navigate = useNavigate();

  const navigateToYourOrder = () => {
    navigate("/order");
  };

  const navigateToShop = () => {
    navigate("/shop");
  };

  return (
    <div className="confirmation-modal">
      <div className="confirmation-content">
        <div className="icon-container">
          <WorkOutlineIcon className="icon" />
        </div>
        <h3>Your Order Confirmed!</h3>
        <p>
          Thanks for shopping with us! Your order has not shipped yet, but we
          will send you an email when it’s done.
        </p>
        <div className="btn-container">
          <button className="close-btn" onClick={navigateToYourOrder}>
            Track the Order
          </button>
          <button className="shopping-btn" onClick={navigateToShop}>
            Keep Shopping
          </button>
        </div>
      </div>
    </div>
  );
};
