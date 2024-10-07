import "../../../assets/affiliated/sass/dashboard/_widgets.scss";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { FaInbox } from "react-icons/fa6";
import { IoBarChartOutline } from "react-icons/io5";

const widgetsData = [
  {
    id: 1,
    header: "Earnings",
    value: "Rs. 4,500",
    icon: <TbCoinRupeeFilled />,
    percentage: "+12%",
    change: "increase",
  },
  {
    id: 2,
    header: "Orders",
    value: "1,250",
    icon: <FaInbox />,
    percentage: "-8%",
    change: "decrease",
  },
  {
    id: 3,
    header: "Traffic",
    value: "75,000",
    icon: <IoBarChartOutline />,
    percentage: "+20%",
    change: "increase",
  },
];

const Widgets = () => {
  return (
    <div className="widgets-container">
      {widgetsData.map((widget) => (
        <div key={widget.id} className="widget">
          <div className="widget-content">
            <div className="widget-header">{widget.header}</div>
            <div className="widget-value">{widget.value}</div>
          </div>
          <div className="widget-info">
            <div className="widget-icon">{widget.icon}</div>
            <div className={`widget-percentage ${widget.change}`}>
              {widget.percentage}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Widgets;
