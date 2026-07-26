import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUserTie,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";
import bg from "../assets/invigilator.png";
import { invigilatorLogin } from "../services/invigilatorApi";
function InvigilatorLogin() {
  const navigate = useNavigate();
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] =
    useState(false);
  const [rememberMe, setRememberMe] =
    useState(false);
  const [loading, setLoading] =
    useState(false);
  // ================================
  // Login Function
  // ================================
  const handleLogin = async (e) => {
    e.preventDefault();
try {

  setLoading(true);

  const response =
    await invigilatorLogin({
      employeeId,
      password
    });


  console.log(
    "LOGIN RESPONSE:",
    response.data
  );


  if(response.data.success){

   localStorage.setItem(
  "invigilatorToken",
  response.data.token || response.data.accessToken
);


localStorage.setItem(
  "invigilator",
  JSON.stringify(
    response.data.invigilator || response.data.data
  )
);


    toast.success(
      "Login Successful"
    );


    navigate(
      "/invigilator-dashboard"
    );

  }


}
catch(error){

  toast.error(
    error.response?.data?.message ||
    "Invalid Login Details"
  );

}
finally{

  setLoading(false);

}}
  return (
    <div
      className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-cover
      bg-center
      px-4
      relative"
      style={{
        backgroundImage:
        `url(${bg})`
      }}>
      {/* Overlay */}
      <div
        className="
        absolute
        inset-0
        bg-black/60
        "></div>
      {/* Login Card */}
      <div
        className="
        relative
        z-1 w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 transition duration-300">
        {/* Icon */}


        <div className="flex justify-center">


          <div


            className="
            bg-blue-100

            dark:bg-blue-900

            p-5

            rounded-full

            "


          >


            <FaUserTie


              className="
              text-5xl

              text-blue-700

              dark:text-blue-300

              "


            />


          </div>


        </div>







        {/* Heading */}


        <h2


          className="
          text-3xl

          font-bold

          text-center


          text-blue-900

          dark:text-white


          mt-5

          "


        >


          Invigilator Login


        </h2>





        <p


          className="
          text-center

          text-gray-500

          dark:text-gray-400

          mt-2

          "

        >


          Login to access Invigilator Panel


        </p>







        {/* Form */}



        <form


          onSubmit={handleLogin}


          className="mt-8"


        >






          {/* Employee ID */}



          <div className="mb-5">


            <label


              className="
              block

              font-semibold


              text-gray-700

              dark:text-gray-200


              mb-2

              "

            >


              Employee ID


            </label>





            <input


              type="text"


              placeholder="Enter Employee ID"



              value={employeeId}



              onChange={

                (e)=>
                setEmployeeId(
                  e.target.value
                )

              }



              className="
              w-full


              border


              dark:border-gray-700


              rounded-lg


              px-4


              py-3



              bg-white


              dark:bg-gray-800



              text-gray-800


              dark:text-white



              outline-none



              focus:ring-2


              focus:ring-blue-600


              "


              required


            />



          </div>







          {/* Password */}



          <div className="mb-4">


            <label


              className="
              block


              font-semibold


              text-gray-700


              dark:text-gray-200


              mb-2


              "

            >


              Password


            </label>





            <div className="relative">



              <input


                type={

                  showPassword
                  ?
                  "text"
                  :
                  "password"

                }


                placeholder="Enter Password"



                value={password}



                onChange={

                  (e)=>
                  setPassword(
                    e.target.value
                  )

                }



                className="
                w-full


                border


                dark:border-gray-700


                rounded-lg


                px-4


                py-3


                pr-12



                bg-white


                dark:bg-gray-800



                text-gray-800


                dark:text-white



                outline-none



                focus:ring-2


                focus:ring-blue-600


                "


                required


              />






              <button


                type="button"


                onClick={()=>


                  setShowPassword(
                    !showPassword
                  )


                }


                className="
                absolute

                right-4

                top-4

                text-gray-500

                dark:text-gray-300

                "

              >



                {

                  showPassword

                  ?

                  <FaEyeSlash/>

                  :

                  <FaEye/>

                }



              </button>




            </div>



          </div>





          {/* Remember + Forgot */}



          <div


            className="
            flex

            items-center

            justify-between

            mb-6

            "

          >



            <label


              className="
              flex

              items-center

              gap-2

              text-sm

              text-gray-600

              dark:text-gray-300

              "

            >



              <input


                type="checkbox"


                checked={rememberMe}


                onChange={

                  (e)=>
                  setRememberMe(
                    e.target.checked
                  )

                }


              />


              Remember Me



            </label>





            <button


              type="button"


              className="
              text-blue-700

              dark:text-blue-400

              text-sm

              hover:underline

              "

            >


              Forgot Password?


            </button>



          </div>

          
          {/* Login Button */}


          <button


            type="submit"


            disabled={loading}


            className="
            w-full


            bg-blue-700


            hover:bg-blue-800


            disabled:bg-gray-400


            text-white


            py-3


            rounded-lg


            font-semibold


            text-lg


            transition


            duration-300


            flex


            justify-center


            items-center


            gap-2

            "


          >



            {

              loading

              ?

              (

                <>
                  <span className="
                  w-5
                  h-5
                  border-2
                  border-white
                  border-t-transparent
                  rounded-full
                  animate-spin
                  "></span>


                  Logging in...

                </>


              )

              :

              "Login"

            }



          </button>




        </form>








        {/* Security Message */}


        <div


          className="
          mt-6

          bg-blue-50

          dark:bg-blue-900/40

          rounded-lg

          p-4

          text-center

          "

        >


          <p


            className="
            text-sm

            text-blue-800

            dark:text-blue-200

            "

          >


            🔐 Secure Login for Authorized Invigilators Only


          </p>



        </div>









        {/* Back Home */}



        <div className="mt-6 text-center">


          <Link



            to="/"



            className="
            inline-flex

            items-center

            gap-2


            text-blue-700


            dark:text-blue-400


            hover:text-green-600


            transition

            "



          >



            <FaArrowLeft/>


            Back to Home



          </Link>



        </div>





      </div>





    </div>


  );


}



export default InvigilatorLogin;