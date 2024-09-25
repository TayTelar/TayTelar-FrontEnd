import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../assets/scss/__graphs.scss";

const data = [
  { day: "Day 1", amazon: 50, myntra: 30, flipkart: 20 },
  { day: "Day 2", amazon: 60, myntra: 40, flipkart: 50 },
  { day: "Day 3", amazon: 70, myntra: 50, flipkart: 30 },
  { day: "Day 4", amazon: 80, myntra: 70, flipkart: 60 },
  { day: "Day 5", amazon: 90, myntra: 80, flipkart: 70 },
];

const LineGraph: React.FC = () => {
  return (
    <div className="trends">
      <p className="__header__"> Total Brand Sales Graph</p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis unit="k" tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number) => [`$${value}k`, "Revenue"]}
            contentStyle={{ fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Line type="monotone" dataKey="amazon" stroke="#8884d8" />
          <Line type="monotone" dataKey="myntra" stroke="#82ca9d" />
          <Line type="monotone" dataKey="flipkart" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineGraph;
