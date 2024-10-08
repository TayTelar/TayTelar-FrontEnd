import "../../../assets/customer/sass/pages/_cart.scss";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StraightenIcon from "@mui/icons-material/Straighten";
import empty_cart from "../../../assets/customer/images/empty_cart.png";
import axios from "axios";
import ErrorModal from "../../../components/customer/modal/ErrorModal";

interface CartItem {
  productOfferPercentage: string;
  productId: string;
  cartItemId: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  size: string;
  quantity: number;
  isChecked: boolean;
  image: string;
  productColor: string;
  productColorCode: string;
}

const CartModal: React.FC = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const userId = localStorage.getItem("userId") ?? "";
  const guestCartItems = localStorage.getItem("guestCart");

  useEffect(() => {
    if (guestCartItems) {
      try {
        const parsedGuestCart = JSON.parse(guestCartItems);
        const updatedCart = parsedGuestCart.map((item: any) => ({
          ...item ,
          name: item.productName,
          size:item.productSize
        }));
  
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
        setCartItems(updatedCart);
      } catch (error) {
        console.error("Error parsing guest cart items from localStorage:", error);
      }
    }
  }, [guestCartItems]);

  const handleQuantityChange = async (cartItemId: number, increment = true) => {
    const itemToUpdate = cartItems.find((item) => item.cartItemId === cartItemId);
    if (!itemToUpdate) return;

    const newQuantity = increment ? itemToUpdate.quantity + 1 : Math.max(1, itemToUpdate.quantity - 1);

    if (!userId) {
      const updatedCartItems = cartItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });

      localStorage.setItem("guestCart", JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
    } else {
      const requestBody = {
        userId: userId,
        cartItemRequests: [
          {
            cartItemId: itemToUpdate.cartItemId.toString(),
            productId: itemToUpdate.productId,
            productName: itemToUpdate.name,
            productSize: itemToUpdate.size,
            productColor: itemToUpdate.productColor,
            productColorCode: itemToUpdate.productColorCode,
            quantity: newQuantity,
            price: itemToUpdate.price,
            productOfferPercentage: itemToUpdate.productOfferPercentage,
          }
        ]
      };

      try {
        const response = await axios.put("http://backend:8081/api/cart/updateCartItem", requestBody);
        if (response.status === 200) {
          setCartItems((prevItems) =>
            prevItems.map((item) =>
              item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
            )
          );
        } else {
          setIsErrorModalOpen(true);
          console.error("Failed to update quantity", response);
        }
      } catch (error) {
        setIsErrorModalOpen(true);
        console.error("Error updating quantity", error);
      }
    }
  };

  const handleCheckboxChange = (cartItemId: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleRemoveItem = async (cartItemId:number) => {
    const itemToRemove = cartItems.find((item) => item.cartItemId === cartItemId);
    if (!itemToRemove) return;
  
    if (!userId) {
      const filteredCartItems = cartItems.filter((item) => item.cartItemId !== cartItemId);
  
      localStorage.setItem("guestCart", JSON.stringify(filteredCartItems));
      setCartItems(filteredCartItems);
    } else {
      const requestBody = {
        userId,
        cartItemRequests: [
          {
            cartItemId: itemToRemove.cartItemId.toString(),
            productId: itemToRemove.productId,
            productName: itemToRemove.name,
            productSize: itemToRemove.size,
            productColor: itemToRemove.productColor,
            productColorCode: itemToRemove.productColorCode,
            quantity: itemToRemove.quantity,
            price: itemToRemove.price,
            productOfferPercentage: itemToRemove.productOfferPercentage,
          }
        ]
      };

      try {
        const response = await axios.delete("http://backend:8081/api/cart/deleteCartItem", {
          data: requestBody
        });

        if (response.data.statusCode === 200) {
          setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
        } else {
          console.error("Failed to remove item", response);
          setIsErrorModalOpen(true);
        }
      } catch (error) {
        console.error("Error removing item", error);
        setIsErrorModalOpen(true);
      }
    }
  };


  const selectedItemsCount = cartItems.filter((item) => item.isChecked).length;

  const addItems = () => {
    navigate("/shop");
  };

  const getCartItems = async () => {
    if (!userId) {
      console.log("No userId found, skipping cart items fetch.");
      return;
    }

    try {
      const response = await axios.get(
        `http://backend:8081/api/cart/getCartItems?userId=${userId}`
      );

      const items = response.data.cartItemResponses.map((item: any) => ({
        cartItemId: item.cartItemId,
        productId: item.productId,
        name: item.productName,
        originalPrice: item.price,
        size: item.productSize.toString(),
        quantity: item.quantity,
        image: item.productImagesUrl,
        productColor: item.productColor,
        productColorCode: item.productColorCode,
        isChecked: true,
        price: Math.ceil(item.price * item.productOfferPercentage) / 100,
        description: item.description,
        discount: item.productOfferPercentage,
      }));

      setCartItems(items);
      console.log("Cart items loaded successfully", items);
    } catch (error: any) {
      console.log("Couldn't load cart items", error);
      setIsErrorModalOpen(true);
    }
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const handleCheckout = () => {

    if (!userId) {
      navigate('/login');
      return;
    }

    const selectedProducts = cartItems.filter((item) => item.isChecked).map((item) => ({
      productID: item.productId,
      name: item.name,
      color: item.productColor,
      quantity: item.quantity,
      size: item.size,
      price: item.price,
      image: item.image,
    }));

    const totalMRP = cartItems.reduce(
      (acc, item) => acc + (item.isChecked ? item.originalPrice * item.quantity : 0),
      0
    );

    const totalDiscount = cartItems.reduce(
      (acc, item) => acc + (item.isChecked ? (item.originalPrice - item.price) * item.quantity : 0),
      0
    );

    const totalAmount = cartItems.reduce(
      (acc, item) => acc + (item.isChecked ? item.price * item.quantity : 0),
      0
    );

    navigate('/checkout', {
      state: {
        selectedProducts,
        pricingDetails: {
          totalMRP: totalMRP.toFixed(2),
          totalDiscount: totalDiscount.toFixed(2),
          totalAmount: totalAmount.toFixed(2),
        }
      }
    });
  };

  return (
    <div className="cart-modal">
      <div className="cart-content">
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <img src={empty_cart} alt="Empty Cart" />
            <h5>Your cart is empty</h5>
            <p>Start adding items to your cart</p>
            <button onClick={addItems}>Go to Shop</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              <div className="cart-header">
                <h5>
                  {selectedItemsCount} OUT OF {cartItems.length} ITEMS SELECTED
                </h5>
                <p onClick={addItems} className="items-to-cart">
                  Add Few More Items To Cart{" "}
                </p>
              </div>
              <div className="cart-items-list">
                {cartItems.map((item) => (
                  <div className="cart-item" key={item.cartItemId}>
                    <div className="cart-item-checkbox">
                      <input
                        type="checkbox"
                        checked={item.isChecked}
                        onChange={() => handleCheckboxChange(item.cartItemId)}
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
                          onClick={() => handleRemoveItem(item.cartItemId)}
                        >
                          <RemoveCircleIcon />
                        </button>
                      </div>
                      <span>{item.description}</span>
                      <div className="cart-item-price">
                        <span className="price">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                        <span className="original-price">
                          Rs. {(item.originalPrice * item.quantity).toFixed(2)}
                        </span>
                        <span className="discount">{item.productOfferPercentage}%</span>
                      </div>
                      <div className="cart-item-options">
                        <div className="size-dropdown">
                          size: {item.size}
                        </div>
                        <div className="quantity-control">
                          <button
                            onClick={() => handleQuantityChange(item.cartItemId, false)}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.cartItemId, true)}
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
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + (item.isChecked ? item.originalPrice * item.quantity : 0),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <div>
                <span>Discount on MRP</span>
                <span>
                  - Rs.{" "}
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc +
                        (item.isChecked
                          ? (item.originalPrice - item.price) * item.quantity
                          : 0),
                      0
                    )
                    .toFixed(2)}
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
              <hr />
              <div className="total-amount">
                <span>TOTAL AMOUNT</span>
                <span>
                  Rs.{" "}
                  {cartItems
                    .reduce(
                      (acc, item) => acc + (item.isChecked ? item.price * item.quantity : 0),
                      0
                    )
                    .toFixed(2)}
                </span>
              </div>
              <button className="place-order" onClick={() => handleCheckout()}>
                CHECKOUT
              </button>

              <div className="trust-indicators">
                <div className="indicator">
                  <LocalShippingIcon className="icon" />
                  <span>Easy Exchange</span>
                </div>
                <div className="indicator">
                  <AssuredWorkloadIcon className="icon" />
                  <span>Secure Payment</span>
                </div>
                <div className="indicator">
                  <StraightenIcon className="icon" />
                  <span>Best Fit</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <ErrorModal
        open={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
        title="Error!"
        content="Something went wrong. Please try again later."
        buttonText="Close"
      />
    </div>
  );
};

export default CartModal;
