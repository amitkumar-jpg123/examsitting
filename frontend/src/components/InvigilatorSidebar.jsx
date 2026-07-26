import {
  FaHome,
  FaCalendarAlt,
  FaUserGraduate,
  FaClipboardCheck,
  FaExclamationTriangle,
  FaUser,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";


function InvigilatorSidebar(){

const navigate = useNavigate();

const location = useLocation();


const [sidebarOpen,setSidebarOpen] =
useState(false);



const logout = ()=>{

localStorage.removeItem(
"invigilatorToken"
);

localStorage.removeItem(
"invigilator"
);

navigate("/invigilator-login");

};



const menuItems=[

{
name:"Dashboard",
icon:<FaHome/>,
path:"/invigilator-dashboard"
},

{
name:"My Duties",
icon:<FaCalendarAlt/>,
path:"/invigilator-duties"
},

{
name:"Attendance",
icon:<FaClipboardCheck/>,
path:"/invigilator-attendance"
},

{
name:"Students",
icon:<FaUserGraduate/>,
path:"/invigilator-students"
},

{
name:"Report Incident",
icon:<FaExclamationTriangle/>,
path:"/invigilator-report"
},

{
name:"Profile",
icon:<FaUser/>,
path:"/invigilator-profile"
}

];



return(

<>


<button

onClick={()=>
setSidebarOpen(!sidebarOpen)
}

className="
md:hidden
fixed
top-4
left-4
z-50
bg-blue-700
text-white
p-3
rounded-lg
"

>

{
sidebarOpen
?
<FaTimes/>
:
<FaBars/>
}

</button>



<aside

className={`
fixed
md:static
top-0
left-0
h-full
w-64
bg-white
dark:bg-gray-800
shadow-xl
z-40
transition-transform

${
sidebarOpen
?
"translate-x-0"
:
"-translate-x-full md:translate-x-0"
}

`}

>


<div className="
p-6
border-b
dark:border-gray-700
">


<h2 className="
text-2xl
font-bold
text-blue-700
dark:text-blue-400
">

Invigilator Panel

</h2>


</div>



<nav className="
p-4
space-y-2
">


{
menuItems.map((item,index)=>(


<button

key={index}

onClick={()=>{

navigate(item.path);

setSidebarOpen(false);

}}


className={`

flex
items-center
gap-3
w-full
p-3
rounded-lg
transition


${
location.pathname===item.path

?
"bg-blue-700 text-white"

:
"text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-gray-700"

}

`}

>


{item.icon}

{item.name}


</button>


))

}


</nav>



<div className="
absolute
bottom-5
w-full
px-4
">


<button

onClick={logout}

className="
flex
items-center
justify-center
gap-3
w-full
bg-red-600
hover:bg-red-700
text-white
p-3
rounded-lg
"

>


<FaSignOutAlt/>

Logout


</button>


</div>



</aside>


</>


);

}


export default InvigilatorSidebar;