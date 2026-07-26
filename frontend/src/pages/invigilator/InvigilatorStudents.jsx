import {
FaUserGraduate
}
from "react-icons/fa";


function InvigilatorStudents(){

return(

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

Assigned Students

</h1>


<div className="
grid
md:grid-cols-3
gap-5
">


<div className="
p-5
rounded-xl
bg-blue-50
">


<FaUserGraduate
className="
text-4xl
text-blue-700
"
/>


<h3 className="
font-bold
mt-3
">

Amit Kumar

</h3>


<p>
Roll No: 101
</p>


</div>


</div>


</div>


</div>


);

}


export default InvigilatorStudents;