import { useState } from "react";
import toast from "react-hot-toast";

import { createIncident } from "../../services/incidentApi";


function ReportIncident() {


  const [incidentType, setIncidentType] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);



  // Get Logged In Invigilator

  const invigilator =
    JSON.parse(
      localStorage.getItem("invigilator")
    );




  const handleSubmit = async(e)=>{

    e.preventDefault();


    if(!incidentType || !description){

      toast.error(
        "Please fill all fields"
      );

      return;

    }


    try{

      setLoading(true);



      const data = {

        invigilator:
          invigilator._id,

        employeeId:
          invigilator.employeeId,

        invigilatorName:
          invigilator.name,

        incidentType,

        description

      };



      const response =
        await createIncident(data);



      if(response.data.success){

        toast.success(
          "Incident Report Submitted Successfully"
        );


        setIncidentType("");

        setDescription("");

      }



    }
    catch(error){


      toast.error(

        error.response?.data?.message ||
        "Failed to submit report"

      );


    }
    finally{

      setLoading(false);

    }


  };





return(

<div
className="
min-h-screen
bg-gray-100
dark:bg-gray-900
p-6
">


<div
className="
max-w-3xl
mx-auto
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-8
">


<h1
className="
text-3xl
font-bold
text-red-600
mb-6
"
>

🚨 Report Incident

</h1>



<form
onSubmit={handleSubmit}
>


<label
className="
block
font-semibold
mb-2
dark:text-white
"
>
Incident Type
</label>


<select

value={incidentType}

onChange={
(e)=>setIncidentType(
e.target.value
)
}

className="
w-full
border
rounded-lg
p-3
mb-5
"

>

<option value="">
Select Incident Type
</option>

<option>
Cheating
</option>

<option>
Medical Emergency
</option>

<option>
Late Arrival
</option>

<option>
Power Failure
</option>

<option>
Misconduct
</option>

<option>
Other
</option>


</select>





<label
className="
block
font-semibold
mb-2
dark:text-white
"
>
Description
</label>


<textarea

value={description}

onChange={
(e)=>setDescription(
e.target.value
)
}

placeholder="
Describe incident...
"

className="
w-full
border
rounded-lg
p-4
h-40
mb-5
"

required

/>





<button

disabled={loading}

className="
bg-red-600
hover:bg-red-700
disabled:bg-gray-400
text-white
px-6
py-3
rounded-lg
font-semibold
"

>


{

loading
?
"Submitting..."
:
"Submit Report"

}


</button>



</form>


</div>


</div>

);


}


export default ReportIncident;