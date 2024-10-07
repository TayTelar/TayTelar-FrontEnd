import "../../../assets/admin/scss/_average.scss";

const Average = () => {
  return (
    <div className="average__container">
      <div className="__sub__container">
        <span className="label">Total Orders</span>
        <span className="value">250 Orders</span>
      </div>
      <div className="__sub__container">
        <span className="label">Total Sales</span>
        <span className="value">200 Orders</span>
      </div>
      <div className="__sub__container">
        <span className="label">Total Exchange</span>
        <span className="value">5 Orders</span>
      </div>
      <div className="__sub__container">
        <span className="label">Total Cancellation</span>
        <span className="value">10 Orders</span>
      </div>
      <div className="__sub__container">
        <span className="label">Total Returns</span>
        <span className="value">35 Orders</span>
      </div>
    </div>
  );
};

export default Average;
