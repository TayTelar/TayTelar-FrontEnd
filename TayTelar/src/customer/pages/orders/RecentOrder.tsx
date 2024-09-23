import { useState, useRef } from "react";
import item from "../../assets/images/hover_img_4.webp";
import img from "../../assets/images/nothing_to_show.jpg";
import ShareIcon from "@mui/icons-material/Share";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";


interface MyOrder {
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

const RecentOrder = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [items, setItems] = useState<MyOrder[]>([
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

  // const [items, setItems] = useState<MyOrder[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cancelItemId, setCancelItemId] = useState<number | null>(null);
  const [showCancelForm, setShowCancelForm] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);

  const handleCancel = (itemId: number) => {
    setCancelItemId(itemId);
    setShowCancelForm(true);
    setTimeout(() => {
      cancelFormRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const cancellationReasons = [
    "Order by Mistake",
    "Inappropriate Size",
    "Changed Mind",
    "Found a Better Price",
    "Other",
  ];

  const cancelFormRef = useRef<HTMLDivElement | null>(null);

  const handleSubmitCancellation = () => {
    console.log("Cancellation Reason:", selectedReason);
    setCancelItemId(null);
    setSelectedReason("");
  };

  const handleCancelReason = () => {
    setShowCancelForm(false);
  };

  const [customReason, setCustomReason] = useState<string>("");

  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const handleTrackClick = (itemId: number) => {
    setSelectedItemId((prevId) => (prevId === itemId ? 0 : itemId));
  };

  return (
    <div>
      {items.length === 0 ? (
        <div className="nothing_to_show">
          <img src={img} alt="Nothing to Show" />
          <p>No Recent Orders To Show</p>
        </div>
      ) : (
        <div className="recent-order-list">
          {items.map((item) => (
            <div className="products">
              <div className="recent-order-item" key={item.id}>
                <div className="recent-order-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="recent-order-details">
                  <div className="recent-order-title">
                    <h5>{item.name}</h5>
                  </div>
                  <span>{item.description}</span>
                  <div className="recent-order-price">
                    <span className="price">Rs. {item.price}</span>
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
                <div className="actionButtons">
                  <button
                    className="btn-track"
                    onClick={() => handleTrackClick(item.id)}
                  >
                    Track your order
                  </button>
                  <button className="btn-share">
                    <ShareIcon className="icon" /> Share
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => handleCancel(item.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
              {selectedItemId === item.id && (
                <div className="track-your-order">
                  <TrackOrder />{" "}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {showCancelForm && (
        <div className="cancel-form" ref={cancelFormRef}>
          <p>Select Reason for Cancellation</p>
          <ul className="reason-list">
            {cancellationReasons.map((reason, index) => (
              <li
                key={index}
                className={selectedReason === reason ? "selected" : ""}
                onClick={() => setSelectedReason(reason)}
              >
                {reason}
              </li>
            ))}
          </ul>
          <div className="text-area">
            {selectedReason === "Other" && (
              <textarea
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
                placeholder="Please specify the reason"
              />
            )}
          </div>
          <div className="btns-container">
            <button
              onClick={handleSubmitCancellation}
              disabled={!selectedReason}
            >
              Submit
            </button>
            <button onClick={handleCancelReason}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentOrder;

const TrackOrder: React.FC = () => {
  const stages = [
    "Order Placed",
    "Dispatched",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = 1;

  const stepIcons = [
    <CheckCircleIcon key="Order Placed" />,
    <Inventory2Icon key="Dispatched" />,
    <LocalShippingIcon key="Out for Delivery" />,
    <HomeIcon key="Delivered" />,
  ];

  return (
    <div className="track-main-container">
      <div style={{ textAlign: "center" }}>
        <p className="delivery">
          Estimated Delivery : <span>20 September 2024</span>
        </p>
      </div>
      <div className="progress-bar">
        {stages.map((step, index) => (
          <div
            key={index}
            className={`progress-step ${
              currentStep === index ? "active" : ""
            } ${currentStep > index ? "completed" : ""}`}
          >
            <div className="step-icon">{stepIcons[index]}</div>
            <p className="step-label">{step}</p>
          </div>
        ))}
      </div>
      <div className="track-button-container">
        <button>Track Your Package</button>
      </div>
    </div>
  );
};
