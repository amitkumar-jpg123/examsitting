import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserShield } from "react-icons/fa";

import {
  adminLogin,
  checkAdminExists,
} from "../services/authApi";

import bg from "../assets/eam2.jpg";


function AdminLogin() {


  const navigate = useNavigate();


  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");

  const [adminExists,setAdminExists] = useState(true);
  const [loading,setLoading] = useState(false);



  useEffect(()=>{


    const token = localStorage.getItem("token");


    if(token){
      navigate("/admin-dashboard");
    }



    const checkAdmin = async()=>{

      try{

        const res = await checkAdminExists();

        setAdminExists(res.data.exists);


      }
      catch(error){

        console.log(error);

      }

    };


    checkAdmin();


  },[navigate]);





  const handleLogin = async(e)=>{


    e.preventDefault();


    try{


      setLoading(true);


      const res = await adminLogin({

        username,
        password

      });



      if(res.data.success){


        localStorage.setItem(
          "token",
          res.data.token
        );


        localStorage.setItem(
          "admin",
          JSON.stringify(res.data.admin)
        );


        alert("Login Successful");


        navigate("/admin-dashboard");


      }


    }
    catch(error){


      alert(
        error.response?.data?.message ||
        "Login Failed"
      );


    }
    finally{

      setLoading(false);

    }


  };





return(


<div

className="
min-h-screen
flex
items-center
justify-center
bg-cover
bg-center
relative
px-4
py-8
"

style={{
backgroundImage:`url(${bg})`
}}

>


<div className="
absolute
inset-0
bg-black/60
"></div>




<div

className="
relative
z-10
w-full
max-w-md
bg-white
dark:bg-gray-900
rounded-2xl
shadow-2xl
p-5
sm:p-8
"

>


{/* Icon */}

<div className="flex justify-center">


<div className="
bg-blue-100
dark:bg-blue-900
p-4
sm:p-5
rounded-full
">


<FaUserShield

className="
text-4xl
sm:text-5xl
text-blue-700
dark:text-blue-300
"

/>


</div>


</div>





<h2

className="
text-2xl
sm:text-3xl
font-bold
text-center
text-blue-900
dark:text-white
mt-5
"

>

Admin Login

</h2>




<p

className="
text-center
text-sm
sm:text-base
text-gray-500
dark:text-gray-400
mt-2
"

>

Login to access Admin Dashboard

</p>





<form

onSubmit={handleLogin}

className="
mt-6
sm:mt-8
"

>


{/* Username */}

<div className="mb-4 sm:mb-5">


<label

className="
block
font-semibold
text-sm
sm:text-base
text-gray-700
dark:text-gray-200
mb-2
"

>

Username

</label>



<input

type="text"

placeholder="Enter Username"

value={username}

onChange={(e)=>setUsername(e.target.value)}


className="
w-full
border
dark:border-gray-700
rounded-lg
px-3
sm:px-4
py-3
text-sm
sm:text-base
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


<div className="mb-5 sm:mb-6">


<label

className="
block
font-semibold
text-sm
sm:text-base
text-gray-700
dark:text-gray-200
mb-2
"

>

Password

</label>



<input

type="password"

placeholder="Enter Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}


className="
w-full
border
dark:border-gray-700
rounded-lg
px-3
sm:px-4
py-3
text-sm
sm:text-base
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





<button

type="submit"

className="
w-full
bg-green-600
hover:bg-green-700
text-white
py-3
rounded-lg
font-semibold
text-base
sm:text-lg
transition
duration-300
"

>


{

loading
?
"Logging in..."
:
"Login"

}


</button>







{

!adminExists && (

<div className="
mt-5
text-center
">


<p className="
text-sm
sm:text-base
text-gray-600
dark:text-gray-300
">

First time using the system?

</p>



<Link

to="/admin-register"

className="
text-green-700
dark:text-green-400
font-semibold
hover:underline
"

>

Create Admin Account

</Link>


</div>

)

}






</form>







<div className="
mt-6
text-center
">


<Link

to="/"

className="
inline-flex
items-center
gap-2
text-blue-700
dark:text-blue-400
hover:text-green-600
text-sm
sm:text-base
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


export default AdminLogin;