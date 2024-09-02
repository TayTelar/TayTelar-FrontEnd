import { useState } from "react";
import "../../assets/sass/pages/_checkout.scss";

const AddressForm = ({ addAddress }) => {
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    pinCode: "",
    state: "",
    addressType: "HOME",
    defaultAddress: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleAddressTypeChange = (type) => {
    setFormData({
      ...formData,
      addressType: type,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(formData);
    setFormData({
      name: "",
      mobileNumber: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      pinCode: "",
      state: "",
      addressType: "HOME",
      defaultAddress: false,
    });
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <p>Add New Address</p>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Mobile Number</label>
        <input
          type="tel"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Flat, House no., Building, Company, Apartment</label>
        <input
          type="text"
          name="addressLine1"
          value={formData.addressLine1}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Area, Colony, Street, Sector, Village</label>
        <input
          type="text"
          name="addressLine2"
          value={formData.addressLine2}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Select City</label>
        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="">Select City</option>
          <option value="City1">City1</option>
          <option value="City2">City2</option>
          <option value="City3">City3</option>
        </select>
      </div>
      <div className="form-group">
        <label>Pin Code</label>
        <input
          type="text"
          name="pinCode"
          value={formData.pinCode}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>Select State</label>
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          required
        >
          <option value="">Select State</option>
          <option value="State1">State1</option>
          <option value="State2">State2</option>
          <option value="State3">State3</option>
        </select>
      </div>
      <div className="address-type">
        <span>Select Address Type</span>
        <div className="type">
          <p
            onClick={() => handleAddressTypeChange("HOME")}
            style={{
              borderColor:
                formData.addressType === "HOME" ? "#BA933E" : "#cdcdcd",
            }}
          >
            HOME
          </p>
          <p
            onClick={() => handleAddressTypeChange("OFFICE")}
            style={{
              borderColor:
                formData.addressType === "OFFICE" ? "#BA933E" : "#cdcdcd",
            }}
          >
            OFFICE
          </p>
          <p
            onClick={() => handleAddressTypeChange("OTHERS")}
            style={{
              borderColor:
                formData.addressType === "OTHERS" ? "#BA933E" : "#cdcdcd",
            }}
          >
            OTHERS
          </p>
        </div>
      </div>
      <button type="submit" className="add-address-btn">
        Add Address
      </button>
    </form>
  );
};

export default AddressForm;
