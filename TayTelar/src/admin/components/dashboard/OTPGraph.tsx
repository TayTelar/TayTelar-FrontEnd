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
  { day: "Day 1", Twilio: 1.5, Nexmo: 2.0, SNS: 1.0 },
  { day: "Day 2", Twilio: 1.2, Nexmo: 1.8, SNS: 1.5 },
  { day: "Day 3", Twilio: 1.3, Nexmo: 1.5, SNS: 2.1 },
  { day: "Day 4", Twilio: 1.1, Nexmo: 1.4, SNS: 1.8 },
  { day: "Day 5", Twilio: 0.9, Nexmo: 1.3, SNS: 1.2 },
];

const OTPGraph = () => {
  return (
    <div className="trends">
      <p className="__header__">OTP Service Provider Graph</p>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis
            label={{ angle: -90, position: "insideLeft" }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value) => [`${value} s`, "Average Time Taken"]}
            contentStyle={{ fontSize: 12 }}
          />
          <Legend wrapperStyle={{ fontSize: 14 }} />
          <Line type="monotone" dataKey="Twilio" stroke="#8884d8" />
          <Line type="monotone" dataKey="Nexmo" stroke="#82ca9d" />
          <Line type="monotone" dataKey="SNS" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OTPGraph;
