import { useState, useEffect } from "react";

import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFileExcel,
  FaUserTie,
} from "react-icons/fa";

import toast from "react-hot-toast";

import { exportToExcel } from "../utils/exportToExcel";

import {
  getInvigilators,
  addInvigilator,
  updateInvigilator,
  deleteInvigilator,
} from "../services/invigilatorApi";



function Invigilators() {


  const [invigilators, setInvigilators] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);



  const [form,setForm] = useState({

    employeeId:"",
    name:"",
    email:"",
    phone:"",
    department:"",
    password:"",

  });



  // ===============================
  // Fetch Invigilators
  // ===============================


  const fetchInvigilators = async()=>{


    try{


      setLoading(true);


      const res = await getInvigilators();


      setInvigilators(
        res.data.invigilators || []
      );


    }
    catch(error){


      console.log(error);


      toast.error(
        "Failed to load invigilators"
      );


    }
    finally{


      setLoading(false);


    }


  };



  useEffect(()=>{


    fetchInvigilators();


  },[]);






  // ===============================
  // Input Handler
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
      !form.employeeId ||
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.department ||
      (!editingId && !form.password)
    ){

      toast.error(
        "Please fill all fields"
      );

      return;

    }



    try{


      if(editingId){


        await updateInvigilator(
          editingId,
          form
        );


        toast.success(
          "Invigilator updated successfully"
        );


      }
      else{


        await addInvigilator(form);


        toast.success(
          "Invigilator added successfully"
        );


      }



      resetForm();


      fetchInvigilators();



    }
    catch(error){


      console.log(error);


      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );


    }



  };








  // ===============================
  // Edit
  // ===============================


  const editInvigilator=(item)=>{


    setEditingId(item._id);



    setForm({

      employeeId:item.employeeId || "",

      name:item.name || "",

      email:item.email || "",

      phone:item.phone || "",

      department:item.department || "",

      password:"",

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


    const confirmDelete =
      window.confirm(
        "Delete this invigilator?"
      );



    if(!confirmDelete)
      return;




    try{


      await deleteInvigilator(id);



      toast.success(
        "Invigilator deleted successfully"
      );



      fetchInvigilators();



    }
    catch(error){


      console.log(error);


      toast.error(
        "Delete failed"
      );


    }


  };






  // ===============================
  // Reset
  // ===============================


  const resetForm=()=>{


    setEditingId(null);


    setForm({

      employeeId:"",

      name:"",

      email:"",

      phone:"",

      department:"",

      password:"",

    });


  };






  // ===============================
  // Search
  // ===============================


  const filteredInvigilators =
  invigilators.filter((item)=>{


    return (

      item.employeeId
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )


      ||


      item.name
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )


      ||


      item.email
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )


      ||


      item.phone
      ?.includes(search)



      ||


      item.department
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )


    );


  });







  // ===============================
  // Export Excel
  // ===============================


  const handleExport=()=>{


    const data =
    filteredInvigilators.map((item)=>({


      Employee_ID:item.employeeId,

      Name:item.name,

      Email:item.email,

      Phone:item.phone,

      Department:item.department,


    }));



    exportToExcel(
      data,
      "Invigilators"
    );


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
"


>


{/* Header */}


<div className="
flex
items-center
gap-4
mb-8
">


<FaUserTie

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


Invigilator Management


</h1>


<p className="
text-gray-500
dark:text-gray-300
mt-1
">


Add, Update and Manage Invigilators


</p>


</div>



</div>

{/* Form */}


<div className="
bg-white
dark:bg-gray-900
rounded-xl
shadow-lg
p-5
md:p-8
transition
">


<h2 className="
text-2xl
font-semibold
text-gray-800
dark:text-white
mb-6
">


{editingId
?
"Update Invigilator"
:
"Add Invigilator"}


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


{[

{
name:"employeeId",
placeholder:"Employee ID",
type:"text"
},

{
name:"name",
placeholder:"Invigilator Name",
type:"text"
},

{
name:"email",
placeholder:"Email Address",
type:"email"
},

{
name:"phone",
placeholder:"Phone Number",
type:"text"
},

{
name:"department",
placeholder:"Department",
type:"text"
}

].map((input,index)=>(


<input

key={index}

type={input.type}

name={input.name}

placeholder={input.placeholder}

value={form[input.name]}

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


))}




{
!editingId && (


<input

type="password"

name="password"

placeholder="Password"

value={form.password}

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


)

}





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
"Update Invigilator"
:
"Add Invigilator"
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



<div className="

mt-10

flex

flex-col

lg:flex-row

justify-between

gap-4

">


<h2 className="
text-2xl
font-bold
text-blue-900
dark:text-white
">


Invigilator List


</h2>





<div className="
flex
flex-col
sm:flex-row
gap-3
w-full
lg:w-auto
">


<div className="
flex
items-center
bg-white
dark:bg-gray-900
shadow-lg
rounded-xl
px-4
py-3
w-full
sm:w-96
">


<FaSearch

className="
text-blue-700
mr-3
"

/>



<input

type="text"

placeholder="Search Invigilator..."

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



<div className="
mt-8
bg-white
dark:bg-gray-900
rounded-xl
shadow-lg
overflow-x-auto
">


<table className="w-full">


<thead className="
bg-blue-900
text-white
">


<tr>


<th className="p-4">
Employee ID
</th>


<th>
Name
</th>


<th>
Email
</th>


<th>
Phone
</th>


<th>
Department
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


loading ? (


<tr>

<td

colSpan="7"

className="
text-center
py-10
text-gray-500
"

>

Loading...


</td>


</tr>



)


:



filteredInvigilators.length > 0 ?


filteredInvigilators.map((item)=>(


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


{item.employeeId}


</td>


<td>
{item.name}
</td>


<td>
{item.email}
</td>


<td>
{item.phone}
</td>


<td>
{item.department}
</td>





<td>


<button

onClick={()=>editInvigilator(item)}

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

onClick={()=>handleDelete(item._id)}

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


No Invigilators Found


</td>


</tr>


}



</tbody>



</table>



</div>








{/* Footer */}



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
items-center
">


<p className="
font-semibold
text-gray-700
dark:text-gray-200
">


Showing


<span className="
text-blue-700
mx-2
">


{filteredInvigilators.length}


</span>


of


<span className="
text-green-700
mx-2
">


{invigilators.length}


</span>


Invigilators


</p>




<span className="
mt-3
md:mt-0
bg-blue-100
text-blue-800
px-4
py-2
rounded-lg
font-semibold
">


Total Invigilators : {invigilators.length}


</span>



</div>




</div>


  );


}


export default Invigilators;