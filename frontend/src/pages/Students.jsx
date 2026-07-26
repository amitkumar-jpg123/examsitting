import { useState, useEffect } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileExcel,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentApi";

import { exportToExcel } from "../utils/exportToExcel";



function Students() {


const [students,setStudents] = useState([]);


const [form,setForm] = useState({

  roll:"",
  name:"",
  branch:"",
  semester:"",

});


const [editingId,setEditingId] = useState(null);


const [search,setSearch] = useState("");





// ===============================
// Fetch Students
// ===============================


const fetchStudents = async()=>{


try{


const res = await getStudents();


setStudents(
  res.data.students || []
);


}

catch(error){


console.log(error);


}


};





useEffect(()=>{


fetchStudents();


},[]);







// ===============================
// Input Change
// ===============================


const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value,

});


};







// ===============================
// Add / Update
// ===============================


const handleSubmit=async(e)=>{


e.preventDefault();



if(
!form.roll ||
!form.name ||
!form.branch ||
!form.semester
){

toast.error(
"Please Fill All Fields"
);

return;

}



try{


if(editingId){


await updateStudent(
editingId,
form
);


toast.success(
"Student Updated Successfully"
);



}

else{


await addStudent(form);


toast.success(
"Student Added Successfully"
);


}



setForm({

roll:"",
name:"",
branch:"",
semester:"",

});


setEditingId(null);


fetchStudents();



}

catch(error){


console.log(error.response?.data);


toast.error(

error.response?.data?.message ||
"Something went wrong"

);


}



};








// ===============================
// Edit
// ===============================


const editStudent=(student)=>{


setEditingId(
student._id
);



setForm({

roll:student.roll,

name:student.name,

branch:student.branch,

semester:student.semester,


});



window.scrollTo({

top:0,

behavior:"smooth"

});


};







// ===============================
// Delete
// ===============================


const handleDelete=async(id)=>{


const confirmDelete = window.confirm(

"Are you sure you want to delete this student?"

);



if(!confirmDelete)
return;




try{


await deleteStudent(id);



toast.success(
"Student Deleted Successfully"
);



fetchStudents();



}

catch(error){


console.log(error);


}


};








// ===============================
// Reset
// ===============================


const resetForm=()=>{


setEditingId(null);


setForm({

roll:"",
name:"",
branch:"",
semester:"",

});


};









// ===============================
// Export Excel
// ===============================


const handleExport=()=>{


const data = students

.filter((student)=>{


return (

student.roll
.toLowerCase()
.includes(search.toLowerCase())

||

student.name
.toLowerCase()
.includes(search.toLowerCase())

||

student.branch
.toLowerCase()
.includes(search.toLowerCase())


||

student.semester
.toString()
.includes(search)


);


})


.map((student)=>({


Roll:student.roll,

Name:student.name,

Department:student.branch,

Semester:student.semester,


}));



exportToExcel(
data,
"Students"
);


};








// ===============================
// Search Filter
// ===============================


const filteredStudents = students.filter(
(student)=>{


return(


student.roll
.toLowerCase()
.includes(search.toLowerCase())


||

student.name
.toLowerCase()
.includes(search.toLowerCase())


||

student.branch
.toLowerCase()
.includes(search.toLowerCase())


||

student.semester
.toString()
.includes(search)


);


}

);









return (

<div

className="
min-h-screen
bg-gray-100
dark:bg-gray-950
p-4
sm:p-6
lg:p-8
transition
duration-300
"

>


<h1

className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
text-blue-900
dark:text-white
mb-6
"

>

Student Management

</h1>






{/* ===============================
        FORM CARD
================================ */}



<div

className="
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
p-5
sm:p-8
"

>


<h2

className="
text-xl
sm:text-2xl
font-semibold
text-gray-800
dark:text-white
mb-6
"

>


{
editingId
?
"Update Student"
:
"Add Student"
}


</h2>





<form

onSubmit={handleSubmit}

className="
grid
grid-cols-1
md:grid-cols-2
gap-5
"

>





<input

type="text"

name="roll"

placeholder="Roll Number"

value={form.roll}

onChange={handleChange}

className="
w-full
p-3
rounded-lg
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
outline-none
focus:ring-2
focus:ring-blue-600
"

/>





<input

type="text"

name="name"

placeholder="Student Name"

value={form.name}

onChange={handleChange}

className="
w-full
p-3
rounded-lg
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
outline-none
focus:ring-2
focus:ring-blue-600
"

/>





<input

type="text"

name="branch"

placeholder="Department"

value={form.branch}

onChange={handleChange}

className="
w-full
p-3
rounded-lg
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
outline-none
focus:ring-2
focus:ring-blue-600
"

/>





<input

type="text"

name="semester"

placeholder="Semester"

value={form.semester}

onChange={handleChange}

className="
w-full
p-3
rounded-lg
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
outline-none
focus:ring-2
focus:ring-blue-600
"

/>





<button

type="submit"

className="
md:col-span-2
bg-blue-700
hover:bg-blue-800
text-white
py-3
rounded-lg
font-semibold
transition
"

>


{
editingId
?
"Update Student"
:
"Add Student"
}


</button>





<button

type="button"

onClick={resetForm}

className="
md:col-span-2
bg-gray-600
hover:bg-gray-700
text-white
py-3
rounded-lg
font-semibold
transition
"

>

Reset

</button>




</form>


</div>

{/* ===============================
        SEARCH + EXPORT
================================ */}


<div

className="
mt-8
flex
flex-col
lg:flex-row
justify-between
gap-5
"

>


<h2

className="
text-xl
sm:text-2xl
font-bold
text-blue-900
dark:text-white
"

>

Student List

</h2>





<div

className="
flex
flex-col
sm:flex-row
gap-3
w-full
lg:w-auto
"

>



<div

className="
flex
items-center
bg-white
dark:bg-gray-900
shadow-md
rounded-xl
px-4
py-3
w-full
sm:w-96
"

>


<FaSearch

className="
text-blue-700
dark:text-blue-400
mr-3
"

/>



<input

type="text"

placeholder="Search student..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
outline-none
bg-transparent
text-gray-800
dark:text-white
"

/>


</div>







<button

onClick={handleExport}

className="
bg-green-600
hover:bg-green-700
text-white
px-5
py-3
rounded-xl
flex
items-center
justify-center
gap-2
transition
"

>


<FaFileExcel/>

Export Excel


</button>





</div>



</div>









{/* ===============================
        DESKTOP TABLE
================================ */}



<div

className="
hidden
md:block
mt-8
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
overflow-hidden
"

>


<div

className="
overflow-x-auto
"

>


<table

className="
w-full
min-w-[700px]
"

>



<thead

className="
bg-blue-900
text-white
"

>

<tr>


<th className="p-4">
Roll No
</th>


<th>
Name
</th>


<th>
Department
</th>


<th>
Semester
</th>


<th>
Edit
</th>


<th>
Delete
</th>


</tr>


</thead>







<tbody>



{

filteredStudents.length > 0 ?


filteredStudents.map((student)=>(



<tr

key={student._id}

className="
text-center
border-b
dark:border-gray-700
text-gray-800
dark:text-gray-200
hover:bg-blue-50
dark:hover:bg-gray-800
transition
"

>



<td

className="
p-4
font-semibold
"

>

{student.roll}

</td>




<td>

{student.name}

</td>




<td>

{student.branch}

</td>




<td>

{student.semester}

</td>







<td>


<button

onClick={()=>editStudent(student)}

className="
bg-blue-600
hover:bg-blue-700
text-white
p-2
rounded-lg
"

>

<FaEdit/>

</button>


</td>








<td>


<button

onClick={()=>handleDelete(student._id)}

className="
bg-red-600
hover:bg-red-700
text-white
p-2
rounded-lg
"

>

<FaTrash/>

</button>


</td>





</tr>



))


:

(


<tr>


<td

colSpan="6"

className="
py-10
text-center
text-gray-500
dark:text-gray-300
"

>

No Students Found

</td>


</tr>


)



}



</tbody>



</table>



</div>


</div>









{/* ===============================
        MOBILE CARD VIEW
================================ */}



<div

className="
md:hidden
mt-8
space-y-4
"

>



{

filteredStudents.length > 0 ?


filteredStudents.map((student)=>(



<div

key={student._id}

className="
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
p-5
"

>


<div

className="
flex
justify-between
items-start
"

>


<div>


<h3

className="
text-lg
font-bold
text-blue-900
dark:text-white
"

>

{student.name}

</h3>



<p

className="
text-gray-500
dark:text-gray-400
"

>

Roll : {student.roll}

</p>



<p

className="
text-gray-500
dark:text-gray-400
"

>

Department : {student.branch}

</p>



<p

className="
text-gray-500
dark:text-gray-400
"

>

Semester : {student.semester}

</p>



</div>




<div

className="
flex
gap-2
"

>


<button

onClick={()=>editStudent(student)}

className="
bg-blue-600
text-white
p-2
rounded-lg
"

>

<FaEdit/>

</button>





<button

onClick={()=>handleDelete(student._id)}

className="
bg-red-600
text-white
p-2
rounded-lg
"

>

<FaTrash/>

</button>


</div>




</div>


</div>




))


:

(


<div

className="
bg-white
dark:bg-gray-900
rounded-xl
p-8
text-center
text-gray-500
"

>

No Students Found

</div>


)


}



</div>










{/* ===============================
        FOOTER COUNT
================================ */}



<div

className="
mt-8
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
p-5
flex
flex-col
sm:flex-row
justify-between
items-center
gap-3
"

>


<p

className="
font-semibold
text-gray-700
dark:text-gray-200
"

>


Showing


<span

className="
mx-2
text-blue-700
dark:text-blue-400
"

>

{filteredStudents.length}

</span>


of


<span

className="
mx-2
text-green-700
dark:text-green-400
"

>

{students.length}

</span>


Students


</p>



</div>






</div>

);

}



export default Students;