import { 
  useEffect,
  useState
} from "react";


import {
  FaUsers,
  FaBook,
  FaUniversity,
  FaUserTie,
  FaDownload,
  FaPrint,
  FaFileCsv,
} from "react-icons/fa";


import toast from "react-hot-toast";


import StatisticsChart from "../components/charts/StatisticsChart";


import exportPDF from "../utils/exportPDF";
import exportExcel from "../utils/exportExcel";


import { getReport } from "../services/reportApi";





function Reports(){



const [loading,setLoading]=useState(true);



const [summary,setSummary]=useState({

totalStudents:0,
totalRooms:0,
totalExams:0,
totalInvigilators:0,
totalSeating:0,

});



const [reports,setReports]=useState([]);






// ===============================
// Fetch Report
// ===============================


const fetchReport = async()=>{


try{


const res = await getReport();


setSummary(
 res.data.summary || {}
);


setReports(
 res.data.reports || []
);


}

catch(error){


console.log(error);


toast.error(
"Failed To Load Reports"
);


}

finally{

setLoading(false);

}


};





useEffect(()=>{


fetchReport();


},[]);








// ===============================
// PDF Export
// ===============================


const handleExportPDF=()=>{


const columns=[

"Module",
"Total"

];



const rows=[


[
"Students",
summary.totalStudents
],


[
"Rooms",
summary.totalRooms
],


[
"Exams",
summary.totalExams
],


[
"Invigilators",
summary.totalInvigilators
],


[
"Generated Seating",
summary.totalSeating
]


];



exportPDF(

"Exam Seating Report",

columns,

rows

);


};







// ===============================
// Excel Export
// ===============================


const handleExportExcel=()=>{


const data=[


{
Module:"Students",
Total:summary.totalStudents
},


{
Module:"Rooms",
Total:summary.totalRooms
},


{
Module:"Exams",
Total:summary.totalExams
},


{
Module:"Invigilators",
Total:summary.totalInvigilators
},


{
Module:"Generated Seating",
Total:summary.totalSeating
}


];



exportExcel(

"Exam Seating Report",

data

);



};







// ===============================
// CSV Export
// ===============================


const handleDownloadCSV=()=>{


let csv = 
"Student,Roll No,Room,Exam,Invigilator,Seat Number\n";



reports.forEach((item)=>{


csv +=

`${item.student?.name || ""},`+

`${item.student?.roll || ""},`+

`${item.room?.roomNo || ""},`+

`${item.exam?.subject || ""},`+

`${item.invigilator?.name || ""},`+

`${item.seatNumber || ""}\n`;



});





const blob = new Blob(

[csv],

{
type:"text/csv"
}

);



const url = URL.createObjectURL(blob);



const link=document.createElement("a");


link.href=url;


link.download="Exam_Report.csv";


link.click();



URL.revokeObjectURL(url);



};








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


<h2 className="
text-xl
font-semibold
text-blue-700
">

Loading Reports...

</h2>


</div>


);


}

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


<div

className="
flex

flex-col

lg:flex-row

justify-between

items-start

lg:items-center

gap-5

mb-10

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

Reports & Analytics

</h1>



<p

className="
text-gray-500

dark:text-gray-300

mt-2

"

>

Complete Exam Seating Arrangement Analysis

</p>


</div>






{/* Buttons */}



<div

className="
print-hide

flex

flex-wrap

gap-3

"

>



<button

onClick={handleExportPDF}

className="
bg-red-600

hover:bg-red-700

text-white

px-5

py-3

rounded-lg

flex

items-center

gap-2

transition

"

>

<FaDownload/>

PDF

</button>







<button

onClick={handleExportExcel}

className="
bg-green-600

hover:bg-green-700

text-white

px-5

py-3

rounded-lg

flex

items-center

gap-2

transition

"

>


<FaDownload/>

Excel


</button>







<button

onClick={handleDownloadCSV}

className="
bg-emerald-600

hover:bg-emerald-700

text-white

px-5

py-3

rounded-lg

flex

items-center

gap-2

transition

"

>


<FaFileCsv/>

CSV


</button>







<button

onClick={()=>window.print()}

className="
bg-blue-700

hover:bg-blue-800

text-white

px-5

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



</div>









{/* Summary Cards */}



<div

className="
grid

grid-cols-1

sm:grid-cols-2

lg:grid-cols-4

gap-6

"

>



{


[


{

title:"Total Students",

value:summary.totalStudents,

icon:<FaUsers size={35}/>,

color:"bg-blue-600"

},



{

title:"Total Exams",

value:summary.totalExams,

icon:<FaBook size={35}/>,

color:"bg-green-600"

},




{

title:"Total Rooms",

value:summary.totalRooms,

icon:<FaUniversity size={35}/>,

color:"bg-purple-600"

},




{

title:"Invigilators",

value:summary.totalInvigilators,

icon:<FaUserTie size={35}/>,

color:"bg-orange-600"

}



].map((card,index)=>(


<div

key={index}

className={`
${card.color}

text-white

rounded-2xl

shadow-lg

p-6

hover:-translate-y-2

transition

`}

>


<div

className="
flex

justify-between

items-center

"

>


<div>


<h3 className="text-lg">

{card.title}

</h3>



<h2

className="
text-4xl

font-bold

mt-3

"

>

{card.value}

</h2>


</div>



{card.icon}



</div>



</div>



))


}



</div>









{/* Chart */}



<div className="mt-10">


<StatisticsChart

summary={summary}

/>


</div>









{/* Reports Table */}



<div

className="
mt-10

bg-white

dark:bg-gray-900

rounded-2xl

shadow-lg

overflow-x-auto

"

>



<div

className="
bg-blue-900

text-white

p-5

"

>


<h2

className="
text-2xl

font-bold

"

>

Recent Examination Reports

</h2>


</div>








<table className="w-full">



<thead

className="
bg-gray-200

dark:bg-gray-800

dark:text-white

"

>


<tr>


<th className="p-4">

Seat

</th>


<th>

Student

</th>


<th>

Roll No

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


reports.length > 0 ?



reports.map((item)=>(


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


<td className="
p-4

font-semibold

"

>

{item.seatNumber}

</td>




<td>

{item.student?.name || "N/A"}

</td>





<td>

{item.student?.roll || "N/A"}

</td>





<td>

{item.room?.roomNo || "N/A"}

</td>





<td>

{item.exam?.subject || "N/A"}

</td>





<td>

{item.invigilator?.name || "Not Assigned"}

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

text-lg

"

>

No Reports Available

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
mt-8

bg-white

dark:bg-gray-900

rounded-xl

shadow-lg

p-6

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


<span className="
text-blue-700

dark:text-blue-400

mx-2

">

{reports.length}

</span>


Report Records


</p>







<div>


<span

className="
bg-blue-100

text-blue-800

px-5

py-2

rounded-lg

font-semibold

"

>

Total Seating : {summary.totalSeating}

</span>


</div>





</div>






</div>


);


}


export default Reports;