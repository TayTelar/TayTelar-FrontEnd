import { useState } from "react";
import AddHomeIcon from "@mui/icons-material/AddHome";
import DevicesIcon from "@mui/icons-material/Devices";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Modal from "@mui/material/Modal";
import "../../assets/sass/pages/_checkout.scss";

const AddressList = ({ addresses = [], onRemove, onProceed, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const getAddressTypeIcon = (addressType) => {
    switch (addressType) {
      case "HOME":
        return <AddHomeIcon />;
      case "WORK":
        return <DevicesIcon />;
      case "OTHERS":
        return <AppRegistrationIcon />;
      default:
        return null;
    }
  };

  const handleEdit = (address, index) => {
    setCurrentAddress({ ...address, index });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (currentAddress) {
      onSave(currentAddress.index, currentAddress);
      setIsEditing(false);
    }
  };

  return (
    <div className="address-list">
      {addresses.length > 0 && (
        <>
          <ul>
            {addresses.map((address, index) => (
              <li key={index} className="address-item">
                <div className="address-info">
                  <div className="name_icon">
                    <span>{address.name}</span>
                    <span className="address-icon">
                      {getAddressTypeIcon(address.addressType)}
                    </span>
                  </div>
                  <span>{address.addressLine1}</span>
                  <span>{address.addressLine2}</span>
                  <span>
                    {address.city}, {address.state} - {address.pinCode}
                  </span>
                  <span>{address.mobileNumber}</span>
                </div>
                <div className="address-actions">
                  <button
                    onClick={() => handleEdit(address, index)}
                    aria-label="Edit address"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onRemove(index)}
                    aria-label="Remove address"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="bottom">
            <button
              className="deliver_here_button"
              onClick={onProceed}
              aria-label="Deliver here"
            >
              Deliver Here
            </button>
          </div>
        </>
      )}

      <Modal open={isEditing} onClose={() => setIsEditing(false)}>
        <div className="modal-content">
          {currentAddress && (
            <form>
              <div className="form-row">
                <div>
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={currentAddress.name}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="addressLine1">
                    Flat, House no., Building, Company, Apartment
                  </label>
                  <input
                    id="addressLine1"
                    type="text"
                    value={currentAddress.addressLine1}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        addressLine1: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="addressLine2">
                    Area, Colony, Street, Sector, Village
                  </label>
                  <input
                    id="addressLine2"
                    type="text"
                    value={currentAddress.addressLine2}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        addressLine2: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    type="text"
                    value={currentAddress.city}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    type="text"
                    value={currentAddress.state}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        state: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="pinCode">Pin Code</label>
                  <input
                    id="pinCode"
                    type="text"
                    value={currentAddress.pinCode}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        pinCode: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div>
                  <label htmlFor="mobileNumber">Mobile Number</label>
                  <input
                    id="mobileNumber"
                    type="text"
                    value={currentAddress.mobileNumber}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label htmlFor="addressType">Address Type</label>
                  <input
                    id="addressType"
                    type="text"
                    value={currentAddress.addressType}
                    onChange={(e) =>
                      setCurrentAddress({
                        ...currentAddress,
                        addressType: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  onClick={handleSave}
                  aria-label="Save address"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  aria-label="Cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default AddressList;
