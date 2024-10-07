import { useState } from "react";
import AddProduct from "./AddProduct";
import ShowProduct from "./ShowProduct";
import "../../../assets/admin/scss/_management.scss"; 

const Management = () => {
  const [activeTab, setActiveTab] = useState("showProducts");

  const renderContent = () => {
    switch (activeTab) {
      case "addProduct":
        return <AddProduct />;
      case "showProducts":
      default:
        return <ShowProduct />;
    }
  };

  return (
    <div>
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === "addProduct" ? "active" : ""}`}
          onClick={() => setActiveTab("addProduct")}
        >
          Add Products
        </div>
        <div
          className={`tab ${activeTab === "showProducts" ? "active" : ""}`}
          onClick={() => setActiveTab("showProducts")}
        >
          Show Products
        </div>
      </div>
      <div className="tab-content">{renderContent()}</div>
    </div>
  );
};

export default Management;
