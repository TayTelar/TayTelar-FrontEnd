import { useState } from "react";
import "../../assets/affiliated/sass/dashboard/_dashboard.scss";
import Widgets from "../../components/affiliated/dashboard/Widgets";
import Report from "../../components/affiliated/dashboard/Report";
import Table from "../../components/affiliated/dashboard/Table";
import DashboardCard from "../../components/affiliated/dashboard/DashboardCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import Slider from "../../components/affiliated/dashboard/Slider";

type DropdownOption = "Select" | "Weekly" | "Monthly";

const Dashboard: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] =
    useState<DropdownOption>("Select");

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option: DropdownOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <>
    <div className="dashboard-container">
      <div className="dropdown">
        <button className="dropdown-button" onClick={toggleDropdown}>
          {selectedOption} <FontAwesomeIcon icon={faCaretDown} />
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            <div
              className="dropdown-item"
              onClick={() => handleOptionClick("Weekly")}
            >
              Weekly
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleOptionClick("Monthly")}
            >
              Monthly
            </div>
          </div>
        )}
      </div>
      <div className="widgets">
        <Widgets />
      </div>
      <div className="report-loyalty-stats-container">
        <div className="report">
          <Report />
        </div>
        <div className="loyalty-stats-container">
          <DashboardCard
            type="loyalty"
            title="Available Loyalty Points"
            value="3000 Points"
          />
          <DashboardCard
            type="statistics"
            title="Total Number of Referrals"
            value="300 Customers"
          />
          <DashboardCard
            type="sales"
            title="Total sales value"
            value="Rs. 5000"
          />
        </div>
      </div>
      <div className="table">
        <Table />
      </div>
    </div>
       <div className="slider">
       <Slider />
     </div>
   </>
  );
};

export default Dashboard;
