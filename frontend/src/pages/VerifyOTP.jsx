import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function VerifyOTP() {

  const navigate = useNavigate();

  const [otp, setOtp] = useState("");

  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("resetEmail");

  const handleVerifyOTP = async () => {

    if (!otp) {

      toast.error("Please Enter OTP");

      return;

    }

    setLoading(true);

    try {

      const res = await axios.post(

        "https://examsitting.onrender.com/api/admin/verify-otp",

        {

          email,

          otp,

        }

      );

      if (res.data.success) {

        toast.success(res.data.message);

        navigate("/reset-password");

      }

    } catch (error) {

      toast.error(

        error.response?.data?.message ||

        "OTP Verification Failed"

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

          Verify OTP

        </h2>

        <div className="mb-5">

          <label className="block mb-2 font-semibold">

            OTP

          </label>

          <div className="flex items-center border rounded-lg px-3">

            <FaKey className="text-gray-500" />

            <input
              type="text"
              className="w-full p-3 outline-none"
              placeholder="Enter 6 Digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

          </div>

        </div>

<button
  disabled={loading}
  onClick={handleVerifyOTP}
  className={`w-full py-3 rounded-lg font-semibold text-white ${
    loading
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-green-600 hover:bg-green-700"
  }`}
>

  {loading ? "Verifying..." : "Verify OTP"}

</button>

      </div>

    </div>

  );

}

export default VerifyOTP;