import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

function StatisticsChart({ summary }) {
  const data = [
    {
      name: "Students",
      Total: summary?.totalStudents || 0,
    },
    {
      name: "Rooms",
      Total: summary?.totalRooms || 0,
    },
    {
      name: "Exams",
      Total: summary?.totalExams || 0,
    },
    {
      name: "Invigilators",
      Total: summary?.totalInvigilators || 0,
    },
  ];

  const COLORS = [
    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#f97316",
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">

      {/* Bar Chart */}

      <div className="bg-white rounded-2xl shadow-xl p-6">

        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          System Statistics
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <BarChart
            data={data}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Bar
              dataKey="Total"
              radius={[10, 10, 0, 0]}
              animationDuration={1000}
            >

              {data.map((item, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      {/* Pie Chart */}

      <div className="bg-white rounded-2xl shadow-xl p-6">

        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          Overall Distribution
        </h2>

        <ResponsiveContainer width="100%" height={350}>

          <PieChart>

            <Pie
              data={data}
              dataKey="Total"
              nameKey="name"
              outerRadius={120}
              innerRadius={60}
              paddingAngle={5}
              label
              animationDuration={1000}
            >

              {data.map((item, index) => (

                <Cell
                  key={index}
                  fill={COLORS[index]}
                />

              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default StatisticsChart;