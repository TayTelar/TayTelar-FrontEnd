import "../../assets/scss/_orders.scss";

const ViewOrder = () => {
  return (
    <div className="view-order">
      <p className="main__header">Orders</p>
      <div className="orders">
        <RecentOrder />
        <OrderHistory />
      </div>
    </div>
  );
};

export default ViewOrder;

const RecentOrder = () => {
  const orders = [
    {
      id: "PR123456789",
      customer: "John Doe",
      product: "Product A",
      orderDate: "2024-09-20",
      totalAmount: "$100",
      status: "Progress",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Pending",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Canceled",
    },
    {
      id: "PR123456789",
      customer: "John Doe",
      product: "Product A",
      orderDate: "2024-09-20",
      totalAmount: "$100",
      status: "Progress",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Pending",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Canceled",
    },
  ];

  return (
    <>
      <p className="sub__header">Recent Customer Orders</p>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.orderDate}</td>
              <td>{order.totalAmount}</td>
              <td>
                <span
                  className={`status ${order.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

const OrderHistory = () => {
  const orders = [
    {
      id: "PR123456789",
      customer: "John Doe",
      product: "Product A",
      orderDate: "2024-09-20",
      totalAmount: "$100",
      status: "Progress",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Pending",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Canceled",
    },
    {
      id: "PR123456789",
      customer: "John Doe",
      product: "Product A",
      orderDate: "2024-09-20",
      totalAmount: "$100",
      status: "Progress",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Pending",
    },
    {
      id: "PR123456790",
      customer: "Jane Smith",
      product: "Product B",
      orderDate: "2024-09-21",
      totalAmount: "$200",
      status: "Canceled",
    },
  ];
  return (
    <>
      <p className="sub__header">Order History</p>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Order Date</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer}</td>
              <td>{order.product}</td>
              <td>{order.orderDate}</td>
              <td>{order.totalAmount}</td>
              <td>
                <span
                  className={`status ${order.status
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                >
                  {order.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
