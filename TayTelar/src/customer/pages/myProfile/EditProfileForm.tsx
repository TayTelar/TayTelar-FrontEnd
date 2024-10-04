import React, { useState } from 'react';
import '../../assets/sass/pages/_editProfileForm.scss';

interface EditProfileFormProps {
  userData: {
    name: string;
    email: string;
    gender: string;
    mobileNumber: string;
    alternateNumber: string;
    birthday: string;
  };
  onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({ userData, onClose }) => {
  const [formData, setFormData] = useState(userData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = () => {
    console.log('Profile updated:', formData);
    // Perform the update logic here (e.g., API call)
    onClose(); // Close the form after editing
  };

  return (
    <div className="edit-profile-modal">
      <div className="modal-content">
        <h3>Edit Profile</h3>
        <div className="info-row">
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="gender">Gender</label>
            <input id="gender" name="gender" type="text" value={formData.gender} onChange={handleChange} />
          </div>
        </div>
        <div className="info-row">
          <div className="input-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input id="mobile" name="mobileNumber" type="text" value={formData.mobileNumber} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="alt-mobile">Alternate Number</label>
            <input id="alt-mobile" name="alternateNumber" type="text" value={formData.alternateNumber} onChange={handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="birthday">Birthday</label>
            <input id="birthday" name="birthday" type="date" value={formData.birthday} onChange={handleChange} />
          </div>
        </div>
        <div className="button-row">
          <button 
           style={{
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: "#3B3B3B",
            border: "none",
            padding: "10px 35px",
        }}
          
          onClick={onClose} className="cancel">Cancel</button>
          <button
          style={{
            fontFamily: 'Montserrat, sans-serif',
            backgroundColor: "#3B3B3B",
            border: "none",
            padding: "10px 35px",
        }}
          
          onClick={handleEdit} className="edit">Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
