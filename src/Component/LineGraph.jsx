/* eslint-disable react/prop-types */

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const LineGraph = ({ data: { labels, values } }) => {
  return (
    <ResponsiveContainer width="100%" height={200} className={"w-full"}>
      <LineChart
        data={
          labels.map((label, index) => ({
            month: label,
            score: values[index],
          })) || []
        }
        margin={{ top: 30, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
        <XAxis dataKey="month" stroke="#a0aec0" />
        <YAxis domain={[0, 100]} stroke="#a0aec0" />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#4299e1"
          strokeWidth={2}
          label={<CustomizedLabel />}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;

const CustomizedLabel = ({ x, y, value }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect
        x="-12"
        y="-25"
        width="24"
        height="20"
        fill="#2D3748"
        rx="4"
        ry="4"
      />
      <text
        x="0"
        y="-10"
        fill="#A0AEC0"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};
