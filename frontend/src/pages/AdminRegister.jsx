import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

import {
  adminRegister,
  checkAdminExists,
} from "../services/authApi";

import bg from "../assets/eam2.jpg";

function AdminRegister() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // ==========================
  // Check if Admin Already Exists
  // ==========================

  useEffect(() => {

    const checkAdmin = async () => {

      try {

        const res = await checkAdminExists();

        if (res.data.exists) {

          navigate("/admin-login");

        } else {

          setLoading(false);

        }

      } catch (error) {

        console.log(error);

        setLoading(false);

      }

    };

    checkAdmin();

  }, [navigate]);

  // ==========================
  // Handle Input
  // ==========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  };

  // ==========================
  // Register Admin
  // ==========================

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      const res = await adminRegister(form);

      if (res.data.success) {

        alert("Admin Registered Successfully");

        navigate("/admin-login");

      }

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  // ==========================
  // Loading Screen
  // ==========================

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <h1 className="text-3xl font-bold text-blue-900">
          Loading...
        </h1>

      </div>

    );

  }

  return (

    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bg})`,
      }}
    >

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 z-10">

        <h2 className="text-3xl font-bold text-center text-blue-900">
          Create Admin Account
        </h2>

        <p className="text-center text-gray-500 mt-2">
          First Time Setup
        </p>

        <form
          onSubmit={handleRegister}
          className="mt-8"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 mb-4 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition"
          >
            Register Admin
          </button>

        </form>

        <div className="mt-6 text-center">

          <Link
            to="/admin-login"
            className="inline-flex items-center gap-2 text-blue-700 hover:text-green-600"
          >

            <FaArrowLeft />

            Back to Login

          </Link>

        </div>

      </div>

    </div>

  );

}

export default AdminRegister;