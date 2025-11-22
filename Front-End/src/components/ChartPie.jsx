import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Completed", value: 60 },
  { name: "In Progress", value: 30 },
  { name: "Pending", value: 10 },
];

const COLORS = ["#22c55e", "#3b82f6", "#f97316"];

export default function ChartPie() {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-72">
      <h2 className="text-lg font-semibold mb-3">Task Status</h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
