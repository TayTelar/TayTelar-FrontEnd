/* eslint-disable @typescript-eslint/no-unused-vars */
import "../../assets/sass/pages/_order.scss";
import Breadcrumbs from "../../components/breadcrumb/Breadcrumbs";
import banner from "../../assets/images/order.webp";
import React, { useState} from "react";
import RecentOrder from "./RecentOrder";
import BuyAgain from "./BuyAgain";
import CancelledOrder from "./CancelledOrder";

interface Breadcrumb {
  label: string;
  path?: string;
}

const Orders: React.FC = () => {
  const breadcrumbData: Breadcrumb[] = [
    { label: "Home", path: "/" },
    { label: "My Orders" },
  ];

  const [activeTab, setActiveTab] = useState<string>("recent");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="order-container">
      <div className="header">
        <span>MY ORDERS</span>
        <Breadcrumbs crumbs={breadcrumbData} />
      </div>
      <img src={banner} alt="My Orders Banner" className="order-banner" />
      <div className="section-bar">
        <div
          className={`tab ${activeTab === "recent" ? "active" : ""}`}
          onClick={() => handleTabClick("recent")}
        >
          RECENT ORDERS
        </div>
        <div
          className={`tab ${activeTab === "buy-again" ? "active" : ""}`}
          onClick={() => handleTabClick("buy-again")}
        >
          BUY AGAIN
        </div>
        <div
          className={`tab ${activeTab === "canceled" ? "active" : ""}`}
          onClick={() => handleTabClick("canceled")}
        >
          CANCELED ORDERS
        </div>
      </div>
      <div className="content">
        {activeTab === "recent" && <RecentOrder />}
        {activeTab === "buy-again" && <BuyAgain />}
        {activeTab === "canceled" && <CancelledOrder />}
      </div>
    </div>
  );
};

export default Orders;


