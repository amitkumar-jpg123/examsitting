import { useState } from "react";

import {
  FaCog,
  FaSave,
  FaUndo,
} from "react-icons/fa";

import toast from "react-hot-toast";

function Settings() {

  // =====================================
  // Settings State
  // =====================================

  const [settings, setSettings] = useState({

    instituteName: "",

    adminName: "",

    academicSession: "",

    defaultSemester: "",

    examDuration: "",

    autoSeatNumbering: true,

  });

  // =====================================
  // Handle Input Change
  // =====================================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setSettings({

      ...settings,

      [name]:
        type === "checkbox"
          ? checked
          : value,

    });

  };

  // =====================================
  // Save Settings
  // =====================================

  const handleSave = (e) => {

    e.preventDefault();

    localStorage.setItem(
      "examSettings",
      JSON.stringify(settings)
    );

    toast.success(
      "Settings Saved Successfully"
    );

  };

  // =====================================
  // Reset Settings
  // =====================================

  const handleReset = () => {

    setSettings({

      instituteName: "",

      adminName: "",

      academicSession: "",

      defaultSemester: "",

      examDuration: "",

      autoSeatNumbering: true,

    });

    toast.success(
      "Settings Reset Successfully"
    );

  };

    // =====================================
  // Load Saved Settings
  // =====================================

  useEffect(() => {

  const savedSettings = localStorage.getItem("examSettings");

  if (savedSettings) {

    setSettings(JSON.parse(savedSettings));

  }

}, []);

  return (

    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}

      <div className="flex items-center gap-4 mb-8">

        <FaCog
          size={40}
          className="text-blue-900"
        />

        <h1 className="text-4xl font-bold text-blue-900">

          System Settings

        </h1>

      </div>

      {/* Settings Card */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold mb-6">

          General Settings

        </h2>

        <form
          onSubmit={handleSave}
          className="grid md:grid-cols-2 gap-5"
        >

          {/* Institute Name */}

          <div>

            <label className="block font-semibold mb-2">

              Institute Name

            </label>

            <input
              type="text"
              name="instituteName"
              value={settings.instituteName}
              onChange={handleChange}
              placeholder="Enter Institute Name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

          </div>

          {/* Admin Name */}

          <div>

            <label className="block font-semibold mb-2">

              Admin Name

            </label>

            <input
              type="text"
              name="adminName"
              value={settings.adminName}
              onChange={handleChange}
              placeholder="Enter Admin Name"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

          </div>
                    {/* Academic Session */}

          <div>

            <label className="block font-semibold mb-2">

              Academic Session

            </label>

            <input
              type="text"
              name="academicSession"
              value={settings.academicSession}
              onChange={handleChange}
              placeholder="2026-2027"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

          </div>

          {/* Default Semester */}

          <div>

            <label className="block font-semibold mb-2">

              Default Semester

            </label>

            <select
              name="defaultSemester"
              value={settings.defaultSemester}
              onChange={handleChange}
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            >

              <option value="">Select Semester</option>

              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>

            </select>

          </div>

          {/* Default Exam Duration */}

          <div>

            <label className="block font-semibold mb-2">

              Default Exam Duration

            </label>

            <input
              type="number"
              name="examDuration"
              value={settings.examDuration}
              onChange={handleChange}
              placeholder="180 Minutes"
              className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            />

          </div>

          {/* Auto Seat Numbering */}

          <div className="flex items-center gap-4 mt-8">

            <label className="font-semibold">

              Auto Seat Numbering

            </label>

            <input
              type="checkbox"
              name="autoSeatNumbering"
              checked={settings.autoSeatNumbering}
              onChange={handleChange}
              className="w-5 h-5 cursor-pointer"
            />

          </div>
                    {/* Buttons */}

          <div className="col-span-2 flex flex-wrap gap-4 mt-6">

            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition"
            >

              <FaSave />

              Save Settings

            </button>

            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition"
            >

              <FaUndo />

              Reset Settings

            </button>

          </div>

        </form>

      </div>

      {/* Settings Summary */}

      <div className="mt-10 bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-blue-900 mb-6">

          Current Settings

        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <p className="font-semibold text-gray-700">

              Institute Name

            </p>

            <p className="text-blue-900">

              {settings.instituteName || "Not Set"}

            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-700">

              Admin Name

            </p>

            <p className="text-blue-900">

              {settings.adminName || "Not Set"}

            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-700">

              Academic Session

            </p>

            <p className="text-blue-900">

              {settings.academicSession || "Not Set"}

            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-700">

              Default Semester

            </p>

            <p className="text-blue-900">

              {settings.defaultSemester || "Not Set"}

            </p>

          </div>
                    <div>

            <p className="font-semibold text-gray-700">

              Exam Duration

            </p>

            <p className="text-blue-900">

              {settings.examDuration
                ? `${settings.examDuration} Minutes`
                : "Not Set"}

            </p>

          </div>

          <div>

            <p className="font-semibold text-gray-700">

              Auto Seat Numbering

            </p>

            <span
              className={`inline-block px-3 py-1 rounded-full text-white font-semibold
              ${
                settings.autoSeatNumbering
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >

              {settings.autoSeatNumbering
                ? "Enabled"
                : "Disabled"}

            </span>

          </div>

        </div>

        {/* Bottom Info */}

        <div className="mt-8 border-t pt-6">

          <p className="text-gray-500 text-sm">

            These settings will be used as the default configuration
            for the Examination Seating Arrangement System.

          </p>

        </div>

      </div>

          </div>

  );

}

export default Settings;