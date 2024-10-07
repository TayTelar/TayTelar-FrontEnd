import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import "../../../assets/customer/sass/components/_address.scss";

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
  addAddress: (address: Address) => void;
  address?: Address | null;
}

const AddressForm: React.FC<AddressFormProps> = ({ addAddress, address }) => {
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

  useEffect(() => {
    if (address) {
      setFormData({
        name: `${address.firstName} ${address.lastName}`,
        mobileNumber: address.phoneNumber,
        addressLine1: address.buildingName || "",
        addressLine2: address.streetName || "",
        city: address.cityName || "",
        pinCode: address.pinCode || "",
        state: address.stateName || "",
        addressType: address.typeOfAddress || "HOME",
        defaultAddress: false,
      });
    }
  }, [address]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
  
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prevState) => ({
        ...prevState,
        [name]: target.checked,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddressTypeChange = (type: "HOME" | "WORK" | "OTHERS") => {
    setFormData((prevState) => ({
      ...prevState,
      addressType: type,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [firstName = "", lastName = ""] = formData.name.split(" ");

    const updatedAddress: Address = {
      addressId: address?.addressId || undefined,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: formData.mobileNumber,
      buildingName: formData.addressLine1,
      streetName: formData.addressLine2,
      cityName: formData.city,
      stateName: formData.state,
      countryName: "India",
      pinCode: formData.pinCode,
      typeOfAddress: formData.addressType,
    };

    addAddress(updatedAddress); 
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <p>{address ? "Edit Address" : "Add New Address"}</p>
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
              borderColor: formData.addressType === "HOME" ? "#3B3B3B" : "#e0e0e0",
            }}
          >
            HOME
          </p>
          <p
            onClick={() => handleAddressTypeChange("WORK")}
            style={{
              borderColor: formData.addressType === "WORK" ? "#3B3B3B" : "#e0e0e0",
            }}
          >
            WORK
          </p>
          <p
            onClick={() => handleAddressTypeChange("OTHERS")}
            style={{
              borderColor: formData.addressType === "OTHERS" ? "#3B3B3B" : "#e0e0e0",
            }}
          >
            OTHERS
          </p>
        </div>
      </div>
      <button type="submit" className="add-address-btn">
        {address ? "Update Address" : "Add Address"}
      </button>
    </form>
  );
};

export default AddressForm;
