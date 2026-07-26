import {
  useState,
  useEffect
} from "react";


import {
  useNavigate
} from "react-router-dom";


import {
  getInvigilatorDashboard
} from "../services/invigilatorApi";



function InvigilatorDashboard(){


const navigate = useNavigate();



const [dashboard,setDashboard] = useState({

  name:"",
  employeeId:"",
  department:"",
  todayDuty:0,
  assignedExams:0,
  upcomingDuties:0,
  completedDuties:0

});



const [loading,setLoading] = useState(true);





// =============================
// Get Logged Invigilator
// =============================

const getInvigilator = ()=>{


const data =
localStorage.getItem("invigilator");



if(!data || data==="undefined")
{
return null;
}



try{

return JSON.parse(data);


}
catch(error){


console.log(
"Invalid Storage Data"
);


localStorage.removeItem(
"invigilator"
);


return null;


}


};






// =============================
// Fetch Dashboard Data
// =============================


useEffect(()=>{


const loadDashboard = async()=>{


try{


const invigilator =
getInvigilator();



if(!invigilator)
{

navigate(
"/invigilator-login"
);


return;

}



const id =
invigilator._id;



const response =
await getInvigilatorDashboard(id);




if(response.data.success)
{

setDashboard(
response.data.data
);


}



}
catch(error){


console.log(
"Dashboard Error",
error
);


}
finally{

setLoading(false);

}


};



loadDashboard();



},[navigate]);



// =============================
// UI
// =============================


return (

<div>


{/* Header Section */}


<div
className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
mb-6
"
>


<h1
className="
text-3xl
font-bold
text-gray-800
dark:text-white
"
>

Welcome,

{" "}

{
dashboard.name || "Invigilator"
}


</h1>



<p
className="
mt-2
text-gray-500
dark:text-gray-400
"
>

Manage your examination duties and activities

</p>




<p
className="
mt-3
font-semibold
text-blue-600
"
>

Employee ID:

{" "}

{
dashboard.employeeId || "N/A"
}


</p>




<p
className="
font-semibold
text-green-600
"
>

Department:

{" "}

{
dashboard.department || "N/A"
}


</p>



</div>





{/* Loading */}



{
loading &&

<div
className="
text-center
text-blue-600
font-semibold
mb-5
"
>

Loading Dashboard...

</div>

}





{/* Dashboard Cards */}


<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-6
"
>





{/* Today's Duty */}


<div
className="
bg-white
dark:bg-gray-800
p-6
rounded-xl
shadow
border-l-4
border-blue-600
"
>


<h3
className="
text-gray-500
dark:text-gray-400
font-semibold
"
>

Today's Duty

</h3>



<p
className="
text-4xl
font-bold
text-blue-700
mt-3
"
>

{
dashboard.todayDuty
}

</p>


</div>







{/* Assigned Exams */}



<div
className="
bg-white
dark:bg-gray-800
p-6
rounded-xl
shadow
border-l-4
border-green-600
"
>


<h3
className="
text-gray-500
dark:text-gray-400
font-semibold
"
>

Assigned Exams

</h3>



<p
className="
text-4xl
font-bold
text-green-600
mt-3
"
>

{
dashboard.assignedExams
}

</p>


</div>







{/* Upcoming Duties */}



<div
className="
bg-white
dark:bg-gray-800
p-6
rounded-xl
shadow
border-l-4
border-yellow-500
"
>


<h3
className="
text-gray-500
dark:text-gray-400
font-semibold
"
>

Upcoming Duties

</h3>



<p
className="
text-4xl
font-bold
text-yellow-600
mt-3
"
>

{
dashboard.upcomingDuties
}

</p>


</div>







{/* Completed Duties */}



<div
className="
bg-white
dark:bg-gray-800
p-6
rounded-xl
shadow
border-l-4
border-purple-600
"
>


<h3
className="
text-gray-500
dark:bg-gray-400
font-semibold
"
>

Completed Duties

</h3>



<p
className="
text-4xl
font-bold
text-purple-600
mt-3
"
>

{
dashboard.completedDuties
}

</p>


</div>





</div>





{/* Today's Exam Duty */}



<div
className="
mt-8
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
"
>


<h2
className="
text-xl
font-bold
text-gray-800
dark:text-white
mb-5
"
>

Today's Exam Duty

</h2>





<div
className="
grid
md:grid-cols-3
gap-5
"
>





<div>

<p
className="
text-gray-500
dark:text-gray-400
"
>

Subject

</p>


<h3
className="
font-semibold
dark:text-white
"
>

Data Structures

</h3>


</div>







<div>

<p
className="
text-gray-500
dark:text-gray-400
"
>

Room

</p>


<h3
className="
font-semibold
dark:text-white
"
>

Room 101

</h3>


</div>







<div>

<p
className="
text-gray-500
dark:text-gray-400
"
>

Time

</p>


<h3
className="
font-semibold
dark:text-white
"
>

09:00 AM - 12:00 PM

</h3>


</div>





</div>


</div>





</div>

);


}



export default InvigilatorDashboard;