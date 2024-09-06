import React, { useState, ChangeEvent, FormEvent } from "react";
import "../../assets/sass/components/_address.scss";

interface FormData {
  name: string;
  mobileNumber: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  pinCode: string;
  state: string;
  addressType: "HOME" | "WORK" | "OTHERS";
  defaultAddress: boolean;
}

interface AddressFormProps {
  addAddress: (address: FormData) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({ addAddress }) => {
  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleAddressTypeChange = (type: "HOME" | "WORK" | "OTHERS") => {
    setFormData({
      ...formData,
      addressType: type,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
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
                formData.addressType === "HOME" ? "#3B3B3B" : "#e0e0e0",
            }}
          >
            HOME
          </p>
          <p
            onClick={() => handleAddressTypeChange("WORK")}
            style={{
              borderColor:
                formData.addressType === "WORK" ? "#3B3B3B" : "#e0e0e0",
            }}
          >
            WORK
          </p>
          <p
            onClick={() => handleAddressTypeChange("OTHERS")}
            style={{
              borderColor:
                formData.addressType === "OTHERS" ? "#3B3B3B" : "#e0e0e0",
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
