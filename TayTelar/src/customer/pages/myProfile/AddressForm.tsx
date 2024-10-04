    import React, { useState } from "react";
    import { useNavigate } from "react-router-dom";
    import "../../assets/sass/pages/_addressForm.scss"; // Import your styles

    // Define the shape of the form data
    interface FormData {
    name: string;
    mobileNumber: string;
    addressLine1: string;
    addressLine2?: string; // Optional field
    city: string;
    state: string;
    zipCode: string;
    country: string;
    addressType: "HOME" | "WORK" | "OTHER"; // Enum-like type for addressType
    isDefault: boolean;
    }

    // Define the shape of the errors
    interface Errors {
    name?: string;
    mobileNumber?: string;
    addressLine1?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
    }

    // Define the props for AddressForm
    interface AddressFormProps {
    onClose: () => void; // Add the onClose prop
    }

    const AddressForm: React.FC<AddressFormProps> = ({ onClose }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        name: "",
        mobileNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        addressType: "HOME",
        isDefault: false,
    });

    const [errors, setErrors] = useState<Errors>({});

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, type, value } = e.target as
        | HTMLInputElement
        | HTMLSelectElement;
        const checked =
        type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

        setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = (): Errors => {
        const newErrors: Errors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.mobileNumber)
        newErrors.mobileNumber = "Mobile number is required";
        if (!formData.addressLine1)
        newErrors.addressLine1 = "Address Line 1 is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zipCode) newErrors.zipCode = "Zip/Postal Code is required";
        if (!formData.country) newErrors.country = "Country is required";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
        const existingAddresses: FormData[] = JSON.parse(
            localStorage.getItem("addresses") || "[]"
        );

        if (formData.isDefault) {
            existingAddresses.forEach((addr) => (addr.isDefault = false));
        }

        const updatedAddresses = [...existingAddresses, formData];
        localStorage.setItem("addresses", JSON.stringify(updatedAddresses));

        navigate("/address-manager");

        // Reset form data after successful submission
        setFormData({
            name: "",
            mobileNumber: "",
            addressLine1: "",
            addressLine2: "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
            addressType: "HOME",
            isDefault: false,
        });

        onClose(); // Call onClose to close the form
        } else {
        setErrors(newErrors);
        }
    };

    return (
        <div
        style={{
            position: "fixed",
            top: "50%",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
            display: "flex",
            justifyContent: "center", 
            alignItems: "center",
            zIndex: 1000,
        }}
        className="address-form-container"
        >
        <form className="address-form" onSubmit={handleSubmit}>
            <div
            style={{
                backgroundColor: "white",
                padding: "20px",
                transform: "translateX(100%)",
                borderRadius: "10px",
                width: "100%",
                position: "absolute",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
                display: "flex", alignItems: "center", gap: 10   
            }}
            
            >
            <label>
                Name
                <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                />
                {errors.name && (
                <span className="error-message">{errors.name}</span>
                )}
            </label>

            <label>
                Mobile Number
                <input
                name="mobileNumber"
                type="text"
                value={formData.mobileNumber}
                onChange={handleChange}
                />
                {errors.mobileNumber && (
                <span className="error-message">{errors.mobileNumber}</span>
                )}
            </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <label>
                Address Line 1
                <input
                name="addressLine1"
                type="text"
                value={formData.addressLine1}
                onChange={handleChange}
                />
                {errors.addressLine1 && (
                <span className="error-message">{errors.addressLine1}</span>
                )}
            </label>

            <label>
                Address Line 2 (optional)
                <input
                name="addressLine2"
                type="text"
                value={formData.addressLine2}
                onChange={handleChange}
                />
            </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {" "}
            <label>
                City
                <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                />
                {errors.city && (
                <span className="error-message">{errors.city}</span>
                )}
            </label>
            <label>
                State
                <input
                name="state"
                type="text"
                value={formData.state}
                onChange={handleChange}
                />
                {errors.state && (
                <span className="error-message">{errors.state}</span>
                )}
            </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {" "}
            <label>
                Zip/Postal Code
                <input
                name="zipCode"
                type="text"
                value={formData.zipCode}
                onChange={handleChange}
                />
                {errors.zipCode && (
                <span className="error-message">{errors.zipCode}</span>
                )}
            </label>
            <label>
                Country
                <input
                name="country"
                type="text"
                value={formData.country}
                onChange={handleChange}
                />
                {errors.country && (
                <span className="error-message">{errors.country}</span>
                )}
            </label>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {" "}
            <label>
                Address Type
                <select
                name="addressType"
                value={formData.addressType}
                onChange={handleChange}
                >
                <option value="HOME">Home</option>
                <option value="WORK">Work</option>
                <option value="OTHER">Other</option>
                </select>
            </label>
            <label
                style={{ display: "flex", alignItems: "center", marginTop: "10px" }}
            >
                <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleChange}
                style={{ marginRight: "8px" }}
                />
                Set as default address
            </label>
           
            </div>

            <div className="form-actions">
            <button
                style={{
                font: "Montserrat, sans-serif",
                backgroundColor: "#3B3B3B",
                padding: "10px 35px",
                color: "white",
                marginTop: "15px",
                borderRadius: "0",
                border: "none",
                }}
                type="submit"
                className="submit-button"
            >
                Add
            </button>
            <button
                style={{
                fontFamily: "Montserrat, sans-serif",
                backgroundColor: "#3B3B3B",
                padding: "10px 35px",
                color: "white",
                borderRadius: "0",
                marginTop: "15px",
                border: "none",
                }}
                type="button"
                className="cancel-button"
                onClick={onClose}
            >
                Cancel
            </button>
            </div>
        </form>
        </div>
    );
    };

    export default AddressForm;
