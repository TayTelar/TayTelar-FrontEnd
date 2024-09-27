import "../../assets/scss/_datatable.scss";

const DataTable: React.FC = () => {
  const data = [
    {
      day: "Monday",
      orders: 40,
      exchange: 2,
      cancelled: 1,
      returns: 0,
      delivered: 30,
    },
    {
      day: "Tuesday",
      orders: 45,
      exchange: 3,
      cancelled: 2,
      returns: 1,
      delivered: 35,
    },
    {
      day: "Wednesday",
      orders: 50,
      exchange: 5,
      cancelled: 0,
      returns: 0,
      delivered: 45,
    },
    {
      day: "Thursday",
      orders: 30,
      exchange: 1,
      cancelled: 1,
      returns: 0,
      delivered: 28,
    },
    {
      day: "Friday",
      orders: 60,
      exchange: 4,
      cancelled: 3,
      returns: 2,
      delivered: 51,
    },
    {
      day: "Saturday",
      orders: 25,
      exchange: 0,
      cancelled: 0,
      returns: 1,
      delivered: 20,
    },
    {
      day: "Sunday",
      orders: 70,
      exchange: 6,
      cancelled: 4,
      returns: 3,
      delivered: 62,
    },
  ];

  return (
    <div>
      <p className="sub_header">Total Sales Overview</p>
      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Days</th>
              <th>Orders</th>
              <th>Exchange</th>
              <th>Cancelled</th>
              <th>Returns</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {data.map(
              ({ day, orders, exchange, cancelled, returns, delivered }) => (
                <tr key={day}>
                  <td>{day}</td>
                  <td>{orders}</td>
                  <td>{exchange}</td>
                  <td>{cancelled}</td>
                  <td>{returns}</td>
                  <td>{delivered}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
