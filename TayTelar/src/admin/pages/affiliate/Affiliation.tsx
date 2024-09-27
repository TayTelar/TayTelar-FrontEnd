import "../../assets/scss/_affiliate.scss";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import WeeklyOrdersChart from "../../components/affiliate/WeeklyOrdersChart";
import DataTable from "./DataTable";
import Average from "./Average";

const Affiliation: React.FC = () => {
  const [affiliate, setAffiliate] = useState<string>("Myntra");
  const [timeframe, setTimeframe] = useState<string>("Weekly");
  const [isAffiliateOpen, setIsAffiliateOpen] = useState<boolean>(false);
  const [isTimeframeOpen, setIsTimeframeOpen] = useState<boolean>(false);

  const handleAffiliateSelect = (value: string): void => {
    setAffiliate(value);
    setIsAffiliateOpen(false);
  };

  const handleTimeframeSelect = (value: string): void => {
    setTimeframe(value);
    setIsTimeframeOpen(false);
  };

  return (
    <div className="affiliate__container">
      <p className="main__header">Affiliated Users</p>

      <div className="actionbuttons">
        {/* Affiliate Dropdown */}
        <div className="custom-dropdown">
          <div
            className="dropdown-header"
            onClick={() => setIsAffiliateOpen(!isAffiliateOpen)}
          >
            {affiliate}
            <FaCaretDown
              className="arrow-icon"
              style={{
                transform: isAffiliateOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
          {isAffiliateOpen && (
            <div className="dropdown-list">
              <div
                className="dropdown-item"
                onClick={() => handleAffiliateSelect("Myntra")}
              >
                Myntra
              </div>
              <div
                className="dropdown-item"
                onClick={() => handleAffiliateSelect("Flipkart")}
              >
                Flipkart
              </div>
              <div
                className="dropdown-item"
                onClick={() => handleAffiliateSelect("Amazon")}
              >
                Amazon
              </div>
            </div>
          )}
        </div>

        {/* Timeframe Dropdown */}
        <div className="custom-dropdown">
          <div
            className="dropdown-header timeframe"
            onClick={() => setIsTimeframeOpen(!isTimeframeOpen)}
          >
            {timeframe}
            <FaCaretDown
              className="secondary"
              style={{
                transform: isTimeframeOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
          {isTimeframeOpen && (
            <div className="dropdown-list">
              <div
                className="dropdown-item"
                onClick={() => handleTimeframeSelect("Weekly")}
              >
                Weekly
              </div>
              <div
                className="dropdown-item"
                onClick={() => handleTimeframeSelect("Monthly")}
              >
                Monthly
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <Average />
      </div>
      {/* Chart Component */}
      <div>
        <WeeklyOrdersChart />
      </div>
      <DataTable />
    </div>
  );
};

export default Affiliation;
