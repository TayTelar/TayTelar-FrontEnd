import "../../assets/sass/pages/_cart.scss";
import item from "../../assets/images/hover_img_4.webp";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StraightenIcon from "@mui/icons-material/Straighten";
import empty_cart from "../../assets/images/empty_cart.png";

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

const CartModal: React.FC = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>([
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

  const handleQuantityChange = (id: number, increment: boolean = true) => {
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

  const handleSizeChange = (id: number, size: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, size } : item))
    );
  };

  const handleCheckboxChange = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const selectedItemsCount = cartItems.filter((item) => item.isChecked).length;

  const addItems = () => {
    navigate("/shop");
  };

  const handleChangeAddress = () => {
    navigate("/checkout");
  };

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
    _paymentMethod:string
  ) {
    let requestBody = {
      orderId: "TT1084534993",
      userId: "UID168250",
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
              // Handle success
              console.log("response from razor pay:" + postResponse);
            } else {
              // Handle error
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
      //   razorpayContainer.style.height = '100px'; // Set the desired height here
      // }
    } catch (error) {
      console.error(
        "An error occurred during the fetch or JSON parsing:",
        error
      );
    }
  }

  const razorpay: MouseEventHandler<HTMLButtonElement> = async (event) => {
    console.log(event);
    const amount = 1000;
    await displayRazorpay("abcd123", "UID168250", amount,"G pay");
    console.log("Request Body:" + "abcd123" + "," + "6360120872" + "," + amount);
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
                <div className="default-address">
                  <div>
                    <span>Kavya Shree</span>
                    <button onClick={handleChangeAddress}>
                      CHANGE ADDRESS
                    </button>
                  </div>
                  <p>
                    Shekar Sound System, Suncalpet Cross, Ganesh Street, Kolar
                    563101
                  </p>
                </div>
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
              <hr />
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
              <button className="place-order" onClick={razorpay}>
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
    </div>
  );
};

export default CartModal;
