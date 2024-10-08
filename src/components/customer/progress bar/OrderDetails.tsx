import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import StraightenIcon from "@mui/icons-material/Straighten";
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AddressForm from './AddressForm';
import '../../../assets/customer/sass/pages/_orderdetails.scss';
import { MouseEventHandler, useEffect, useState } from 'react';

interface Product {
  productID: string;
  color: string;
  quantity: number;
  size: string;
  price: number;
  image: string;
}

interface PricingDetails {
  totalMRP: number;
  totalDiscount: number;
  totalAmount: number;
}

interface Address {
  addressId?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  buildingName: string;
  streetName: string;
  cityName: string;
  stateName: string;
  countryName: string;
  pinCode: string;
  typeOfAddress: "HOME" | "WORK" | "OTHERS";
}


const fetchAddresses = async () => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(`http://backend:8081/api/user/getAddresses?userId=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch addresses');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching addresses:', error);
    return [];
  }
};

const deleteAddress = async (addressId: string): Promise<boolean> => {
  const userId = localStorage.getItem("userId");
  try {
    const response = await fetch(`http://backend:8081/api/user/deleteAddress?addressId=${addressId}&userId=${userId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete address');
    }
    return true;
  } catch (error) {
    console.error('Error deleting address:', error);
    return false;
  }
};

interface OrderDetailsProps {
  products: Product[];
  pricingDetails: PricingDetails;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ products, pricingDetails }) => {

  const [addresses, setAddresses] = React.useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = React.useState<Address | null>(null);
  const [isAddressAccordionOpen, setIsAddressAccordionOpen] = React.useState(false);
  const [tempSelectedAddress, setTempSelectedAddress] = React.useState<Address | null>(null);
  const [addressFormOpen, setAddressFormOpen] = React.useState(false);
  const [editingAddress, setEditingAddress] = React.useState<Address | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('COD');
  const [isPaymentAccordionOpen, setIsPaymentAccordionOpen] = useState(false);
  const [tempPaymentMethod, setTempPaymentMethod] = useState('');

  const handleTempPaymentMethodChange = (event: any) => {
    setTempPaymentMethod(event.target.value);
  };

  const selectPaymentMethod = () => {
    setSelectedPaymentMethod(tempPaymentMethod);
    setIsPaymentAccordionOpen(false);
  };
  useEffect(() => {
    const fetchAndSetAddresses = async () => {
      const fetchedAddresses = await fetchAddresses();
      setAddresses(fetchedAddresses);
      console.log(fetchedAddresses);
      if (fetchedAddresses.length > 0) {
        setSelectedAddress(fetchedAddresses[0]);
        setTempSelectedAddress(fetchedAddresses[0]);
      }
    };
    fetchAndSetAddresses();
  }, []);

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    const selectedAddr = addresses.find(addr => formatAddress(addr) === selectedValue);
    setTempSelectedAddress(selectedAddr || null);
  };


  const handleSelectAddress = () => {
    setSelectedAddress(tempSelectedAddress);
    setIsAddressAccordionOpen(false);
  };

  const handleCloseAccordion = () => {
    setIsAddressAccordionOpen(false);
  };

  const handleOpenAddressForm = () => {
    setEditingAddress(null);
    setAddressFormOpen(true);
  };

  const handleCloseAddressForm = () => {
    setAddressFormOpen(false);
    setEditingAddress(null);
  };


  const addAddress = async (newAddress: Address) => {
    try {
      const method = newAddress.addressId ? 'PUT' : 'POST';
      const url = newAddress.addressId
        ? 'http://backend:8081/api/user/updateAddress'
        : 'http://backend:8081/api/user/addAddress';

      const userId = localStorage.getItem("userId");

      const payload = {
        userId: userId,
        firstName: newAddress.firstName,
        lastName: newAddress.lastName || "",
        phoneNumber: newAddress.phoneNumber,
        buildingName: newAddress.buildingName,
        streetName: newAddress.streetName,
        cityName: newAddress.cityName,
        stateName: newAddress.stateName,
        countryName: "India",
        pinCode: newAddress.pinCode,
        typeOfAddress: newAddress.typeOfAddress,
        landMark: "",
        ...(newAddress.addressId && { addressId: newAddress.addressId }),
      };

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const updatedAddresses: Address[] = await fetchAddresses();
        setAddresses(updatedAddresses);

        setAddressFormOpen(false);
        setEditingAddress(null);

        if (newAddress.addressId) {
          const updatedAddress = updatedAddresses.find(
            (addr) => addr.addressId === newAddress.addressId
          );
          setSelectedAddress(updatedAddress || null);
          setTempSelectedAddress(updatedAddress || null);
        }
      } else {
        console.error("Failed to add/update address");
        alert("Error while saving the address. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding/updating address:", error);
      alert("An error occurred. Please try again later.");
    }
  };


  const editAddress = (address: Address) => {
    setEditingAddress(address);
    setAddressFormOpen(true);
  };

  const handleDeleteAddress = async (addressId: string) => {
    const success = await deleteAddress(addressId);

    if (success) {
      const updatedAddresses = addresses.filter(addr => addr.addressId !== addressId);
      setAddresses(updatedAddresses);

      if (selectedAddress?.addressId === addressId) {
        if (updatedAddresses.length > 0) {
          setSelectedAddress(updatedAddresses[0]);
          setTempSelectedAddress(updatedAddresses[0]);
        } else {
          setSelectedAddress(null);
          setTempSelectedAddress(null);
        }
      }
    }
  };

  const formatAddress = (address: Address): string => {
    return `${address.firstName} ${address.lastName}, ${address.buildingName},${address.phoneNumber}, ${address.streetName}, ${address.cityName}, ${address.stateName}, ${address.countryName}, ${address.pinCode}`;
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

  async function placeOrder(userId: string, totalAmount: number, products: Product[],selectedPaymentMethod:string) {
    const baseUrl = "http://backend:8081/api/order/";

    console.log(products);

    const orderItemRequests = products.map((product) => ({
      productId: product.productID,
      quantity: product.quantity,
      size: product.size,
      color: product.color,
      totalAmount: product.price * product.quantity,

    }));

    const requestBody = {
      userId: userId,
      totalAmount: totalAmount,
      orderItemRequests: orderItemRequests,
      paymentMethod:selectedPaymentMethod,
    };

    try {
      const response = await fetch(`${baseUrl}placeAnOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to place the order");
      }

      const data = await response.json();
      return data.orderId;
    } catch (error) {
      console.error("Error placing order:", error);
      throw error;
    }
  }


  async function displayRazorpay(
    orderId: string,
    totalAmount: number,
    paymentMethod: string
  ) {
    const userId = localStorage.getItem("userId") ?? "";

    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {


      let requestBody = {
        orderId: orderId,
        userId: userId,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod
      };

      const baseUrl = "http://backend:8081/api/payment/";

      const paymentResponse = await fetch(`${baseUrl}createPayment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!paymentResponse.ok) {
        throw new Error(`Failed to create payment, status: ${paymentResponse.status}`);
      }

      const paymentData = await paymentResponse.json();

      const options = {
        key: "rzp_test_nHgaZ8pP0SqyOm",
        currency: paymentData.currency,
        amount: totalAmount * 100,
        name: "Pay Now",
        description: "Wallet Transaction",
        image: "http://localhost:5173/src/assets/images/logo.png",
        order_id: paymentData.razorPayOrderId,
        handler: async function (response: any) {
          alert("PAYMENT ID ::" + response.razorpay_payment_id);
          alert("ORDER ID :: " + response.razorpay_order_id);
          alert("Signature:: " + response.razorpay_signature);
          alert("CardId:: " + response.razorpay_card_id);

          const postData = {
            razorPayPaymentId: response.razorpay_payment_id,
            razorPayOrderId: response.razorpay_order_id,
            razorPaySignature: response.razorpay_signature,
          };

          const verifyResponse = await fetch(`${baseUrl}verifySignature`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.statusCode === 200) {
            console.log("Payment verified successfully");
          } else {
            console.error("Signature verification failed");
          }
        },
        method: {
          card: paymentMethod === "Card",
          netbanking: paymentMethod === "NetBanking",
          upi: paymentMethod === "UPI",
          wallet: false,
          emi: false,
          paylater: false,
        },
        prefill: {
          name: "Test User",
          email: "example@gmail.com",
          contact: userId,
        },
      };

      const rzp1 = new (window as any).Razorpay(options);

      rzp1.on("payment.failed", function (response: any) {
        alert(response.error.code);
        alert(response.error.description);
      });

      rzp1.open();

    } catch (error) {
      console.error("Error during Razorpay payment:", error);
      alert("Payment failed. Please try again.");
    }
  }

  const razorpay: MouseEventHandler<HTMLButtonElement> = async () => {
    const amount = pricingDetails.totalAmount;
    const userId = localStorage.getItem("userId") ?? "";

    if (!userId) {
      alert("User is not logged in.");
      return;
    }

    try {
      const orderId = await placeOrder(userId, amount, products,selectedPaymentMethod);
      console.log("Order placed successfully, orderId:", orderId);

      if (selectedPaymentMethod !== "COD") {
        await displayRazorpay(orderId, amount, selectedPaymentMethod);
      } else {
        alert("Order placed successfully with Cash on Delivery.");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("Failed to place the order. Please try again.");
    }
  };

  return (
    <div className='orderdetails'>
      <div className="orderdetails_container">
        <h1>CHECKOUT</h1>
        <div className="orderdetails_container_section">
          <div className="orderdetails_container_section_left">
            <div className="address">
              <div className="address_section">
                <div className="heading">
                  <h3>Delivery Address</h3>
                </div>
                <div className="details">
                  <p>{selectedAddress ? formatAddress(selectedAddress) : 'No address selected'}</p>
                </div>
                <div className="action">
                  <button onClick={() => setIsAddressAccordionOpen(!isAddressAccordionOpen)}>
                    Change
                  </button>
                </div>
              </div>

              {isAddressAccordionOpen && (
                <div className="address_accordion">
                  <Accordion expanded={isAddressAccordionOpen}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                      onClick={handleCloseAccordion}
                    >
                      <h4>Select a Delivery Address</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <RadioGroup
                        value={tempSelectedAddress ? formatAddress(tempSelectedAddress) : ''}
                        onChange={handleAddressChange}
                      >
                        {addresses.map((address, index) => (
                          <div key={index} className="address_item">
                            <FormControlLabel
                              value={formatAddress(address)}
                              control={<Radio />}
                              label={formatAddress(address)}
                            />
                            {/* Edit and Delete options */}
                            <div className="address_actions">
                              <span onClick={() => editAddress(address)} style={{ cursor: 'pointer', color: 'blue' }}>Edit</span>
                              <span onClick={() => handleDeleteAddress(address.addressId!)} style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }}>Delete</span>
                            </div>

                          </div>
                        ))}
                      </RadioGroup>

                      <p onClick={handleOpenAddressForm}>
                        <AddIcon />
                        Add a new address
                      </p>

                      <div className='choose_address'>
                        <button
                          className='select'
                          onClick={handleSelectAddress}
                          style={{ marginRight: '10px' }}
                        >
                          Use this address
                        </button>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}

              {/* Address Form Modal */}
              <Dialog
                open={addressFormOpen}
                onClose={handleCloseAddressForm}
                fullWidth
                disableScrollLock
              >
                <DialogContent>
                  <AddressForm
                    addAddress={addAddress}
                    address={editingAddress}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAddressForm} color="primary">
                    Close
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            <div className="payment">
              <div className="payment_section">
                <div className="heading">
                  <h3>Payment Method</h3>
                </div>
                <div className="details">
                  <p>{selectedPaymentMethod}</p>
                </div>
                <div className="action">
                  <button onClick={() => setIsPaymentAccordionOpen(!isPaymentAccordionOpen)}>
                    Change
                  </button>
                </div>
              </div>

              {isPaymentAccordionOpen && (
                <div className="payment_accordion">
                  <Accordion expanded={isPaymentAccordionOpen}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2-content"
                      id="panel2-header"
                    >
                      <h4>Select a Payment Method</h4>
                    </AccordionSummary>
                    <AccordionDetails>
                      <RadioGroup value={tempPaymentMethod} onChange={handleTempPaymentMethodChange}>
                        <FormControlLabel value="COD" control={<Radio />} label="Cash on Delivery" />
                        <FormControlLabel value="Card" control={<Radio />} label="Credit/Debit Card" />
                        <FormControlLabel value="NetBanking" control={<Radio />} label="Net Banking" />
                        <FormControlLabel value="UPI" control={<Radio />} label="UPI" />
                      </RadioGroup>
                      <Button onClick={selectPaymentMethod}>
                        Select this method
                      </Button>
                    </AccordionDetails>
                  </Accordion>
                </div>
              )}
            </div>
            <div className="products">
              {products.map((product, index) => (
                <div key={index} className="products_details">
                  <div className="products_details_container">
                    <div className="image">
                      <img src={product.image} alt={product.productID} />
                    </div>
                    <div className="description">
                      <p>Product ID: {product.productID}</p>
                      <p>Color: {product.color}</p>
                      <p>Quantity: {product.quantity}</p>
                      <p>Size: {product.size}</p>
                      <p>Price: Rs. {product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="orderdetails_container_section_right">
            <div className="price-details">
              <h5>PRICE DETAILS</h5>
              <div>
                <span>Total MRP</span>
                <span>Rs.{pricingDetails.totalMRP}</span>
              </div>
              <div>
                <span>Discount on MRP</span>
                <span>- Rs.{pricingDetails.totalDiscount}</span>
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
                <span>Rs.{pricingDetails.totalAmount}</span>
              </div>
              <button className="place-order" onClick={razorpay} >
                Place your order
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
