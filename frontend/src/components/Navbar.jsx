import {
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import {
  useState,
  useEffect
} from "react";

import { useNavigate } from "react-router-dom";

import {
  getNotifications
} from "../utils/notification";


function Navbar() {


const navigate = useNavigate();


const [showNotification,setShowNotification] = useState(false);


const [notifications,setNotifications] = useState([]);



const admin = JSON.parse(
localStorage.getItem("admin")
);





useEffect(()=>{


const data = getNotifications();

setNotifications(data);


},[showNotification]);





return(



<div

className="
bg-white
dark:bg-gray-900

shadow-md

min-h-16
sm:h-20

sticky
top-0

z-20

flex
items-center
justify-between

px-3
sm:px-5
lg:px-8

transition-colors
duration-300

gap-3

"

>





{/* Title */}



<div

className="
min-w-0
"

>


<h2

className="
text-sm
sm:text-lg
md:text-2xl

font-bold

text-blue-900

dark:text-white

truncate

"

>

Exam Seating Arrangement System

</h2>




<p

className="
text-gray-500
dark:text-gray-400

text-xs
sm:text-sm

"

>

Admin Control Panel

</p>


</div>








{/* Right Section */}



<div

className="
flex
items-center

gap-2
sm:gap-4
"

>







{/* Notification */}



<div className="relative">


<button

onClick={()=>setShowNotification(!showNotification)}

className="
relative
hover:scale-110
transition
"

>


<FaBell

size={22}

className="
text-gray-600
dark:text-gray-300
sm:w-6
sm:h-6
"

/>



{

notifications.length>0 &&

<span

className="
absolute
-top-2
-right-2

bg-red-600

text-white

text-xs

rounded-full

px-2

"

>

{notifications.length}

</span>


}


</button>








{/* Dropdown */}



{

showNotification && (


<div

className="
absolute

right-0

mt-4

w-[280px]
sm:w-80

max-w-[90vw]

bg-white

dark:bg-gray-800

shadow-xl

rounded-xl

border

dark:border-gray-700

overflow-hidden

z-50

"

>


<div

className="
px-4
py-3
font-semibold
border-b
dark:border-gray-700
text-gray-800
dark:text-white
"

>

🔔 Notifications

</div>





{

notifications.length===0

?

<div

className="
p-4
text-center
text-gray-500
"

>

No New Notifications

</div>


:


notifications.map((item)=>(


<div

key={item.id}

className="
px-4
py-3
hover:bg-gray-100
dark:hover:bg-gray-700
"

>


<p

className="
text-sm
text-gray-700
dark:text-gray-200
"

>

{item.message}

</p>


<span

className="
text-xs
text-gray-400
"

>

{item.time}

</span>


</div>


))


}





<button

onClick={()=>{

setShowNotification(false);

navigate("/notifications");

}}

className="
w-full
text-center
py-3
border-t
dark:border-gray-700
text-blue-600
dark:text-blue-400
font-medium
"

>

View All

</button>



</div>


)


}


</div>










{/* Profile */}



<button

onClick={()=>navigate("/admin-profile")}

className="
flex
items-center
gap-2

hover:bg-gray-100

dark:hover:bg-gray-800

rounded-xl

px-2
py-1

transition

"

>



<FaUserCircle

size={34}

className="
text-blue-800
dark:text-blue-400
sm:w-10
sm:h-10
"

/>




<div

className="
hidden
sm:block
"

>


<h3

className="
font-semibold
text-sm
md:text-base

text-gray-800

dark:text-white

"

>

{admin?.username || "Admin"}

</h3>




<p

className="
text-xs
md:text-sm

text-gray-500

dark:text-gray-400

"

>

Administrator

</p>


</div>


</button>







</div>





</div>


);


}


export default Navbar;