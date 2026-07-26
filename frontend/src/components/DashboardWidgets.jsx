import {
  FaClock,
  FaCalendarAlt,
  FaDatabase,
  FaUserShield,
} from "react-icons/fa";

function DashboardWidgets() {

  const admin = JSON.parse(localStorage.getItem("admin"));

  const today = new Date();

  return (

    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-10">

      {/* Current Time */}

      <div className="bg-white shadow-lg rounded-2xl p-6">

        <div className="flex items-center gap-4">

          <FaClock className="text-blue-600 text-3xl" />

          <div>

            <h3 className="font-semibold">Current Time</h3>

            <p className="text-gray-600">
              {today.toLocaleTimeString()}
            </p>

          </div>

        </div>

      </div>

      {/* Today's Date */}

      <div className="bg-white shadow-lg rounded-2xl p-6">

        <div className="flex items-center gap-4">

          <FaCalendarAlt className="text-green-600 text-3xl" />

          <div>

            <h3 className="font-semibold">Today's Date</h3>

            <p className="text-gray-600">
              {today.toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

      {/* Database */}

      <div className="bg-white shadow-lg rounded-2xl p-6">

        <div className="flex items-center gap-4">

          <FaDatabase className="text-purple-600 text-3xl" />

          <div>

            <h3 className="font-semibold">Database</h3>

            <p className="text-green-600 font-bold">
              Connected
            </p>

          </div>

        </div>

      </div>

      {/* Logged In Admin */}

      <div className="bg-white shadow-lg rounded-2xl p-6">

        <div className="flex items-center gap-4">

          <FaUserShield className="text-orange-600 text-3xl" />

          <div>

            <h3 className="font-semibold">Logged In</h3>

            <p className="text-gray-600">
              {admin?.username || "Admin"}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default DashboardWidgets;