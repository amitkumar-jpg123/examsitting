import { useNavigate } from "react-router-dom";

function DashboardCard({
  title,
  total,
  icon,
  color,
  path,
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className={`${color} text-white rounded-2xl shadow-lg p-6 cursor-pointer hover:scale-105 transition-all duration-300`}
    >
      <div className="flex justify-between items-center">

        <div>

          <h3 className="text-lg font-semibold">
            {title}
          </h3>

          <h1 className="text-4xl font-bold mt-3">
            {total}
          </h1>

        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

      <button className="mt-6 bg-white text-gray-800 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
        View Details
      </button>

    </div>
  );
}

export default DashboardCard;