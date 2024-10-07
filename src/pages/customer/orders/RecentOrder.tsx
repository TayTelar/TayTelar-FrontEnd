import React, { useContext, useState,useRef,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderContext, OrderContextType, MyOrder } from './OrderContext'; // Adjust path as necessary
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import img from "../../../assets/customer/images/nothing_to_show.jpg";
import ShareIcon from "@mui/icons-material/Share";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HomeIcon from "@mui/icons-material/Home";

const RecentOrder: React.FC = () => {
  const { recentOrders, handleCancelOrder } = useContext(OrderContext) as OrderContextType;

  const [cancelItemId, setCancelItemId] = useState<number | null>(null);
  const [showCancelForm, setShowCancelForm] = useState<boolean>(false);
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [customReason, setCustomReason] = useState<string>("");
  const [visibleTrackOrderId, setVisibleTrackOrderId] = useState<number | null>(null);
  const [showReturnOrExchangeModal, setShowReturnOrExchangeModal] = useState<boolean>(false);
const [selectedOrder, setSelectedOrder] = useState<MyOrder | null>(null);
const [isDropdownOpen, setDropdownOpen] = useState(false);
const openReturnOrExchangeModal = (order: MyOrder) => {
  setSelectedOrder(order);
  setShowReturnOrExchangeModal(true);
};
const handleDropdownSelect = (reason: string) => {
  setSelectedReason(reason);
  setDropdownOpen(false); // close dropdown after selection
};
const closeReturnOrExchangeModal = () => {
  setShowReturnOrExchangeModal(false);
  setSelectedOrder(null);
};



  const handleCancel = (itemId: number) => {
    setCancelItemId(itemId);
    setShowCancelForm(true);
  };
  
  const handleTrackOrder = (itemId: number) => {
    // Toggle visibility based on whether the clicked order is already visible
    setVisibleTrackOrderId(visibleTrackOrderId === itemId ? null : itemId);
  };

  const cancellationReasons = [
    "Order by Mistake",
    "Inappropriate Size",
    "Changed Mind",
    "Found a Better Price",
    "Other",
  ];

  const handleSubmitCancellation = () => {
    if (cancelItemId !== null) {
      handleCancelOrder(cancelItemId);
    }
    setCancelItemId(null);
    setSelectedReason("");
    setShowCancelForm(false);
  };

  const handleCancelReason = () => {
    setShowCancelForm(false);
  };

  const cancelItem = recentOrders.find((item) => item.id === cancelItemId);
  

  return (
    <div>
      {recentOrders.length === 0 ? (
        <div className="nothing_to_show">
          <img src={img} alt="Nothing to Show" />
          <p>No Recent Orders To Show</p>
        </div>
      ) : (
        <div className="recent-order-list">
          {recentOrders.map((item) => (
            <div className="products" key={item.id}>
              <div className="recent-order-item">
                <div className="recent-order-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="recent-order-details">
                  <div className="recent-order-title">
                    <h4>{item.name}</h4>
                  </div>
                  <div className="recentorder-id">
                    <span>OrderId-</span>
                    <span className="orderId">{item.orderId}</span>
                  </div>
                  <span>{item.description}</span>
                  <div className="recent-order-price">
                    <span className="price">Rs. {item.price}</span>
                  </div>
                  <div className="size-quantity">
                    <p>
                      <span>Size - </span>
                      <span>{item.size}</span>
                    </p>
                    <p>
                      <span>Quantity - </span>
                      <span>{item.quantity}</span>
                    </p>
                  </div>
                  <div className='delivery-status'>
                    <span>Status: </span>
                    <span className={`status ${item.status.toLowerCase()}`}>
                      {" "}
                      {item.status}
                    </span>
                  </div>
                </div>
                <div className="actionButtons">
                  {item.status === 'Delivered' ? (
                    <>
                    <button className="btn-share">
                    <ShareIcon className="icon" /> Share
                  </button>
                    
                    <button onClick={()=>{openReturnOrExchangeModal(item)}}  className="btn-return">
              
                      Return/Replace
                    </button>
                    </>
                  ) : item.status !== 'Delivered' ? (
                    <>
                      <button className="btn-track" onClick={() => handleTrackOrder(item.id)}>
                        Track Your Order
                      </button>
                      <button className="btn-share">
                        <ShareIcon className="icon" /> Share
                      </button>
                      <button className="btn-cancel" onClick={() => handleCancel(item.id)}>
                        Cancel
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
              {visibleTrackOrderId === item.id && <TrackOrder status={item.status} />}
            </div>
          ))}
        </div>
      )}
      {showCancelForm && (
        <div className="cancel-popup">
          <div className="cancel-popup-overlay" onClick={handleCancelReason} />
          <div className="cancel-form-modal">
            <button className="close-button" onClick={handleCancelReason}>
              &times;
            </button>
            {cancelItem && (
              <div className="cancel-popup-image">
                <img src={cancelItem.image} alt={cancelItem.name} />
              </div>
            )}
            <div className="cancel-popup-content">
              <p>Cancel Request</p>
              {cancelItem && (
                <div className="cancel-item-details">
                  <p>
                    <strong>Order Id:</strong> {cancelItem.orderId}
                  </p>
                  <p>{cancelItem.name}</p>
                  <p>
                    <strong>Rs. {cancelItem.price}</strong>
                  </p>
                  <p>
                    <strong>Size</strong> {cancelItem.size}
                  </p>
                </div>
              )}
              <div>
                
                <label htmlFor="reasons-dropdown">Reason</label>
        <div className="custom-dropdown" onClick={() => setDropdownOpen(!isDropdownOpen)}>
          <div className="selected-option">{selectedReason || "Select a reason"}</div>
          {isDropdownOpen && (
            <ul className="options-list">
              {cancellationReasons.map((reason, index) => (
                <li
                  key={index}
                  className={`option-item ${selectedReason === reason ? "active" : ""}`}
                  onClick={() => handleDropdownSelect(reason)}
                >
                  {reason}
                </li>
              ))}
            </ul>
          )}
        </div>

                {selectedReason === "Other" && (
                  <div className="text-area">
                    <textarea
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      placeholder="Please specify the reason"
                    />
                  </div>
                )}
                <p style={{fontSize:"0.7rem",fontWeight:'400'}}>Refund for prepaid orders will be initiated instantly and will reflect within 4 to 5 bussiness days</p>
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
          </div>
        </div>
      )}
      {showReturnOrExchangeModal && selectedOrder && (
  <div className="modal-overlay" onClick={closeReturnOrExchangeModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="modal-close-button" onClick={closeReturnOrExchangeModal}>
        &times;
      </button>
      <ReturnOrExchange order={selectedOrder} onClose={closeReturnOrExchangeModal} />
    </div>
  </div>
)}

    </div>
    
  );
};

export default RecentOrder;


const TrackOrder: React.FC<{ status: string }> = () => {
  const stages = [
    "Order Placed",
    "Dispatched",
    "Out for Delivery",
    "Delivered",
  ];

  const currentStep = 1; // You can adjust this based on the item's status

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



interface ReturnOrExchangeProps {
  order: MyOrder;
  onClose: () => void;
}

const ReturnOrExchange: React.FC<ReturnOrExchangeProps> = ({ order, onClose }) => {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [customReason, setCustomReason] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const navigate = useNavigate();
  const handleClickOutside = (event:MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const returnReasons = [
    "Product is damaged",
    "Wrong item received",
    "Other"
  ];

  const exchangeReasons = [
    "Size issue",
    "Color issue"
  ];

  const allReasons = [...exchangeReasons, ...returnReasons];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleDropdownSelect = (reason: string) => {
    setSelectedReason(reason);
    setDropdownOpen(false); // close dropdown after selection
  };

  const handleSubmit = (action: string) => {
    if (
      (selectedReason === "Product is damaged" || selectedReason === "Wrong item received") &&
      !image
    ) {
     
      return; // Prevent further action if image is required but not provided
    }
    
    // Proceed with the submission logic
    console.log("Submitting", action);
    console.log("Reason:", selectedReason);
    console.log("Custom Reason:", customReason);
    if (image) {
      console.log("Image:", image);
    }
  
    setIsSubmitted(true);
    
    if (action === "exchange") {
      navigate('/productinfo?exchange=true');
    }
  };
  const handleContinueShopping = () => {
    navigate('/'); // Adjust the path to your shopping page or desired location
  };
  const isReturnReason = returnReasons.includes(selectedReason);
  


  return (
    <div className="return-or-exchange-modal">
      <div className="return-or-exchange-header">
        <h4>Return or Exchange</h4>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
      </div>
      <div className="return-or-exchange-body">
        <div className="product-info">
          <img src={order.image} alt={order.name} />
          <div className="product-details">
            <h3>{order.name}</h3>
            <p><strong>Order ID:</strong> {order.orderId}</p>
            <p>{order.description}</p>
            <p><strong> Rs. {order.price}</strong></p>
            <p><strong>Size:</strong> {order.size}</p>
          </div>
        </div>

        {!isSubmitted ? (
          <form className="form-section">
            <h5>Reason</h5>
            
            {/* Custom dropdown */}
            <div
              className="custom-dropdown"
              ref={dropdownRef}
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            >
              <div className="selected-option">{selectedReason || "Select a reason"}</div>
              {isDropdownOpen && (
                <ul className="options-list">
                  {allReasons.map((reason, index) => (
                    <li
                      key={index}
                      className={`option-item ${selectedReason === reason ? "active" : ""}`}
                      onClick={() => handleDropdownSelect(reason)}
                    >
                      {reason}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Custom reason input */}
            {selectedReason === "Other" && (
              <textarea
                placeholder="Please specify the reason"
                value={customReason}
                onChange={(e) => setCustomReason(e.target.value)}
              />
            )}

            {/* Image upload for specific reasons */}
            {(selectedReason === "Product is damaged" || selectedReason === "Wrong item received") && (
              <div className="image-upload">
                <input type="file" accept="image/*" onChange={handleImageUpload}  required/>
                {image && <p>Image selected: {image.name}</p>}
              </div>
            )}
            
            <div className="actions">
              {/* Return button */}
              <button
              className='return-button'
                onClick={() => handleSubmit("return")}
                disabled={!isReturnReason} // Enable only for return reasons
              >

                Return
              </button>

              {/* Exchange button */}
              <button
              className='exchange-button'
                onClick={() =>{
                  handleSubmit("exchange")}}
                disabled={!selectedReason} // Enable only for exchange reasons
              >
                Exchange
              </button>
            </div>
          </form>
        ) : (
          <div className="return-success">
            <div className="checkmark"></div>
            <h4>Your return request has been processed successfully!</h4>
            <button className="shiny-button" onClick={handleContinueShopping}>Continue Shopping</button>
          </div>
        )}
      </div>
    </div>
  );
};
