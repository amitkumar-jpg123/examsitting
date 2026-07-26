import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {
    if (!email) {
      toast.error("Please Enter Email");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/forgot-password",
        {
          email,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);

        localStorage.setItem("resetEmail", email);

        navigate("/verify-otp");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }

    finally {
  setLoading(false);
}
  };

  

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">

      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">

        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Forgot Password
        </h2>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">
            Email
          </label>

          <div className="flex items-center border rounded-lg px-3">

            <FaEnvelope className="text-gray-500" />

            <input
              type="email"
              className="w-full p-3 outline-none"
              placeholder="Enter Registered Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

          </div>

        </div>

<button
  disabled={loading}
  onClick={handleSendOTP}
  className={`w-full py-3 rounded-lg font-semibold text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-700 hover:bg-blue-800"
  }`}
>
  {loading ? "Sending OTP..." : "Send OTP"}
</button>

        <div className="text-center mt-5">

          <Link
            to="/admin-login"
            className="text-blue-600 hover:underline"
          >
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;