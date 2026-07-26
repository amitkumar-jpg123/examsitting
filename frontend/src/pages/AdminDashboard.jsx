import { 
  useEffect, 
  useState 
} from "react";

import { 
  useNavigate 
} from "react-router-dom";


import {
  FaUserCircle,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaBell,
} from "react-icons/fa";


import {
  useTheme
} from "../context/ThemeContext";


import {
  getDashboard
} from "../services/dashboardApi";


import WelcomeBanner 
from "../components/dashboard/WelcomeBanner";


import DashboardStats 
from "../components/dashboard/DashboardStats";


import DashboardCharts 
from "../components/dashboard/DashboardCharts";


import RecentActivity 
from "../components/dashboard/RecentActivity";


import QuickActions 
from "../components/dashboard/QuickActions";


import NotificationPanel 
from "../components/NotificationPanel";


import ActivityLogs 
from "../components/ActivityLogs";





function AdminDashboard(){



const {
  darkMode,
  toggleTheme
}=useTheme();



const navigate = useNavigate();





// ==========================
// Admin Data
// ==========================


const admin =
JSON.parse(
localStorage.getItem("admin")
) || {};







// ==========================
// Dashboard State
// ==========================


const [dashboard,setDashboard]=useState({

totalStudents:0,

totalRooms:0,

totalExams:0,

totalInvigilators:0,

totalSeating:0,

totalAdmins:0,

});





const [loading,setLoading]=useState(true);





const [notifications,setNotifications]=useState(0);







// ==========================
// Fetch Dashboard
// ==========================


const fetchDashboard = async()=>{


try{


const res =
await getDashboard();




if(res.data.success){



setDashboard(
res.data.dashboard
);



// Notification count

setNotifications(

res.data.dashboard.totalSeating || 0

);



}



}

catch(error){


console.log(
"Dashboard Error:",
error
);


}

finally{


setLoading(false);


}



};









// ==========================
// Initial Load + Auto Refresh
// ==========================


useEffect(()=>{


fetchDashboard();



const interval =
setInterval(()=>{


fetchDashboard();


},30000);




return ()=>clearInterval(interval);



},[]);







// ==========================
// Logout
// ==========================


const handleLogout=()=>{


localStorage.clear();


navigate(
"/admin-login"
);


};






// ==========================
// Loading UI
// ==========================


if(loading){


return(


<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
dark:bg-gray-950
">


<div className="text-center">


<div className="
w-16
h-16
border-4
border-blue-600
border-t-transparent
rounded-full
animate-spin
mx-auto
">

</div>




<h2 className="
mt-5
text-xl
font-semibold
text-blue-900
dark:text-white
">

Loading Dashboard...

</h2>



</div>



</div>


);


}

return (

<div

className="
min-h-screen
bg-gray-100
dark:bg-gray-950
transition-colors
duration-300
"

>



{/* ==========================
Header
========================== */}


<div

className="
bg-white
dark:bg-gray-900
shadow-md
"

>


<div

className="
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
py-5

flex

flex-col
lg:flex-row

justify-between

items-center

gap-5

"

>





{/* Title */}

<div>


<h1

className="
text-3xl
font-bold
text-blue-900
dark:text-white
"

>

Admin Dashboard

</h1>



<p

className="
text-gray-500
dark:text-gray-300
mt-1
"

>

Exam Seating Arrangement System

</p>


</div>








{/* Right Header Area */}


<div

className="
flex
items-center
gap-5
"

>




{/* Notification */}


<button

className="
relative
w-11
h-11
rounded-full
bg-gray-100
dark:bg-gray-700
flex
items-center
justify-center
hover:scale-110
transition
"

>


<FaBell

className="
text-blue-700
dark:text-white
"

size={20}

/>



{

notifications>0 && (

<span

className="
absolute
-top-1
-right-1
bg-red-600
text-white
text-xs
w-5
h-5
rounded-full
flex
items-center
justify-center
"

>

{notifications}

</span>

)

}


</button>






{/* Theme Toggle */}


<button

onClick={toggleTheme}

className="
w-11
h-11
rounded-full
bg-gray-100
dark:bg-gray-700
flex
items-center
justify-center
hover:scale-110
transition
"

>


{

darkMode

?

<FaSun
className="text-yellow-400"
/>

:

<FaMoon
className="text-blue-700"
/>


}



</button>







{/* Profile */}



<div

className="
flex
items-center
gap-3
"

>



{


admin?.profileImage

?


<img

src={

`http://localhost:5000/uploads/${admin.profileImage}`

}

alt="Profile"

onClick={()=>navigate("/admin-profile")}

className="
w-12
h-12
rounded-full
object-cover
border-2
border-blue-700
cursor-pointer
"

/>



:




<FaUserCircle

size={45}

onClick={()=>navigate("/admin-profile")}

className="
text-blue-700
cursor-pointer
"

/>



}





<div className="hidden sm:block">


<h3

className="
font-bold
text-gray-800
dark:text-white
"

>

{

admin?.username ||

"Admin"

}


</h3>



<p

className="
text-sm
text-gray-500
dark:text-gray-300
"

>

Administrator

</p>



</div>



</div>






{/* Logout */}



<button

onClick={handleLogout}

className="
text-red-600
hover:text-red-800
transition
"

>


<FaSignOutAlt

size={25}

/>


</button>




</div>



</div>



</div>









{/* ==========================
Dashboard Content
========================== */}



<div

className="
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
py-8
"

>




{/* Welcome */}

<WelcomeBanner />







{/* Statistics */}


<div className="mt-8">


<DashboardStats

summary={dashboard}

/>


</div>









{/* Charts */}


<div className="mt-8">


<DashboardCharts

summary={dashboard}

/>


</div>









{/* Recent Activity */}


<div className="mt-8">


<RecentActivity

summary={dashboard}

/>


</div>









{/* Quick Actions */}


<div className="mt-8">


<QuickActions />


</div>









{/* Notifications */}


<div className="mt-8">


<NotificationPanel

dashboard={dashboard}

/>


</div>









{/* Logs */}


<div className="mt-8">


<ActivityLogs

dashboard={dashboard}

/>


</div>







</div>








{/* Footer */}



<div

className="
text-center
py-6
text-gray-500
dark:text-gray-400
text-sm
"

>


Exam Seating Arrangement System © {new Date().getFullYear()}


</div>







</div>


);



}



export default AdminDashboard;