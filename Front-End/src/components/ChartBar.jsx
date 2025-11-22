import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", tasks: 30 },
  { name: "Feb", tasks: 45 },
  { name: "Mar", tasks: 20 },
  { name: "Apr", tasks: 60 },
];

export default function ChartBar() {
  return (
    <div className="bg-white p-4 rounded-lg shadow h-72">
      <h2 className="text-lg font-semibold mb-3">Tasks Overview</h2>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="tasks" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
