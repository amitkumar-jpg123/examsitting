import {
  FaUserGraduate,
  FaUniversity,
  FaBook,
  FaUserTie,
  FaChair,
} from "react-icons/fa";

function RecentActivities({ dashboard }) {

  const activities = [

    {
      title: "Students Registered",
      value: dashboard.totalStudents,
      icon: <FaUserGraduate />,
      color: "text-blue-600",
      bg: "bg-blue-100",
      time: "Just Now",
    },

    {
      title: "Rooms Available",
      value: dashboard.totalRooms,
      icon: <FaUniversity />,
      color: "text-green-600",
      bg: "bg-green-100",
      time: "2 Min Ago",
    },

    {
      title: "Exams Scheduled",
      value: dashboard.totalExams,
      icon: <FaBook />,
      color: "text-purple-600",
      bg: "bg-purple-100",
      time: "5 Min Ago",
    },

    {
      title: "Invigilators",
      value: dashboard.totalInvigilators,
      icon: <FaUserTie />,
      color: "text-orange-600",
      bg: "bg-orange-100",
      time: "10 Min Ago",
    },

    {
      title: "Seating Generated",
      value: dashboard.totalSeating,
      icon: <FaChair />,
      color: "text-red-600",
      bg: "bg-red-100",
      time: "Today",
    },

  ];

  return (

    <div className="bg-white rounded-2xl shadow-lg p-8">

      <h2 className="text-3xl font-bold text-blue-900">
        Recent Activities
      </h2>

      <p className="text-gray-500 mt-2 mb-8">
        Latest updates from your Examination Seating System
      </p>

      <div className="space-y-5">

        {activities.map((item, index) => (

          <div
            key={index}
            className="flex items-center justify-between border-l-4 border-blue-600 rounded-xl p-5 bg-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
          >

            <div className="flex items-center gap-4">

              <div
                className={`${item.bg} ${item.color} p-4 rounded-full text-2xl`}
              >
                {item.icon}
              </div>

              <div>

                <h3 className="font-bold text-lg text-gray-800">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm">
                  Latest System Information
                </p>

              </div>

            </div>

            <div className="text-right">

              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-lg">
                {item.value}
              </span>

              <p className="text-xs text-gray-400 mt-2">
                {item.time}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default RecentActivities;