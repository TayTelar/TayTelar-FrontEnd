import { useState } from "react";

interface HomeAddressProps {
  onBookSchedule: () => void;
}

const HomeAddress: React.FC<HomeAddressProps> = ({ onBookSchedule }) => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onBookSchedule();
  };

  return (
    <div className="home__address">
      <p>Enter Your Home Address</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="input-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Flat, House no., Building, Company, Apartment"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Area, Colony, Street, Sector, Village"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            required
          />
        </div>
        <button type="submit">Book Schedule</button>
      </form>
    </div>
  );
};

export default HomeAddress;
