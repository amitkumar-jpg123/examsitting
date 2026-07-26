import {
  FaUserGraduate,
  FaDoorOpen,
  FaBookOpen,
  FaUserTie,
  FaCheckCircle,
} from "react-icons/fa";



function RecentActivity({summary}) {



const activities=[


{
title:"Students Registered",
value:summary?.totalStudents || 0,
icon:<FaUserGraduate/>,
color:"text-blue-600",
bg:"bg-blue-100"
},


{
title:"Rooms Available",
value:summary?.totalRooms || 0,
icon:<FaDoorOpen/>,
color:"text-purple-600",
bg:"bg-purple-100"
},


{
title:"Exams Scheduled",
value:summary?.totalExams || 0,
icon:<FaBookOpen/>,
color:"text-green-600",
bg:"bg-green-100"
},


{
title:"Invigilators Assigned",
value:summary?.totalInvigilators || 0,
icon:<FaUserTie/>,
color:"text-orange-600",
bg:"bg-orange-100"
},


{
title:"Seating Generated",
value:summary?.totalSeating || 0,
icon:<FaCheckCircle/>,
color:"text-red-600",
bg:"bg-red-100"
}


];






return(



<div

className="
bg-white
dark:bg-gray-900

rounded-2xl
sm:rounded-3xl

shadow-lg

p-4
sm:p-6

mt-8
sm:mt-10

transition-colors

"

>






<h2

className="
text-xl
sm:text-2xl

font-bold

text-blue-900

dark:text-white

mb-6
sm:mb-8

"

>

Recent Activity

</h2>








<div

className="
relative

border-l-4

border-blue-200

dark:border-gray-700

ml-3
sm:ml-5

space-y-6
sm:space-y-8

"

>





{

activities.map((activity,index)=>(


<div

key={index}

className="
relative

pl-6
sm:pl-8

"

>







{/* Icon */}



<div

className={`

absolute

-left-5
sm:-left-7

top-0


w-10
h-10

sm:w-12
sm:h-12


rounded-full


${activity.bg}


${activity.color}


flex

items-center

justify-center


text-lg
sm:text-xl


shadow-md

`}

>


{activity.icon}


</div>









{/* Card */}



<div

className="
bg-gray-50

dark:bg-gray-800

rounded-xl
sm:rounded-2xl


p-4
sm:p-5


hover:shadow-md


transition

"

>



<h3

className="
font-bold

text-gray-800

dark:text-white

text-sm
sm:text-base

"

>

{activity.title}

</h3>






<p

className="
text-gray-500

dark:text-gray-400

mt-2

text-sm

"

>


Total Count :

<span

className="
font-bold

text-blue-700

dark:text-blue-400

ml-2

"

>

{activity.value}

</span>


</p>





</div>








</div>


))


}




</div>






</div>


);


}


export default RecentActivity;