import {
  FaCalendarAlt,
  FaClock,
  FaDoorOpen
} from "react-icons/fa";


function MyDuties(){

return (

<div className="
min-h-screen
bg-gray-100
dark:bg-gray-900
p-6
">


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
">


<h1 className="
text-3xl
font-bold
text-blue-700
dark:text-white
mb-6
">

My Exam Duties

</h1>



<div className="
grid
md:grid-cols-3
gap-6
">


<div className="
bg-blue-50
dark:bg-gray-700
p-5
rounded-xl
">

<FaCalendarAlt
className="
text-3xl
text-blue-700
mb-3
"
/>


<h3 className="
font-bold
text-lg
dark:text-white
">

Database Management Exam

</h3>


<p className="text-gray-500">

Date: 25 July 2026

</p>


</div>





<div className="
bg-green-50
dark:bg-gray-700
p-5
rounded-xl
">


<FaClock
className="
text-3xl
text-green-600
mb-3
"
/>


<h3 className="
font-bold
dark:text-white
">

Time

</h3>


<p>

09:00 AM - 12:00 PM

</p>


</div>





<div className="
bg-yellow-50
dark:bg-gray-700
p-5
rounded-xl
">


<FaDoorOpen
className="
text-3xl
text-yellow-600
mb-3
"
/>


<h3 className="
font-bold
dark:text-white
">

Room

</h3>


<p>

Room 101

</p>


</div>


</div>


</div>


</div>

);

}


export default MyDuties;