import { useState, useEffect } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileExcel,
  FaBook,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { exportToExcel } from "../utils/exportToExcel";

import {
  getExams,
  addExam,
  updateExam,
  deleteExam,
} from "../services/examApi";



function Exams() {


const [exams,setExams] = useState([]);

const [editingId,setEditingId] = useState(null);

const [search,setSearch] = useState("");

const [loading,setLoading] = useState(false);



const [form,setForm] = useState({

subject:"",
subjectCode:"",
semester:"",
examDate:"",
examTime:"",

});





// ===============================
// Fetch Exams
// ===============================


const fetchExams = async()=>{


try{


const res = await getExams();


setExams(
res.data.exams || []
);


}

catch(error){


console.log(error);

toast.error(
"Failed to Load Exams"
);


}


};




useEffect(()=>{


fetchExams();


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
// Add / Update Exam
// ===============================


const handleSubmit = async(e)=>{


e.preventDefault();



if(
!form.subject ||
!form.subjectCode ||
!form.semester ||
!form.examDate ||
!form.examTime
){


toast.error(
"Please Fill All Fields"
);


return;


}




try{


setLoading(true);



if(editingId){



await updateExam(
editingId,
form
);



toast.success(
"Exam Updated Successfully"
);



}
else{



await addExam(
form
);



toast.success(
"Exam Added Successfully"
);



}





setForm({

subject:"",
subjectCode:"",
semester:"",
examDate:"",
examTime:"",

});



setEditingId(null);



fetchExams();



}

catch(error){


console.log(error);



toast.error(

error.response?.data?.message ||

"Something Went Wrong"

);



}

finally{


setLoading(false);


}



};







// ===============================
// Edit Exam
// ===============================


const editExam=(exam)=>{


setEditingId(
exam._id
);



setForm({

subject:exam.subject,

subjectCode:exam.subjectCode,

semester:exam.semester,

examDate:
exam.examDate
?
exam.examDate.split("T")[0]
:
"",

examTime:
exam.examTime,


});



window.scrollTo({

top:0,

behavior:"smooth"

});


};






// ===============================
// Delete Exam
// ===============================


const handleDelete=async(id)=>{


if(
!window.confirm(
"Delete this Exam?"
)
)
return;



try{


await deleteExam(id);



toast.success(
"Exam Deleted Successfully"
);



fetchExams();



}

catch(error){


console.log(error);


toast.error(
"Delete Failed"
);



}


};








// ===============================
// Reset
// ===============================


const resetForm=()=>{


setEditingId(null);


setForm({

subject:"",
subjectCode:"",
semester:"",
examDate:"",
examTime:"",

});


};






// ===============================
// Search
// ===============================


const filteredExams = exams.filter((exam)=>{


return(

exam.subject
?.toLowerCase()
.includes(search.toLowerCase())

||

exam.subjectCode
?.toLowerCase()
.includes(search.toLowerCase())


||

exam.semester
?.toString()
.includes(search)

);


});







// ===============================
// Export Excel
// ===============================


const handleExport=()=>{


const data = filteredExams.map((exam)=>(


{


Subject:
exam.subject,


SubjectCode:
exam.subjectCode,


Semester:
exam.semester,


Date:
exam.examDate,


Time:
exam.examTime,


}


));



exportToExcel(
data,
"Exams"
);



toast.success(
"Excel Exported Successfully"
);



};





return(



<div

className="
min-h-screen
bg-gray-100
dark:bg-gray-950
p-4
md:p-8
transition-colors
duration-300
"

>





{/* Header */}


<div

className="
flex
items-center
gap-4
mb-8
"

>


<FaBook

size={40}

className="
text-blue-700
dark:text-blue-400
"

/>



<div>


<h1

className="
text-3xl
md:text-4xl
font-bold
text-blue-900
dark:text-white
"

>

Exam Management

</h1>



<p

className="
text-gray-500
dark:text-gray-300
mt-1
"

>

Add, Update and Manage Examination Details

</p>


</div>


</div>







{/* Form */}



<div

className="
bg-white
dark:bg-gray-900
rounded-xl
shadow-lg
p-5
md:p-8
"

>


<h2

className="
text-2xl
font-semibold
text-gray-800
dark:text-white
mb-6
"

>


{
editingId
?
"Update Exam"
:
"Add New Exam"
}


</h2>





<form

onSubmit={handleSubmit}

className="
grid
md:grid-cols-2
gap-5
"

>

  {/* Subject */}

<input

type="text"

name="subject"

placeholder="Subject Name"

value={form.subject}

onChange={handleChange}

className="
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
p-3
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-600
"

/>





{/* Subject Code */}

<input

type="text"

name="subjectCode"

placeholder="Subject Code"

value={form.subjectCode}

onChange={handleChange}

className="
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
p-3
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-600
"

/>






{/* Semester */}

<input

type="number"

name="semester"

placeholder="Semester"

value={form.semester}

onChange={handleChange}

className="
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
p-3
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-600
"

/>






{/* Date */}

<input

type="date"

name="examDate"

value={form.examDate}

onChange={handleChange}

className="
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
p-3
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-600
"

/>






{/* Time */}

<input

type="time"

name="examTime"

value={form.examTime}

onChange={handleChange}

className="
border
dark:border-gray-700
bg-white
dark:bg-gray-800
text-gray-800
dark:text-white
p-3
rounded-lg
outline-none
focus:ring-2
focus:ring-blue-600
"

/>







<button

type="submit"

disabled={loading}

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
loading
?
"Please Wait..."
:
editingId
?
"Update Exam"
:
"Add Exam"
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
"

>

Reset

</button>



</form>


</div>









{/* Search + Export */}



<div

className="
mt-10
flex
flex-col
lg:flex-row
justify-between
gap-4
"

>


<h2

className="
text-2xl
font-bold
text-blue-900
dark:text-white
"

>

Exam List

</h2>




<div

className="
flex
flex-col
sm:flex-row
gap-3
"

>



<div

className="
flex
items-center
bg-white
dark:bg-gray-900
rounded-xl
shadow-lg
px-4
py-3
w-full
sm:w-96
"

>


<FaSearch

className="
text-blue-600
mr-3
"

/>



<input

type="text"

placeholder="Search Subject, Code, Semester"

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
rounded-lg
flex
items-center
justify-center
gap-2
"

>


<FaFileExcel/>

Export Excel


</button>



</div>


</div>









{/* Table */}



<div

className="
mt-8
bg-white
dark:bg-gray-900
rounded-xl
shadow-lg
overflow-x-auto
"

>


<table

className="
w-full
min-w-[800px]
"

>


<thead

className="
bg-blue-900
dark:bg-blue-950
text-white
"

>


<tr>


<th className="p-4">

Subject

</th>


<th>

Code

</th>


<th>

Semester

</th>


<th>

Date

</th>


<th>

Time

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

filteredExams.length > 0

?

filteredExams.map((exam)=>(


<tr

key={exam._id}

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

{exam.subject}

</td>



<td>

{exam.subjectCode}

</td>



<td>

{exam.semester}

</td>




<td>

{
new Date(
exam.examDate
)
.toLocaleDateString()
}

</td>




<td>

{exam.examTime}

</td>





<td>


<button

onClick={()=>editExam(exam)}

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

onClick={()=>handleDelete(exam._id)}

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

colSpan="7"

className="
py-10
text-center
text-gray-500
dark:text-gray-300
text-lg
"

>


No Exams Found


</td>


</tr>


)


}



</tbody>



</table>



</div>









{/* Footer */}



<div

className="
mt-6
bg-white
dark:bg-gray-900
rounded-xl
shadow-lg
p-5
flex
flex-col
md:flex-row
justify-between
items-center
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
text-blue-700
mx-2
"

>

{filteredExams.length}

</span>



of


<span

className="
text-green-700
mx-2
"

>

{exams.length}

</span>


Exams


</p>






<div

className="
mt-3
md:mt-0
bg-blue-100
dark:bg-blue-900
text-blue-800
dark:text-white
px-4
py-2
rounded-lg
font-semibold
"

>

Total Exams : {exams.length}


</div>




</div>







</div>


);


}


export default Exams;