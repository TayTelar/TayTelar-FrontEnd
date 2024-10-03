import React, { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import EditProfileForm from "./EditProfileForm";
import AddressComponent from "./AddressComponent"; // Import the AddressComponent
import "../../assets/sass/pages/_myProfile.scss";

interface UserData {
  name: string;
  email: string;
  gender: string;
  mobileNumber: string;
  alternateNumber: string;
  birthday: string;
}

const MyProfile: React.FC = () => {
  const [userData] = useState<UserData>({
    name: "Jayanth",
    email: "jayanth.m003@gmail.com",
    gender: "Male",
    mobileNumber: "6362815412",
    alternateNumber: "98-765-4321",
    birthday: "1990-01-01",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isAddressComponentOpen, setIsAddressComponentOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setIsEditing(false);
  };

  const handleSaveAddress = () => {
    setIsAddressComponentOpen(true); // Open the AddressComponent when Save Address is clicked
  };

  return (
    <div className="profile-container">
      <div style={{padding:"20px"}} > <div className="profile-box">
        <div className="profile-icon">
          <PersonIcon fontSize="large" style={{ color: "white" }} />
        </div>
        <button
          style={{ fontFamily: "Montserrat, sans-serif", }}
          className="edit-profile-btn"
          onClick={handleEditProfile}
        >
          EDIT PROFILE
        </button>
      </div></div>
     

      <div className="info-box">
        <div className="info-row">
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              value={userData.name}
              readOnly
            />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              value={userData.email}
              readOnly
            />
          </div>
          <div className="input-field">
            <label htmlFor="gender">Gender</label>
            <input
              id="gender"
              type="text"
              placeholder="Enter Gender"
              value={userData.gender}
              readOnly
            />
          </div>
        </div>
        <div className="info-row">
          <div className="input-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              type="text"
              placeholder="Enter Mobile Number"
              value={userData.mobileNumber}
              readOnly
            />
          </div>
          <div className="input-field">
            <label htmlFor="alt-mobile">Alternate Number</label>
            <input
              id="alt-mobile"
              type="text"
              placeholder="Enter Alternate Number"
              value={userData.alternateNumber}
              readOnly
            />
          </div>
          <div className="input-field">
            <label htmlFor="birthday">Birthday</label>
            <input
              id="birthday"
              type="date"
              value={userData.birthday}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="loyalty-address-box">
        <div className="loyalty-points-box">
          <h3
          style={{
            font: "Montserrat, sans-serif",
            fontSize:'16px',
          }}>
            <StarIcon  style={{ verticalAlign: 'middle',fontSize: '18px' }} /> Loyalty Points
          </h3>
          <div className="points-row">
            <span style={{ display: 'inline-block', marginBottom: '15px' }}>Available - 1000 points</span>
            <span style={{ display: 'inline-block', marginBottom: '15px' }}>Used - 500 points</span>
          </div>
        </div>

        <div className="save-address-box">
          <button
            style={{
              font: "Montserrat, sans-serif",
              marginLeft:"60px"
            }}
            className="save-address-btn"
            onClick={handleSaveAddress} // Trigger opening of AddressComponent
          >
            <h3
             style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize:'16px',
              marginBottom:'8px',
            }}>
              <HomeIcon style={{ verticalAlign: 'middle',fontSize: '18px' }}  /> Save Address
            </h3>
          </button>




          <span style={{ display: 'inline-block', marginTop: '2px' }}>Save your address for an effortless checkout</span>

        </div>
      </div>

      {/* New section for AddressComponent */}
      <div className="address-section">
        {isAddressComponentOpen && <AddressComponent setIsAddressComponentOpen={setIsAddressComponentOpen}  />}
      </div>

      {/* Conditional Rendering of Edit Profile Form */}
      {isEditing && (
        <EditProfileForm userData={userData} onClose={handleCloseForm} />
      )}
    </div>
  );
};

export default MyProfile;
