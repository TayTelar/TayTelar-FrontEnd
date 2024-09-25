import "../../assets/scss/_settings.scss";
import { useState, useEffect } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

const Settings = () => {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const [selectedGateway, setSelectedGateway] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const [paymentGateways, setPaymentGateways] = useState(() => {
    const storedGateways = localStorage.getItem("paymentGateways");
    return storedGateways
      ? JSON.parse(storedGateways)
      : [
          {
            name: "PayPal",
            status: "Active",
          },
          {
            name: "Stripe",
            status: "Inactive",
          },
          {
            name: "RazorPay",
            status: "Inactive",
          },
        ];
  });

  const [shippingOptions, setShippingOptions] = useState(() => {
    const storedOptions = localStorage.getItem("shippingOptions");
    return storedOptions
      ? JSON.parse(storedOptions)
      : [
          {
            name: "Standard",
            cost: "Rs. 300",
            delivery: "5-7 Days",
          },
          {
            name: "Express",
            cost: "Rs. 800",
            delivery: "1-2 Days",
          },
        ];
  });

  const [otpProviders, setOtpProviders] = useState(() => {
    const storedProviders = localStorage.getItem("otpProviders");
    return storedProviders
      ? JSON.parse(storedProviders)
      : [
          { name: "Twilio", status: "Active" },
          { name: "Nexmo", status: "Active" },
          { name: "Authy", status: "Active" },
          { name: "RazorPay", status: "Inactive" },
        ];
  });

  useEffect(() => {
    localStorage.setItem("paymentGateways", JSON.stringify(paymentGateways));
  }, [paymentGateways]);

  useEffect(() => {
    localStorage.setItem("shippingOptions", JSON.stringify(shippingOptions));
  }, [shippingOptions]);

  useEffect(() => {
    localStorage.setItem("otpProviders", JSON.stringify(otpProviders));
  }, [otpProviders]);

  const handleStatusChange = (type: string, index: number, newStatus: any) => {
    if (type === "payment") {
      const updatedGateways = [...paymentGateways];
      updatedGateways[index].status = newStatus;
      setPaymentGateways(updatedGateways);
    } else if (type === "shipping") {
      const updatedShipping = [...shippingOptions];
      updatedShipping[index].status = newStatus;
      setShippingOptions(updatedShipping);
    } else if (type === "otp") {
      const updatedOtp = [...otpProviders];
      updatedOtp[index].status = newStatus;
      setOtpProviders(updatedOtp);
    }
  };

  const handleAddPaymentGateway = (data: any) => {
    setPaymentGateways([...paymentGateways, { ...data, status: "Active" }]);
  };

  const handleAddShippingOption = (data: any) => {
    setShippingOptions([...shippingOptions, data]);
  };

  const handleAddOtpProvider = (data: any) => {
    setOtpProviders([...otpProviders, { ...data, status: "Active" }]);
  };

  const handleDeletePaymentGateway = (index: number) => {
    const updatedGateways = paymentGateways.filter((i: number) => i !== index);
    setPaymentGateways(updatedGateways);
  };

  const handleDeleteOtpProvider = (index: number) => {
    const updatedProviders = otpProviders.filter((i: number) => i !== index);
    setOtpProviders(updatedProviders);
  };

  return (
    <div className="site-settings">
      <p className="main__header">Site Settings</p>

      <div className="section">
        <p className="sub__header">Payment Gateway Configuration Section</p>
        <Table
          headers={["Gateway Name", "Status", "Actions", "Modify"]}
          rows={paymentGateways.map(
            (gateway: { status: any }, index: number) => ({
              // Change to number
              ...gateway,
              actions: (
                <Actions
                  initialStatus={gateway.status}
                  sectionType="payment"
                  onStatusChange={
                    (newStatus: any) =>
                      handleStatusChange("payment", index, newStatus) // index is now a number
                  }
                />
              ),
              modify: (
                <div>
                  <button className="__edit__button">
                    <CiEdit style={{ color: "#3b3b3b" }} />
                  </button>
                  <button
                    className="__delete__button"
                    onClick={() => handleDeletePaymentGateway(index)} // index is now a number
                  >
                    <MdOutlineDelete style={{ color: "red" }} />
                  </button>
                </div>
              ),
            })
          )}
        />
        <button className="add-button" onClick={() => setShowPaymentForm(true)}>
          + Add New Gateway
        </button>
        {showPaymentForm && (
          <Form
            fields={[
              { label: "Gateway Name", key: "name" },
              { label: "API Key", key: "apiKey" },
              { label: "Secret Key", key: "secretKey" },
              { label: "Merchant ID", key: "merchantId" },
              { label: "Payment Mode", key: "paymentMode" },
              { label: "Transaction Type", key: "transactionType" },
            ]}
            onClose={() => {
              setShowPaymentForm(false);
              setSelectedGateway(null);
            }}
            onSubmit={(data: any) => {
              if (selectedGateway) {
                const updatedGateways = paymentGateways.map(
                  (gateway: { name: any }) =>
                    gateway.name === selectedGateway
                      ? { ...gateway, ...data }
                      : gateway
                );
                setPaymentGateways(updatedGateways);
              } else {
                handleAddPaymentGateway(data);
              }
            }}
            displayedKeys={["name"]}
            initialData={selectedGateway}
          />
        )}
      </div>

      <div className="section">
        <p className="sub__header">Shipping Options Section</p>
        <Table
          headers={["Method Name", "Cost", "Delivery Time", "Actions"]}
          rows={shippingOptions.map((option: any, index: number) => ({
            // Change to number
            ...option,
            actions: (
              <Actions
                initialStatus={"Active"}
                sectionType="shipping"
                onStatusChange={
                  (newStatus: any) =>
                    handleStatusChange("shipping", index, newStatus) // index is now a number
                }
              />
            ),
          }))}
        />
        <button
          className="add-button"
          onClick={() => setShowShippingForm(true)}
        >
          + Add Shipment Method
        </button>
        {showShippingForm && (
          <Form
            fields={[
              { label: "Method Name", key: "name" },
              { label: "Cost", key: "cost" },
              { label: "Delivery Time", key: "delivery" },
            ]}
            onClose={() => setShowShippingForm(false)}
            onSubmit={handleAddShippingOption}
            displayedKeys={["name", "cost", "delivery"]}
            initialData={undefined}
          />
        )}
      </div>

      <div className="section">
        <p className="sub__header">OTP Service Provider Table</p>
        <Table
          headers={["Provider Name", "Status", "Actions", "Modify"]}
          rows={otpProviders.map(
            (provider: { status: any }, index: number) => ({
              // Change to number
              ...provider,
              actions: (
                <Actions
                  initialStatus={provider.status}
                  sectionType="otp"
                  onStatusChange={
                    (newStatus: any) =>
                      handleStatusChange("otp", index, newStatus) // index is now a number
                  }
                />
              ),
              modify: (
                <div>
                  <button className="__edit__button">
                    <CiEdit style={{ color: "#3b3b3b" }} />
                  </button>
                  <button
                    className="__delete__button"
                    onClick={() => handleDeleteOtpProvider(index)} // index is now a number
                  >
                    <MdOutlineDelete style={{ color: "red" }} />
                  </button>
                </div>
              ),
            })
          )}
        />
        <button className="add-button" onClick={() => setShowOtpForm(true)}>
          + Add OTP Provider
        </button>
        {showOtpForm && (
          <Form
            fields={[
              { label: "Provider Name", key: "name" },
              { label: "API Key", key: "apiKey" },
              { label: "Base URL", key: "baseUrl" },
              { label: "Message Template", key: "messageTemplate" },
            ]}
            onClose={() => {
              setShowOtpForm(false);
              setSelectedProvider(null);
            }}
            onSubmit={(data: any) => {
              if (selectedProvider) {
                const updatedProviders = otpProviders.map(
                  (provider: { name: any }) =>
                    provider.name === selectedProvider
                      ? { ...provider, ...data }
                      : provider
                );
                setOtpProviders(updatedProviders);
              } else {
                handleAddOtpProvider(data);
              }
            }}
            displayedKeys={["name"]}
            initialData={selectedProvider}
          />
        )}
      </div>
    </div>
  );
};

interface TableProps {
  headers: string[];
  rows: any[];
}

import React from 'react';

interface TableProps {
  headers: string[];
  rows: any[]; // Use a more specific type if possible
}

const Table: React.FC<TableProps> = ({ headers, rows }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, idx) => (
              <td key={idx}>{value as React.ReactNode}</td> 
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

interface Field {
  label: string;
  key: string;
}

interface FormData {
  fields: Field[]; 
  onClose: () => void;
  onSubmit: (data: any) => void;
  displayedKeys: string[];
  initialData?: any;
}

const Form: React.FC<FormData> = ({
  fields,
  onClose,
  onSubmit,
  displayedKeys,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = () => {
    const dataToSubmit = displayedKeys.reduce((acc: Record<string, any>, key: string) => {
      acc[key] = formData[key];
      return acc;
    }, {} as Record<string, any>); 
    
    onSubmit(dataToSubmit);
    onClose();
  };
  

  return (
    <div className="form-popup">
      <div className="input__fields">
        {fields.map((field, index) => (
          <div key={index} className="form-group">
            <label>{field.label}</label>
            <input
              type="text"
              value={formData[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
            />
          </div>
        ))}
      </div>
      <div className="actionbuttons">
        <button className="save-button" onClick={handleSubmit}>
          Save
        </button>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

interface ActionsProps {
  initialStatus: string;
  sectionType: string;
  onStatusChange: (newStatus: string) => void;
}

const Actions: React.FC<ActionsProps> = ({
  initialStatus,
  sectionType,
  onStatusChange,
}) => {
  const [status, setStatus] = useState(initialStatus);

  const handleActivate = () => {
    setStatus("Active");
    onStatusChange("Active");
  };

  const handleDeactivate = () => {
    setStatus("Inactive");
    onStatusChange("Inactive");
  };

  return (
    <div className="actions">
      {sectionType === "shipping" ? (
        <div className="__edit__delete__buttons">
          <button>Modify</button>
          <button>Delete</button>
        </div>
      ) : (
        <>
          <button onClick={handleActivate} disabled={status === "Active"}>
            Activate
          </button>
          <button onClick={handleDeactivate} disabled={status === "Inactive"}>
            Deactivate
          </button>
        </>
      )}
    </div>
  );
};

export default Settings;
