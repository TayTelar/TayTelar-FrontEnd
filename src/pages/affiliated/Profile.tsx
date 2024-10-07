import { useState, ChangeEvent } from 'react';
import "../../assets/affiliated/sass/profile/_profile.scss";
import { BsPersonFill } from "react-icons/bs";

interface FormData {
  name: string;
  email: string;
  gender: string;
  mobile: string;
  alternate: string;
  birthday: string;
}

const Profile = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: "Kavya Shree",
    email: "kavya@gmail.com",
    gender: "Female",
    mobile: "7019941358",
    alternate: "9887654125",
    birthday: "20 August 1997"
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <BsPersonFill size={90} className="icon" />
        </div>
        {!isEditing ? (
          <button className="edit-profile-btn" onClick={handleEditClick}>
            EDIT PROFILE
          </button>
        ) : (
          <div className="edit-profile-actions">
            <button className="save-btn" onClick={handleSaveClick}>
              SAVE PROFILE
            </button>
          </div>
        )}
      </div>
      <div className="profile-details">
        <div className="profile-row">
          <div className="profile-field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-field">
            <label>Gender</label>
            <input
              type="text"
              name="gender"
              value={formData.gender}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="profile-row">
          <div className="profile-field">
            <label>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-field">
            <label>Alternate Number</label>
            <input
              type="text"
              name="alternate"
              value={formData.alternate}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="profile-field">
            <label>Birthday</label>
            <input
              type="text"
              name="birthday"
              value={formData.birthday}
              readOnly={!isEditing}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
