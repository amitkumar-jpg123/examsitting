import {
  FaUsers,
  FaBook,
  FaUniversity,
  FaUserTie,
} from "react-icons/fa";



function DashboardStats({summary}) {



const cards=[


{
title:"Students",
value:summary?.totalStudents || 0,
icon:<FaUsers/>,
gradient:"from-blue-500 to-blue-700",
iconBg:"bg-blue-100 text-blue-700"
},


{
title:"Exams",
value:summary?.totalExams || 0,
icon:<FaBook/>,
gradient:"from-green-500 to-green-700",
iconBg:"bg-green-100 text-green-700"
},


{
title:"Rooms",
value:summary?.totalRooms || 0,
icon:<FaUniversity/>,
gradient:"from-purple-500 to-purple-700",
iconBg:"bg-purple-100 text-purple-700"
},


{
title:"Invigilators",
value:summary?.totalInvigilators || 0,
icon:<FaUserTie/>,
gradient:"from-orange-500 to-orange-700",
iconBg:"bg-orange-100 text-orange-700"
}


];






return(



<div

className="
grid

grid-cols-1

sm:grid-cols-2

xl:grid-cols-4

gap-4
sm:gap-5

mt-6
sm:mt-8

"

>


{


cards.map((card,index)=>(



<div

key={index}

className={`


bg-gradient-to-r

${card.gradient}


rounded-2xl


p-4
sm:p-6


text-white


shadow-lg


transition-all


duration-300


hover:shadow-2xl


sm:hover:-translate-y-2


cursor-pointer


`}

>



<div

className="
flex
justify-between
items-center

gap-3

"

>






{/* Text */}



<div>


<p

className="
text-sm
sm:text-lg

font-medium

opacity-90

"

>

{card.title}

</p>




<h2

className="
text-3xl
sm:text-4xl
lg:text-5xl

font-bold

mt-2

"

>

{card.value}

</h2>




<p

className="
text-xs
sm:text-sm

mt-2

opacity-80

"

>

Total {card.title}

</p>



</div>










{/* Icon */}



<div

className={`

w-12
h-12

sm:w-16
sm:h-16


rounded-full


flex

items-center

justify-center


text-xl
sm:text-3xl


${card.iconBg}


shadow-md


flex-shrink-0

`}

>


{card.icon}


</div>





</div>




</div>



))


}



</div>



);


}



export default DashboardStats;