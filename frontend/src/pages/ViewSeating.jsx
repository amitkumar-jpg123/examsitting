import { useEffect, useState } from "react";

import {
  FaChair,
  FaPrint,
  FaSearch,
} from "react-icons/fa";

import { getSeating } from "../services/seatingApi";


function ViewSeating() {


const [seating,setSeating] = useState([]);

const [loading,setLoading] = useState(true);

const [search,setSearch] = useState("");




// ==========================
// Fetch Seating
// ==========================

const fetchSeating = async()=>{


try{


const res = await getSeating();


setSeating(
  res.data.seating || []
);


}
catch(error){

console.log(error);

}
finally{

setLoading(false);

}


};





useEffect(()=>{

fetchSeating();

},[]);





// ==========================
// Search Filter
// ==========================


const filteredSeating = seating.filter((item)=>{


return(

item.student?.roll
?.toLowerCase()
.includes(search.toLowerCase())

||

item.student?.name
?.toLowerCase()
.includes(search.toLowerCase())

||

item.room?.roomNo
?.toLowerCase()
.includes(search.toLowerCase())


);


});






if(loading){


return(

<div className="
min-h-screen
flex
items-center
justify-center
bg-gray-100
dark:bg-gray-950
">


<div className="
text-xl
font-semibold
text-blue-700
">

Loading Seating Arrangement...

</div>


</div>

);


}







return(



<div

className="
print-area
min-h-screen

bg-gray-100
dark:bg-gray-950

p-4
md:p-8

transition-colors
"

>





{/* Header */}



<div

className="
flex
flex-col
md:flex-row

justify-between

items-start
md:items-center

gap-5

mb-8
"

>


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

View Seating Arrangement

</h1>


<p className="
text-gray-500
dark:text-gray-300
mt-2
">

Generated Examination Seating Details

</p>


</div>





<button

onClick={()=>window.print()}

className="
print-hide

bg-green-600
hover:bg-green-700

text-white

px-6
py-3

rounded-lg

flex
items-center
gap-2

transition

"

>


<FaPrint/>

Print


</button>



</div>









{/* Search */}



<div className="
print-hide

bg-white
dark:bg-gray-900

rounded-xl

shadow-lg

p-5

mb-8

">


<div className="
flex
items-center
gap-3
">


<FaSearch className="
text-blue-700
"/>



<input

type="text"

placeholder="Search Roll No, Name or Room..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full

outline-none

bg-transparent

dark:text-white

"

/>


</div>


</div>









{/* Classroom Layout */}




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

font-bold

text-center

text-blue-900

dark:text-white

mb-8

"

>

Classroom Layout

</h2>







<div

className="
bg-blue-900

text-white

text-center

py-4

rounded-lg

mb-10

text-xl

font-bold

"

>

Teacher Desk

</div>








{

filteredSeating.length > 0 ? (



<div

className="
grid

grid-cols-1

sm:grid-cols-2

md:grid-cols-4

gap-6

"

>


{

filteredSeating.map((item)=>(



<div

key={item._id}

className="
border-2

border-blue-900

dark:border-blue-400

rounded-xl

p-5

text-center

hover:shadow-lg

transition

"

>


<FaChair

size={35}

className="
mx-auto

text-blue-700

dark:text-blue-400

mb-3

"

/>


<h3 className="
font-bold
dark:text-white
">

Seat {item.seatNumber}

</h3>



<p className="
dark:text-gray-300
">

{item.student?.roll || "N/A"}

</p>



<p className="
dark:text-gray-300
">

{item.student?.name || "Empty"}

</p>



</div>


))


}



</div>


)

:(


<div className="
text-center

py-10

text-gray-500

dark:text-gray-300

text-lg

">

No Seating Generated

</div>


)


}





</div>









{/* Seating Table */}



<div

className="
bg-white

dark:bg-gray-900

rounded-xl

shadow-lg

mt-10

overflow-x-auto

"

>


<table className="w-full">



<thead

className="
bg-blue-900

text-white

"

>


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


filteredSeating.length > 0 ? (


filteredSeating.map((item)=>(


<tr

key={item._id}

className="
text-center

border-b

dark:border-gray-700

dark:text-gray-200

hover:bg-blue-50

dark:hover:bg-gray-800

transition

"

>



<td className="p-4 font-semibold">

{item.seatNumber}

</td>



<td>

{item.student?.roll}

</td>



<td>

{item.student?.name}

</td>



<td>

{item.room?.roomNo}

</td>



<td>

{item.exam?.subject}

</td>



<td>

{item.invigilator?.name || "Not Assigned"}

</td>



</tr>



))


)

:(


<tr>

<td

colSpan="6"

className="
py-10

text-center

text-gray-500

"

>

No Records Found

</td>


</tr>


)



}



</tbody>



</table>



</div>







</div>


);


}


export default ViewSeating;