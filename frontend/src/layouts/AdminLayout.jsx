import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function AdminLayout() {
  const [open, setOpen] = useState(false);

  const location = useLocation();

  // Every route change -> sidebar close
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          lg:hidden
          fixed
          top-4
          left-4
          z-[100]
          bg-blue-700
          text-white
          p-3
          rounded-lg
          shadow-lg
        "
      >
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          z-50
          transition-transform
          duration-300
          ease-in-out

          ${open ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        <Sidebar closeSidebar={() => setOpen(false)} />
      </aside>

      {/* Main Area */}
      <div
        className="
          flex-1
          lg:ml-72
          flex
          flex-col
          min-h-screen
        "
      >
        <Navbar />

        <main
          className="
            flex-1
            p-4
            sm:p-6
            lg:p-8
            overflow-x-hidden
          "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;