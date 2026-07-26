import { useState, useEffect } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getAdmins,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "../services/adminApi";

function Admins() {

  const [admins, setAdmins] = useState([]);

  const [form, setForm] = useState({

    username: "",
    email: "",
    password: "",

  });

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  // ==========================
  // Fetch Admins
  // ==========================

  const fetchAdmins = async () => {

    try {

      const res = await getAdmins();

      if (res.data.success) {

        setAdmins(res.data.admins);

      }

    } catch (error) {

      console.log(error);

    }

  };

  useEffect(() => {

    fetchAdmins();

  }, []);

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
  // Add / Update Admin
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.username ||
      !form.email ||
      (!editingId && !form.password)
    ) {

      toast.error("Please Fill All Fields");

      return;

    }

    try {

      if (editingId) {

        await updateAdmin(editingId, {

          username: form.username,

          email: form.email,

        });

        toast.success("Admin Updated Successfully");

      } else {

        await addAdmin(form);

        toast.success("Admin Added Successfully");

      }

      setForm({

        username: "",
        email: "",
        password: "",

      });

      setEditingId(null);

      fetchAdmins();

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Something Went Wrong"

      );

    }

  };

  // ==========================
  // Edit Admin
  // ==========================

  const editAdmin = (admin) => {

    setEditingId(admin._id);

    setForm({

      username: admin.username,

      email: admin.email,

      password: "",

    });

    window.scrollTo({

      top: 0,

      behavior: "smooth",

    });

  };

  // ==========================
  // Delete Admin
  // ==========================

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

      "Are you sure you want to delete this Admin?"

    );

    if (!confirmDelete) return;

    try {

      await deleteAdmin(id);

      toast.success("Admin Deleted Successfully");

      fetchAdmins();

    } catch (error) {

      console.log(error);

    }

  };

  // ==========================
  // Reset Form
  // ==========================

  const resetForm = () => {

    setEditingId(null);

    setForm({

      username: "",
      email: "",
      password: "",

    });

  };

  // ==========================
  // Search
  // ==========================

  const filteredAdmins = admins.filter((admin) => {

    return (

      admin.username
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      admin.email
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  });

    return (

    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold text-blue-900 mb-8">
        Admin Management
      </h1>

      {/* Admin Form */}

      <div className="bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-semibold mb-6">

          {editingId ? "Update Admin" : "Add Admin"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-5"
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none"
            required
          />

          {!editingId && (

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-600 outline-none md:col-span-2"
              required
            />

          )}

          <button
            type="submit"
            className="bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold transition col-span-2"
          >
            {editingId ? "Update Admin" : "Add Admin"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-semibold transition col-span-2"
          >
            Reset
          </button>

        </form>

      </div>

      {/* Search */}

      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-4">

        <h2 className="text-2xl font-bold text-blue-900">
          Admin List
        </h2>

        <div className="flex items-center bg-white shadow-lg rounded-xl px-4 py-3 w-full md:w-96">

          <FaSearch className="text-blue-700 mr-3" />

          <input
            type="text"
            placeholder="Search by Username or Email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full outline-none"
          />

        </div>

      </div>

      {/* Table */}

      <div className="mt-8 bg-white rounded-xl shadow-lg overflow-x-auto">

        <table className="w-full">

          <thead className="bg-blue-900 text-white">

            <tr>

              <th className="p-4">Username</th>

              <th>Email</th>

              <th>Role</th>

              <th>Edit</th>

              <th>Delete</th>

            </tr>

          </thead>

          <tbody>

            {filteredAdmins.length > 0 ? (

              filteredAdmins.map((admin) => (

                <tr
                  key={admin._id}
                  className="text-center border-b hover:bg-blue-50 transition"
                >

                  <td className="p-4 font-semibold">

                    {admin.username}

                  </td>

                  <td>

                    {admin.email}

                  </td>

                  <td>

                    {admin.role}

                  </td>

                  <td>

                    <button
                      onClick={() => editAdmin(admin)}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
                    >

                      <FaEdit />

                    </button>

                  </td>

                  <td>

                    <button
                      onClick={() => handleDelete(admin._id)}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg"
                    >

                      <FaTrash />

                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="py-10 text-center text-gray-500"
                >

                  No Admin Found

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Footer */}

      <div className="mt-6 bg-white rounded-xl shadow-lg p-5 flex justify-between">

        <p className="font-semibold">

          Showing

          <span className="text-blue-700 mx-2">

            {filteredAdmins.length}

          </span>

          of

          <span className="text-green-700 mx-2">

            {admins.length}

          </span>

          Admins

        </p>

      </div>

    </div>

  );

}

export default Admins;