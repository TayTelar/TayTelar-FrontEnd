import "../../assets/sass/pages/_cart.scss";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StraightenIcon from "@mui/icons-material/Straighten";
import empty_cart from "../../assets/images/empty_cart.png";
import axios from "axios";
import ErrorModal from "../../components/modal/ErrorModal";

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
  productColor: string;
  productColorCode: string;
}

const CartModal: React.FC = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);


  const handleQuantityChange = async (id: number, increment: boolean = true) => {
    const itemToUpdate = cartItems.find(item => item.id === id);
    if (!itemToUpdate) return;

    const newQuantity = increment ? itemToUpdate.quantity + 1 : Math.max(1, itemToUpdate.quantity - 1);

    const requestBody = {
      userId: "UID240099",
      cartItemRequests: [
        {
          cartItemId: itemToUpdate.id.toString(),
          productId: "P12349",
          productName: itemToUpdate.name,
          productSize: itemToUpdate.size,
          productColor: itemToUpdate.productColor,
          productColorCode: itemToUpdate.productColorCode,
          quantity: newQuantity,
          price: itemToUpdate.price,
        }
      ]
    };

    try {
      const response = await axios.put("http://localhost:8085/api/cart/updateCartItem", requestBody);

      if (response.status === 200) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity: newQuantity } : item
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
  };

  const handleCheckboxChange = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleRemoveItem = async (id: number) => {
    const itemToUpdate = cartItems.find(item => item.id === id);
    if (!itemToUpdate) return;

    const requestBody = {
      userId: "UID240099",
      cartItemRequests: [
        {
          cartItemId: itemToUpdate.id.toString(),
          productId: "P12349",
          productName: itemToUpdate.name,
          productSize: itemToUpdate.size,
          productColor: itemToUpdate.productColor,
          productColorCode: itemToUpdate.productColorCode,
          quantity: itemToUpdate.quantity,
          price: itemToUpdate.price,
        }
      ]
    };

    try {
      const response = await axios.delete("http://localhost:8085/api/cart/deleteCartItem", {
        data: requestBody
      });

      if (response.data.statusCode === 200) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
      } else {
        console.error("Failed to remove item", response);
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      console.error("Error removing item", error);
      setIsErrorModalOpen(true);
    }
  };



  const selectedItemsCount = cartItems.filter((item) => item.isChecked).length;

  const addItems = () => {
    navigate("/shop");
  };

  const getCartItems = async () => {
    const userId = "UID240099";
    try {
      const response = await axios.get(
        `http://localhost:8085/api/cart/getCartItems?userId=${userId}`
      );

      const items = response.data.cartItemResponses.map((item: any) => ({
        id: item.cartItemId,
        name: item.productName,
        price: item.price,
        size: item.productSize.toString(),
        quantity: item.quantity,
        image: item.productImagesUrl,
        productColor: item.productColor,
        productColorCode: item.productColorCode,
        isChecked: true,
        originalPrice: Math.ceil(item.price * 1.3 * 100) / 100,
        description: item.description,
        discount: "30% OFF",
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
  }, [])

  
  const handleCheckout = () => {
    const selectedProducts = cartItems.filter((item) => item.isChecked).map((item) => ({
      productID: item.id,
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
  {/* 
    const loadScript = (src: any) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

  async function displayRazorpay(
    orderId: string,
    userId: string,
    totalAmount: number,
    paymentMethod: string
  ) {
    let requestBody = {
      orderId: "TT1084534993",
      userId: "UID240099",
      totalAmount: 1000,
      paymentMethod: "G Pay"
    };

    // let baseUrl =
    // "http://app-vehicle-lb-1832405950.ap-south-1.elb.amazonaws.com/";
    let baseUrl = "http://localhost:8085/api/payment/";

    try {
      const response = await fetch(`${baseUrl}createPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log(data);

      const options = {
        key: "rzp_test_nHgaZ8pP0SqyOm",
        currency: data.currency,
        amount: totalAmount * 100,
        name: "Pay Now",
        description: "Wallet Transaction",
        image: "http://localhost:5173/src/assets/images/logo.png",
        order_id: data.razorPayOrderId,
        handler: async function (response: any) {
          alert("PAYMENT ID ::" + response.razorpay_payment_id);
          alert("ORDER ID :: " + response.razorpay_order_id);
          alert("Signature:: " + response.razorpay_signature);
          console.log(response);

          try {
            const postData = {
              razorPayPaymentId: response.razorpay_payment_id,
              razorPayOrderId: response.razorpay_order_id,
              razorPaySignature: response.razorpay_signature,
            };

            const postResponse = await fetch(`${baseUrl}verifySignature`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            }).then((t) => t.json());

            console.log(postResponse);

            if (postResponse.statusCode === 200) {
              console.log("response from razor pay:" + postResponse);
            } else {
              console.error("Unable to validate Signature");
            }
          } catch (error) {
            console.error("An error occurred during the POST API call:", error);
          }
        },
        prefill: {
          name: orderId,
          email: "example@gmail.com",
          contact: userId,
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();

      // const razorpayContainer = document.getElementsByClassName('razorpay-container') as HTMLElement;
      // if (razorpayContainer) {
      //   razorpayContainer.style.height = '100px'; 
      // }
    } catch (error) {
      console.error(
        "An error occurred during the fetch or JSON parsing:",
        error
      );
    }
  }

  const razorpay: MouseEventHandler<HTMLButtonElement> = async () => {
    const amount = 1000;
    await displayRazorpay("abcd123", "UID168250", amount, "G pay");
    console.log("Request Body:" + "abcd123" + "," + "6360120872" + "," + amount);
  };

    */}
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
                        <span className="price">Rs. {(item.price * item.quantity).toFixed(2)}</span>
                        <span className="original-price">
                          Rs. {(item.originalPrice * item.quantity).toFixed(2)}
                        </span>
                        <span className="discount">{item.discount}</span>
                      </div>
                      <div className="cart-item-options">
                        <div className="size-dropdown">
                          size: {item.size}
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
