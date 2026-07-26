import {
  FaUserCheck
} from "react-icons/fa";


function Attendance(){


return (

<div
className="
min-h-screen
bg-gray-100
dark:bg-gray-900
p-6
"
>



<div
className="
bg-white
dark:bg-gray-800
rounded-xl
shadow-lg
p-6
"
>



{/* Header */}

<div
className="
flex
items-center
gap-3
mb-6
"
>

<FaUserCheck
className="
text-blue-700
text-3xl
"
/>


<h1
className="
text-3xl
font-bold
text-blue-700
dark:text-white
"
>

Student Attendance

</h1>


</div>





{/* Table */}


<div
className="
overflow-x-auto
"
>


<table
className="
w-full
border-collapse
border
border-gray-300
dark:border-gray-600
"
>


<thead>


<tr
className="
bg-gray-200
dark:bg-gray-700
"
>


<th
className="
border
border-gray-300
dark:border-gray-600
p-3
text-center
font-bold
text-gray-800
dark:text-white
"
>

Roll No

</th>




<th
className="
border
border-gray-300
dark:border-gray-600
p-3
text-center
font-bold
text-gray-800
dark:text-white
"
>

Student Name

</th>





<th
className="
border
border-gray-300
dark:border-gray-600
p-3
text-center
font-bold
text-gray-800
dark:text-white
"
>

Status

</th>



</tr>


</thead>





<tbody>


<tr
className="
hover:bg-gray-100
dark:hover:bg-gray-700
"
>



<td
className="
border
border-gray-300
dark:border-gray-600
p-3
text-center
dark:text-white
"
>

101

</td>





<td
className="
border
border-gray-300
dark:border-gray-600
p-3
text-center
dark:text-white
"
>

Rahul Sharma

</td>






<td
className="
border
border-gray-300
dark:border-gray-600
p-3
text-center
"
>


<button

className="
bg-green-600
hover:bg-green-700
text-white
px-5
py-2
rounded-lg
font-semibold
transition
"

>

Present

</button>


</td>



</tr>





</tbody>


</table>


</div>



</div>



</div>


);


}


export default Attendance;