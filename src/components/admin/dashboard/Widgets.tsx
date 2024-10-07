import React from "react";
import "../../../assets/admin/scss/__widgets.scss";
import { FaArrowTrendDown, FaArrowTrendUp } from "react-icons/fa6";

interface WidgetData {
  title: string;
  icon: React.ReactNode;
  value: string;
  percentage: string;
  isPositive: boolean;
}

interface WidgetsProps {
  widgets: WidgetData[];
}

const Widgets: React.FC<WidgetsProps> = ({ widgets }) => {
  return (
    <div className="dashboard">
      <div className="card__container">
        {widgets.map((widget, index) => (
          <div className="card" key={index}>
            <div className="card__header">
              <span>{widget.icon}</span>
              <span className="card__title">{widget.title}</span>
            </div>
            <div className="card__content">
              <p>{widget.value}</p>
              <div className={`card__stat ${widget.isPositive ? "positive" : "negative"}`}>
                <span style={{ color: widget.isPositive ? "green" : "red" }}>
                  {widget.percentage}
                </span>
                {widget.isPositive ? (
                  <FaArrowTrendUp color="green" />
                ) : (
                  <FaArrowTrendDown color="red" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Widgets;
