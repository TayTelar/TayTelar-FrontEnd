import React from "react";
import "../../assets/sass/dashboard/_card.scss";
import { BiSolidOffer } from "react-icons/bi";
import { IoStatsChart } from "react-icons/io5";
import { IoIosListBox } from "react-icons/io";

type DashboardCardProps = {
  type: "loyalty" | "statistics" | "sales";
  title: string;
  value: string;
};

const iconMap = {
  loyalty: <BiSolidOffer className="dashboard-icon" />,
  statistics: <IoStatsChart className="dashboard-icon" />,
  sales: <IoIosListBox className="dashboard-icon" />,
};

const DashboardCard: React.FC<DashboardCardProps> = ({
  type,
  title,
  value,
}) => {
  return (
    <div className="dashboard-card">
      <div className="dashboard-card-header">
        <span>{title}</span>
        {iconMap[type]}
      </div>
      <div className="dashboard-card-body">
        <p className="points">{value}</p>
      </div>
    </div>
  );
};

export default DashboardCard;
