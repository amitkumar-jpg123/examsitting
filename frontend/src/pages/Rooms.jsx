import { useEffect, useState } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileExcel,
  FaDoorOpen,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getRooms,
  addRoom,
  updateRoom,
  deleteRoom,
} from "../services/roomApi";

import { exportToExcel } from "../utils/exportToExcel";





function Rooms(){



const [rooms,setRooms] = useState([]);



const [form,setForm] = useState({

roomNo:"",
block:"",
capacity:"",

});



const [editingId,setEditingId] = useState(null);



const [search,setSearch] = useState("");







// ===============================
// Fetch Rooms
// ===============================


const fetchRooms = async()=>{


try{


const res = await getRooms();



setRooms(

res.data.rooms || []

);



}

catch(error){


console.log(error);


}


};






useEffect(()=>{


fetchRooms();


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
// Add / Update Room
// ===============================


const handleSubmit=async(e)=>{


e.preventDefault();




if(
!form.roomNo ||
!form.block ||
!form.capacity
){


toast.error(
"Please Fill All Fields"
);


return;


}




try{


if(editingId){



await updateRoom(
editingId,
form
);



toast.success(
"Room Updated Successfully"
);



}

else{


await addRoom(form);



toast.success(
"Room Added Successfully"
);



}




setForm({

roomNo:"",
block:"",
capacity:"",

});



setEditingId(null);



fetchRooms();



}


catch(error){


console.log(error);



toast.error(
"Something Went Wrong"
);


}



};











// ===============================
// Edit Room
// ===============================


const editRoom=(room)=>{


setEditingId(
room._id
);



setForm({

roomNo:room.roomNo,

block:room.block,

capacity:room.capacity,

});



window.scrollTo({

top:0,

behavior:"smooth"

});


};









// ===============================
// Delete Room
// ===============================



const handleDelete=async(id)=>{



const confirmDelete = window.confirm(

"Delete this room?"

);



if(!confirmDelete)
return;




try{


await deleteRoom(id);



toast.success(
"Room Deleted Successfully"
);



fetchRooms();



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

roomNo:"",
block:"",
capacity:"",

});


};











// ===============================
// Export Excel
// ===============================


const handleExport=()=>{



const data = rooms

.filter((room)=>{


return(

room.roomNo
.toLowerCase()
.includes(search.toLowerCase())


||

room.block
.toLowerCase()
.includes(search.toLowerCase())


||

room.capacity
.toString()
.includes(search)


);


})


.map((room)=>({


Room:room.roomNo,


Block:room.block,


Capacity:room.capacity,


}));




exportToExcel(

data,

"Rooms"

);



};









// ===============================
// Search
// ===============================


const filteredRooms = rooms.filter(
(room)=>{


return(


room.roomNo
.toLowerCase()
.includes(search.toLowerCase())


||

room.block
.toLowerCase()
.includes(search.toLowerCase())


||

room.capacity
.toString()
.includes(search)



);


}

);









return(



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






<div

className="
flex
items-center
gap-4
mb-6
"

>


<FaDoorOpen

size={35}

className="
text-blue-800
dark:text-blue-400
"

/>




<h1

className="
text-2xl
sm:text-3xl
lg:text-4xl
font-bold
text-blue-900
dark:text-white
"

>

Room Management

</h1>



</div>









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

"Update Room"

:

"Add Room"

}



</h2>







<form

onSubmit={handleSubmit}

className="
grid
grid-cols-1
md:grid-cols-3
gap-5
"

>






<input

type="text"

name="roomNo"

placeholder="Room Number"

value={form.roomNo}

onChange={handleChange}

className="
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

name="block"

placeholder="Block"

value={form.block}

onChange={handleChange}

className="
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

type="number"

name="capacity"

placeholder="Capacity"

value={form.capacity}

onChange={handleChange}

className="
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
md:col-span-3
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

"Update Room"

:

"Add Room"

}


</button>








<button

type="button"

onClick={resetForm}

className="
md:col-span-3
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

Room List

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

placeholder="Search Room / Block..."

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
min-w-[650px]
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
Room No
</th>


<th>
Block
</th>


<th>
Capacity
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

filteredRooms.length > 0 ?


filteredRooms.map((room)=>(



<tr

key={room._id}

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

{room.roomNo}

</td>





<td>

{room.block}

</td>






<td>

{room.capacity}

</td>







<td>


<button

onClick={()=>editRoom(room)}

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

onClick={()=>handleDelete(room._id)}

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

colSpan="5"

className="
py-10
text-center
text-gray-500
dark:text-gray-300
"

>

No Rooms Found

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

filteredRooms.length > 0 ?


filteredRooms.map((room)=>(



<div

key={room._id}

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
items-center
"

>




<div>


<h3

className="
text-xl
font-bold
text-blue-900
dark:text-white
"

>

Room {room.roomNo}

</h3>




<p

className="
text-gray-500
dark:text-gray-400
mt-2
"

>

Block :
{room.block}

</p>




<p

className="
text-gray-500
dark:text-gray-400
"

>

Capacity :
{room.capacity}

</p>




</div>








<div

className="
flex
gap-2
"

>


<button

onClick={()=>editRoom(room)}

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

onClick={()=>handleDelete(room._id)}

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

No Rooms Found

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

{filteredRooms.length}

</span>


of


<span

className="
mx-2
text-green-700
dark:text-green-400
"

>

{rooms.length}

</span>


Rooms


</p>



</div>





</div>


);


}



export default Rooms;