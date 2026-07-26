import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function ResetPassword() {

  const navigate = useNavigate();

  const email = localStorage.getItem("resetEmail");

  const [formData, setFormData] = useState({

    newPassword: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleResetPassword = async () => {

    if (

      !formData.newPassword ||

      !formData.confirmPassword

    ) {

      toast.error("Please Fill All Fields");

      return;

    }

    if (

      formData.newPassword !==

      formData.confirmPassword

    ) {

      toast.error("Passwords Do Not Match");

      return;

    }

    try {

      const res = await axios.put(

        "https://examsitting.onrender.com/api/admin/reset-password",

        {

          email,

          newPassword: formData.newPassword,

        }

      );

      if (res.data.success) {

        toast.success(res.data.message);

        localStorage.removeItem("resetEmail");

        navigate("/admin-login");

      }

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "Password Reset Failed"

      );

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">

          Reset Password

        </h2>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">

            New Password

          </label>

          <div className="flex items-center border rounded-lg px-3">

            <FaLock className="text-gray-500" />

            <input
              type="password"
              name="newPassword"
              className="w-full p-3 outline-none"
              placeholder="Enter New Password"
              value={formData.newPassword}
              onChange={handleChange}
            />

          </div>

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-semibold">

            Confirm Password

          </label>

          <div className="flex items-center border rounded-lg px-3">

            <FaLock className="text-gray-500" />

            <input
              type="password"
              name="confirmPassword"
              className="w-full p-3 outline-none"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>

        </div>

        <button
          onClick={handleResetPassword}
          className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-lg font-semibold"
        >

          Reset Password

        </button>

      </div>

    </div>

  );

}

export default ResetPassword;