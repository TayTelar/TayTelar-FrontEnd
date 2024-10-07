import React, { useState } from "react";
import "../../../assets/customer/sass/pages/_editAddressForm.scss";

interface EditAddressFormProps {
  addressData: {
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    addressType: string;
  };
  onClose: () => void;
  onSave: (updatedAddress: any) => void;
}

const EditAddressForm: React.FC<EditAddressFormProps> = ({
  addressData,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(addressData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div
      // style={{
      //   position: "absolute",
      //   right: 1000,
      //   top: 0,
      //   left: 0,
      //   width: "100%",
      //   height: "100vh",
      //   backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   zIndex: 1000, // ensures the overlay is on top
      // }}
      className="edit-address-modal"
    >
      <div
        // style={{
        //   backgroundColor: "white",
        //   padding: "20px",
        //   borderRadius: "10px",
        //   width: "100%",
        //   position: "relative",
        //   marginRight: "700px",
        // }}
        className="modal-content"
      >
        <h3>Edit Address</h3>

        <div className="input-field">
          <label htmlFor="name"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="phone"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="phone"
            name="phone"
            type="text"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="addressLine1"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="addressLine1"
            name="addressLine1"
            type="text"
            value={formData.addressLine1}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="addressLine2"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="addressLine2"
            name="addressLine2"
            type="text"
            value={formData.addressLine2}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="city"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="city"
            name="city"
            type="text"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="state"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="zipCode"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
            }}
            id="zipCode"
            name="zipCode"
            type="text"
            value={formData.zipCode}
            onChange={handleChange}
          />
        </div>
        <div className="input-field">
          <label htmlFor="country"></label>
          <input
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              marginTop: "5px",
              // width:'290px',
            }}
            id="country"
            name="country"
            type="text"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="button-container">
          <button
            style={{
              fontFamily: "Montserrat, sans-serif",
              backgroundColor: "#3B3B3B",
              padding: "10px 35px",
              color: "white",
              marginTop: "15px",
              border: "none",
            }}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            style={{
              fontFamily: "Montserrat, sans-serif",
              backgroundColor: "#3B3B3B",
              padding: "10px 35px",
              color: "white",
              position: "absolute",
              right: "100px",
              marginTop: "15px",
              border: "none",
            }}
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressForm;
