import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function AssetPieChart({ assets }) {
  const typeTotals = {};

  assets.forEach((asset) => {
    const value = asset.currentPrice * asset.quantity;
    typeTotals[asset.type] = (typeTotals[asset.type] || 0) + value;
  });

  const data = Object.keys(typeTotals).map((type) => ({
    name: type,
    value: typeTotals[type],
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AssetPieChart;
