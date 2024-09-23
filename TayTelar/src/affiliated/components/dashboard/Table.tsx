import React from "react";
import "../../assets/sass/dashboard/_table.scss";

interface TableData {
  day: string;
  sales: string;
  commission: string;
}

const Table: React.FC = () => {
  const data: TableData[] = [
    { day: "Monday", sales: "Rs. 200", commission: "Rs. 20" },
    { day: "Tuesday", sales: "Rs. 200", commission: "Rs. 20" },
    { day: "Wednesday", sales: "Rs. 200", commission: "Rs. 20" },
    { day: "Thursday", sales: "Rs. 200", commission: "Rs. 20" },
    { day: "Friday", sales: "Rs. 200", commission: "Rs. 20" },
  ];

  return (
    <div className="table-container">
      <div className="table-card">
        <div className="table-header">
          <div className="table-header-item">Day</div>
          <div className="table-header-item">Sales Value</div>
          <div className="table-header-item">Commission</div>
        </div>
        <div className="table-body">
          {data.map((item, index) => (
            <div key={index} className="table-row">
              <div className="table-cell">{item.day}</div>
              <div className="table-cell">{item.sales}</div>
              <div className="table-cell">{item.commission}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Table;
