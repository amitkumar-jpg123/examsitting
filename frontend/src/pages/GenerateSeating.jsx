import { useEffect, useState } from "react";

import {
  FaChair,
  FaPrint,
  FaTrash,
  FaFilePdf,
  FaFileExcel,
} from "react-icons/fa";


import toast from "react-hot-toast";


import exportSeatingPDF from "../utils/exportSeatingPDF";
import exportSeatingExcel from "../utils/exportSeatingExcel";


import { addNotification } from "../utils/notification";


import {
  generateSeating,
  getSeating,
  clearSeating,
} from "../services/seatingApi";


import { getExams } from "../services/examApi";
import { getRooms } from "../services/roomApi";
import { getInvigilators } from "../services/invigilatorApi";





function GenerateSeating(){



const [loading,setLoading]=useState(false);


const [exams,setExams]=useState([]);

const [rooms,setRooms]=useState([]);

const [invigilators,setInvigilators]=useState([]);

const [seating,setSeating]=useState([]);




const [selectedExam,setSelectedExam]=useState("");

const [selectedRoom,setSelectedRoom]=useState("");

const [selectedInvigilator,setSelectedInvigilator]=useState("");







// ==============================
// Fetch Data
// ==============================


const fetchData=async()=>{


try{


const [
examRes,
roomRes,
invigilatorRes,
seatingRes

]=await Promise.all([

getExams(),

getRooms(),

getInvigilators(),

getSeating()

]);



setExams(
Array.isArray(examRes.data.exams)
?
examRes.data.exams
:
[]
);



setRooms(
Array.isArray(roomRes.data.rooms)
?
roomRes.data.rooms
:
[]
);



setInvigilators(

Array.isArray(
invigilatorRes.data.invigilators
)

?
invigilatorRes.data.invigilators
:
[]

);



setSeating(

Array.isArray(
seatingRes.data.seating
)

?
seatingRes.data.seating
:
[]

);



}

catch(error){


console.log(error);


toast.error(
"Failed to load seating data"
);


}



};





useEffect(()=>{


fetchData();


},[]);






// ==============================
// Generate Seating
// ==============================


const handleGenerate=async()=>{


if(
!selectedExam ||
!selectedRoom ||
!selectedInvigilator
){


toast.error(
"Select Exam, Room and Invigilator"
);


return;


}



try{


setLoading(true);



const res =
await generateSeating({

examId:selectedExam,

roomId:selectedRoom,

invigilatorId:selectedInvigilator

});



toast.success(
res.data.message ||
"Seating Generated Successfully"
);



addNotification(
"🪑 Seating Arrangement Generated"
);



fetchData();



}

catch(error){


toast.error(

error.response?.data?.message ||

"Failed to Generate Seating"

);


}

finally{


setLoading(false);


}



};

// ==============================
// Clear Seating
// ==============================


const handleClear=async()=>{


const confirmDelete =
window.confirm(
"Delete All Seating Arrangement?"
);



if(!confirmDelete)
return;



try{


const res =
await clearSeating();



toast.success(
res.data.message ||
"Seating Cleared Successfully"
);



setSeating([]);


fetchData();



}

catch(error){


console.log(error);


toast.error(
"Failed to Clear Seating"
);


}



};





return (


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



{/* Heading */}



<div className="
flex
items-center
gap-4
mb-8
">


<FaChair

size={40}

className="
text-blue-900
dark:text-blue-400
"

/>



<div>


<h1 className="
text-3xl
md:text-4xl
font-bold
text-blue-900
dark:text-white
">


Generate Seating Arrangement


</h1>



<p className="
text-gray-500
dark:text-gray-300
mt-1
">


Create and manage exam seating arrangement


</p>



</div>


</div>






{/* Selection Card */}



<div className="

bg-white

dark:bg-gray-900

rounded-2xl

shadow-xl

p-5

md:p-8

"

>



<div className="
grid
grid-cols-1
md:grid-cols-3
gap-6
">


{/* Exam */}



<div>


<label className="
block
font-semibold
text-gray-700
dark:text-gray-200
mb-2
">


Select Exam


</label>



<select

value={selectedExam}

onChange={(e)=>setSelectedExam(e.target.value)}

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

>


<option value="">
Choose Exam
</option>



{

exams.map((exam)=>(


<option

key={exam._id}

value={exam._id}

>


{exam.subject}


</option>


))


}



</select>


</div>








{/* Room */}



<div>


<label className="
block
font-semibold
text-gray-700
dark:text-gray-200
mb-2
">


Select Room


</label>



<select

value={selectedRoom}

onChange={(e)=>setSelectedRoom(e.target.value)}

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

>


<option value="">
Choose Room
</option>



{

rooms.map((room)=>(


<option

key={room._id}

value={room._id}

>


{room.roomNo}
({room.capacity} Seats)


</option>


))


}



</select>


</div>










{/* Invigilator */}



<div>


<label className="
block
font-semibold
text-gray-700
dark:text-gray-200
mb-2
">


Assign Invigilator


</label>



<select

value={selectedInvigilator}

onChange={(e)=>setSelectedInvigilator(e.target.value)}

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

>


<option value="">
Choose Invigilator
</option>



{

invigilators.map((item)=>(


<option

key={item._id}

value={item._id}

>


{item.name}


</option>


))


}



</select>


</div>



</div>








{/* Buttons */}



<div className="

mt-8

flex

flex-wrap

gap-4

"


>



<button

onClick={handleGenerate}

disabled={loading}

className={`
px-6
py-3
rounded-lg
text-white
flex
items-center
gap-2
font-semibold
transition

${
loading

?

"bg-gray-500 cursor-not-allowed"

:

"bg-green-600 hover:bg-green-700"

}

`}

>


<FaChair/>


{

loading

?

"Generating..."

:

"Generate Seating"

}



</button>





<button

onClick={handleClear}

className="
bg-red-600
hover:bg-red-700
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
font-semibold
"


>


<FaTrash/>


Clear Seating


</button>





<button

onClick={()=>window.print()}

className="
bg-blue-700
hover:bg-blue-800
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
font-semibold
"


>


<FaPrint/>

Print


</button>




<button

onClick={()=>exportSeatingPDF(seating)}

className="
bg-purple-700
hover:bg-purple-800
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
font-semibold
"


>


<FaFilePdf/>

PDF


</button>





<button

onClick={()=>exportSeatingExcel(seating)}

className="
bg-green-700
hover:bg-green-800
text-white
px-6
py-3
rounded-lg
flex
items-center
gap-2
font-semibold
"


>


<FaFileExcel/>

Excel


</button>



</div>



</div>

{/* Seating Table */}


<div className="

mt-10

bg-white

dark:bg-gray-900

rounded-2xl

shadow-xl

overflow-hidden

transition-colors

"

>


<div className="

p-5

md:p-6

border-b

dark:border-gray-700

"


>


<h2 className="

text-2xl

font-bold

text-blue-900

dark:text-white

"


>


Generated Seating Arrangement


</h2>


</div>





<div className="
overflow-x-auto
">


<table className="
w-full
min-w-[900px]
">


<thead className="
bg-blue-900
dark:bg-blue-950
text-white
">


<tr>


<th className="p-4">
Seat No
</th>


<th>
Roll No
</th>


<th>
Student Name
</th>


<th>
Room
</th>


<th>
Exam
</th>


<th>
Invigilator
</th>



</tr>


</thead>





<tbody>


{


seating.length > 0 ?


seating.map((item)=>(



<tr

key={item._id}

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



<td className="
p-4
font-semibold
">


{item.seatNumber || "-"}


</td>



<td>


{item.student?.roll || "-"}


</td>



<td>


{item.student?.name || "-"}


</td>



<td>


{item.room?.roomNo || "-"}


</td>



<td>


{item.exam?.subject || "-"}


</td>



<td>


{item.invigilator?.name || "Not Assigned"}


</td>




</tr>



))





:



<tr>


<td

colSpan="6"

className="
py-12
text-center
text-gray-500
dark:text-gray-300
text-lg
"


>


No Seating Generated


</td>



</tr>



}



</tbody>



</table>



</div>



</div>






{/* Summary Card */}



<div className="

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

gap-4

transition-colors

"


>


<div>


<h3 className="
font-semibold
text-gray-700
dark:text-gray-200
">


Total Seats Generated


</h3>


<p className="
text-3xl
font-bold
text-blue-700
"


>


{seating.length}


</p>


</div>





<div>


<h3 className="
font-semibold
text-gray-700
dark:text-gray-200
">


Available Exams


</h3>


<p className="
text-3xl
font-bold
text-green-700
">


{exams.length}


</p>


</div>





<div>


<h3 className="
font-semibold
text-gray-700
dark:text-gray-200
">


Available Rooms


</h3>


<p className="
text-3xl
font-bold
text-purple-700
">


{rooms.length}


</p>


</div>




</div>





</div>


);


}


export default GenerateSeating;