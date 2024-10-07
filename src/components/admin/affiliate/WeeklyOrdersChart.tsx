import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    Day: "Monday",
    Orders: 10,
    Exchange: 2,
    Cancelled: 1,
    Returns: 0,
    Delivered: 8,
  },
  {
    Day: "Tuesday",
    Orders: 15,
    Exchange: 3,
    Cancelled: 2,
    Returns: 1,
    Delivered: 12,
  },
  {
    Day: "Wednesday",
    Orders: 20,
    Exchange: 5,
    Cancelled: 3,
    Returns: 2,
    Delivered: 15,
  },
  {
    Day: "Thursday",
    Orders: 25,
    Exchange: 4,
    Cancelled: 1,
    Returns: 1,
    Delivered: 20,
  },
  {
    Day: "Friday",
    Orders: 30,
    Exchange: 6,
    Cancelled: 2,
    Returns: 3,
    Delivered: 25,
  },
  {
    Day: "Saturday",
    Orders: 18,
    Exchange: 1,
    Cancelled: 4,
    Returns: 1,
    Delivered: 15,
  },
  {
    Day: "Sunday",
    Orders: 22,
    Exchange: 2,
    Cancelled: 1,
    Returns: 2,
    Delivered: 20,
  },
];

const WeeklyOrdersChart: React.FC = () => {
  return (
    <div className="weekly-orders-chart">
      <p className="sub__header">Weekly Orders Overview</p>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <XAxis dataKey="Day" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip contentStyle={{ fontSize: 12 }} />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Bar dataKey="Orders" fill="#3b3b3b" />
          <Bar dataKey="Exchange" fill="#8b8b8b" />
          <Bar dataKey="Cancelled" fill="#c0c0c0" />
          <Bar dataKey="Returns" fill="#A0A0A0" />
          <Bar dataKey="Delivered" fill="#160101" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WeeklyOrdersChart;
