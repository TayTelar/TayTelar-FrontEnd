import React, { useState } from "react";
import AddressForm from "./AddressForm";
import LogoutIcon from "@mui/icons-material/Logout";
import EditAddressForm from "./EditAddressForm"; // Import the new EditAddressForm component
import "../../assets/sass/pages/_addressComponent.scss";

// Define the Address type
interface Address {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  addressType: string;
  isDefault: boolean;
}

interface AddressComponentProps {
  isAddressComponentOpen?: boolean;
  setIsAddressComponentOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddressComponent = ({
  setIsAddressComponentOpen,
}: AddressComponentProps) => {

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([
    {
      name: "Jayanth",
      phone: "6362815412",
      addressLine1: "Nandi",
      addressLine2: "Chickballapur",
      city: "Chickballapur",
      state: "Karnataka",
      zipCode: "562101",
      country: "India",
      addressType: "WORK",
      isDefault: true,
    },
    {
      name: "Jayanth",
      phone: "6362815412",
      addressLine1: "Thowdanahalli",
      addressLine2: "chickballapur",
      city: "cbpur",
      state: "Karnataka",
      zipCode: "562101",
      country: "India",
      addressType: "HOME",
      isDefault: false,
    },
  ]);

  const [currentEditAddress, setCurrentEditAddress] = useState<Address | null>(
    null
  ); // Address to edit

  const handleAddAddressClick = () => {
    setIsFormOpen(true); // Open the AddressForm
  };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Close the AddressForm
    setIsEditFormOpen(false); // Close the EditAddressForm
  };

  const handleEditAddress = (index: number) => {
    setCurrentEditAddress(addresses[index]); // Set the address to edit
    setIsEditFormOpen(true); // Open the EditAddressForm
  };

  const handleUpdateAddress = (updatedAddress: Address) => {
    const updatedAddresses = addresses.map((address) =>
      address.phone === updatedAddress.phone ? updatedAddress : address
    );
    setAddresses(updatedAddresses);
    setIsEditFormOpen(false); // Close the EditAddressForm after updating
  };

  const handleRemoveAddress = (index: number) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  const handleMakeDefault = (index: number) => {
    const updatedAddresses = addresses.map((address, i) => {
      if (i === index) {
        return { ...address, isDefault: true }; // Set the selected address as default
      } else {
        return { ...address, isDefault: false }; // Set the rest as non-default
      }
    });
    setAddresses(updatedAddresses);
  };

  return (
    <>
      {isEditFormOpen && currentEditAddress && (
        <EditAddressForm
          addressData={currentEditAddress}
          onClose={handleCloseForm}
          onSave={handleUpdateAddress} // Function to update the address
        />
      )}
      <div className="address-container">
        <div className="address-inner-container">
          {/* Add Address Button */}
          <button
            onClick={handleAddAddressClick}
            style={{
              font: "Montserrat, sans-serif",
              backgroundColor: "#3B3B3B",
              padding: "10px 35px",
              color: "white",
              borderRadius: "0",
              marginRight: "30px",
              marginTop: "40px",
            }}
            className="add-address-btn"
          >
            ADD ADDRESS +
          </button>

          <div style={{ display: "flex", alignItems: "center" }}>
            <LogoutIcon
              style={{
                marginRight: "10px",
                cursor: "pointer",
                color: "black",
                transform: "scaleX(-1)",
                verticalAlign: "middle",
                marginTop: "8px",
              }}
              onClick={() => setIsAddressComponentOpen(false)}
            />
            <h2
              style={{
                font: "Montserrat, sans-serif",
                padding: "10px",
                marginLeft: "10px",
                marginBottom: "10px",
              }}
            >
              Saved Addresses
            </h2>
          </div>

          {/* Default Address Section */}
          {addresses
            .filter((address) => address.isDefault)
            .map((address, index) => (
              <div key={index} className="address-section">
                <h3
                  style={{
                    font: "Montserrat, sans-serif",
                    marginLeft: "10px",
                  }}
                >
                  Default Address
                </h3>
                <div className="address-card">
                  <p className="name">{address.name}</p>
                  <p className="phone">{address.phone}</p>
                  <p
                    style={{ marginBottom: "15px", color: "black" }}
                    className="address"
                  >
                    Address Line 1: {address.addressLine1}, <br />
                    Address Line 2: {address.addressLine2}, <br />
                    City: {address.city}, State: {address.state}, Zip/Postal
                    Code: {address.zipCode}, <br />
                    Country: {address.country}, <br />
                    Address Type: {address.addressType}
                  </p>
                  <div className="button-container">
                    <button
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        backgroundColor: "#3B3B3B",
                        padding: "10px 35px",
                        color: "white",
                        marginTop: "15px",
                      }}
                      className="edit-btn"
                      onClick={() => handleEditAddress(index)}
                    >
                      EDIT
                    </button>
                    <button
                      style={{
                        fontFamily: "Montserrat, sans-serif",
                        backgroundColor: "#3B3B3B",
                        padding: "10px 35px",
                        color: "white",
                        marginTop: "15px",
                      }}
                      className="remove-btn"
                      onClick={() => handleRemoveAddress(index)}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Other Addresses Section */}
          {addresses.map(
            (address, index) =>
              !address.isDefault && (
                <div key={index} className="address-section">
                  <h3>Other Address</h3>
                  <div
                    style={{
                      marginBottom: "15px",
                      fontWeight: "400",
                      color: "black",
                    }}
                    className="address-card"
                  >
                    <p className="name">{address.name}</p>
                    <p className="phone">{address.phone}</p>
                    <p style={{ marginBottom: "15px" }} className="address">
                      Address Line 1: {address.addressLine1}, <br />
                      Address Line 2: {address.addressLine2}, <br />
                      City: {address.city}, State: {address.state}, Zip/Postal
                      Code: {address.zipCode}, <br />
                      Country: {address.country}, <br />
                      Address Type: {address.addressType}
                    </p>
                    <div className="button-container">
                      <button
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          backgroundColor: "#3B3B3B",
                          padding: "10px 35px",
                          color: "white",
                          marginTop: "15px",
                        }}
                        className="edit-btn"
                        onClick={() => handleEditAddress(index)}
                      >
                        EDIT
                      </button>
                      <button
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          backgroundColor: "#3B3B3B",
                          padding: "10px 35px",
                          color: "white",
                          marginTop: "15px",
                        }}
                        className="remove-btn"
                        onClick={() => handleRemoveAddress(index)}
                      >
                        REMOVE
                      </button>
                      <button
                        style={{
                          fontFamily: "Montserrat, sans-serif",
                          backgroundColor: "#FFFF",
                          padding: "10px 35px",
                          color: "black",
                        }}
                        className="default-btn"
                        onClick={() => handleMakeDefault(index)}
                      >
                        Make as default address
                      </button>
                    </div>
                  </div>
                </div>
              )
          )}

          {/* Conditionally render the AddressForm */}
          {isFormOpen && <AddressForm onClose={handleCloseForm} />}

          {/* Conditionally render the EditAddressForm */}
        </div>
      </div>
    </>
  );
};

export default AddressComponent;
