import React, { useState } from "react";
import "../../../assets/admin/scss/_dashboard.scss";
import { GrMoney } from "react-icons/gr";
import { VscFeedback } from "react-icons/vsc";
import { LiaMoneyCheckSolid } from "react-icons/lia";
import { FaCaretDown } from "react-icons/fa";
import Widgets from "../../../components/admin/dashboard/Widgets";
import { BsFillPeopleFill } from "react-icons/bs";
import LineGraph from "../../../components/admin/dashboard/LineGraph";
import OTPGraph from "../../../components/admin/dashboard/OTPGraph";
import AffiliatedUsers from "../../../components/admin/dashboard/AffiliatedUsers";
import TopProducts from "../../../components/admin/dashboard/TopProducts";

const AdminDashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("Weekly");
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setTimeframe(value);
    setIsOpen(false);
  };

  const widgetData = [
    {
      title: "Total Brand Sales",
      icon: <GrMoney />,
      value: "250 Orders",
      percentage: "20%",
      isPositive: true,
    },
    {
      title: "Total Traffic",
      icon: <BsFillPeopleFill />,
      value: "300 Visitors",
      percentage: "-10%",
      isPositive: false,
    },
    {
      title: "Customer Feedback",
      icon: <VscFeedback />,
      value: "4.5 Stars",
      percentage: "20%",
      isPositive: true,
    },
    {
      title: "Total Sales",
      icon: <LiaMoneyCheckSolid />,
      value: "300 Visitors",
      percentage: "-10%",
      isPositive: false,
    },
  ];

  return (
    <div className="dashboard">
      <p className="main__header">Dashboard</p>
      <div className="custom-dropdown">
        <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
          {timeframe}
          <FaCaretDown className="arrow-icon" />
        </div>
        {isOpen && (
          <div className="dropdown-list">
            <div
              className="dropdown-item"
              onClick={() => handleSelect("Weekly")}
            >
              Weekly
            </div>
            <div
              className="dropdown-item"
              onClick={() => handleSelect("Monthly")}
            >
              Monthly
            </div>
          </div>
        )}
      </div>
      <div className="__widget__container">
        <Widgets widgets={widgetData} />
      </div>
      <div className="_graph__top_container">
        <div className="graph-row">
          <div className="line-graph-container">
            <LineGraph />
          </div>
          <div className="affiliated-users-container">
            <AffiliatedUsers />
          </div>
        </div>
      </div>
      <div className="_graph__top_container">
        <div className="graph-row">
          <div className="line-graph-container">
          <OTPGraph />
          </div>
          <div className="affiliated-users-container">
            <TopProducts />

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
