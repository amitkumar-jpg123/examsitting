import {
  FaHome,
  FaUsers,
  FaBook,
  FaUniversity,
  FaUserTie,
  FaChair,
  FaEye,
  FaChartBar,
  FaSignOutAlt,
  FaUserShield,
} from "react-icons/fa";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar({ closeSidebar }) {

  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("admin");

    if (closeSidebar) {
      closeSidebar();
    }

    navigate("/admin-login");
  };

  const menus = [
    {
      name: "Dashboard",
      icon: <FaHome />,
      path: "/admin-dashboard",
    },
    {
      name: "Admins",
      icon: <FaUserShield />,
      path: "/admins",
    },
    {
      name: "Students",
      icon: <FaUsers />,
      path: "/students",
    },
    {
      name: "Exams",
      icon: <FaBook />,
      path: "/exams",
    },
    {
      name: "Rooms",
      icon: <FaUniversity />,
      path: "/rooms",
    },
    {
      name: "Invigilators",
      icon: <FaUserTie />,
      path: "/invigilators",
    },
    {
      name: "Generate Seating",
      icon: <FaChair />,
      path: "/generate-seating",
    },
    {
      name: "View Seating",
      icon: <FaEye />,
      path: "/view-seating",
    },
    {
      name: "Reports",
      icon: <FaChartBar />,
      path: "/reports",
    },
  ];

  return (
    <div
      className="
      w-72
      h-full
      flex
      flex-col
      bg-[#0A2A66]
      dark:bg-gray-950
      text-white
      shadow-2xl
      transition-all
      duration-300
      "
    >
      {/* Profile */}

      <div
        className="
        text-center
        py-6
        border-b
        border-blue-700
        dark:border-gray-700
        px-4
        "
      >
        {admin?.profileImage ? (
          <img
            src={`https://examsitting.onrender.com/uploads/${admin.profileImage}`}
            alt="Profile"
            className="
            w-20
            h-20
            rounded-full
            object-cover
            border-4
            border-white
            mx-auto
            transition
            duration-300
            hover:scale-105
            "
          />
        ) : (
          <div
            className="
            w-20
            h-20
            rounded-full
            bg-white
            text-blue-900
            flex
            items-center
            justify-center
            text-3xl
            font-bold
            mx-auto
            "
          >
            A
          </div>
        )}

        <h2 className="text-xl font-bold mt-4">
          {admin?.username || "Admin"}
        </h2>

        <p className="text-blue-200 text-sm">
          Administrator
        </p>
      </div>

      {/* Menu */}

      <div
        className="
        flex-1
        overflow-y-auto
        py-4
        "
      >
        {menus.map((menu, index) => (
          <NavLink
            key={index}
            to={menu.path}
            onClick={() => {
              if (closeSidebar) {
                closeSidebar();
              }
            }}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-4
              px-6
              py-4
              text-lg
              transition-all
              duration-300

              ${
                isActive
                  ? "bg-green-600 border-r-4 border-white"
                  : "hover:bg-blue-800"
              }
              `
            }
          >
            <span className="text-2xl">
              {menu.icon}
            </span>

            <span>{menu.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}

      <div
        className="
        p-5
        border-t
        border-blue-700
        dark:border-gray-700
        "
      >
        <button
          onClick={handleLogout}
          className="
          w-full
          bg-red-600
          hover:bg-red-700
          py-3
          rounded-lg
          flex
          justify-center
          items-center
          gap-3
          font-semibold
          transition-all
          duration-300
          "
        >
          <FaSignOutAlt />

          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;