import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";



function DashboardCharts({ summary }) {



  const barData = [

    {
      name:"Students",
      value:summary?.totalStudents || 0,
    },

    {
      name:"Rooms",
      value:summary?.totalRooms || 0,
    },

    {
      name:"Exams",
      value:summary?.totalExams || 0,
    },

    {
      name:"Invigilators",
      value:summary?.totalInvigilators || 0,
    },

    {
      name:"Seating",
      value:summary?.totalSeating || 0,
    },

  ];






  const pieData = barData;





  const COLORS = [

    "#2563EB",
    "#16A34A",
    "#9333EA",
    "#F97316",
    "#DC2626",

  ];





  const isDark =
    document.documentElement.classList.contains("dark");




  const textColor = isDark
    ? "#ffffff"
    : "#374151";





  const tooltipStyle = {


    backgroundColor:
      isDark
      ? "#111827"
      : "#ffffff",


    border:
      "1px solid #374151",


    borderRadius:
      "12px",


    color:textColor,


  };







  return (



<div

className="
grid
grid-cols-1
xl:grid-cols-2
gap-6
mt-8
"

>









{/* BAR CHART */}



<div

className="
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
p-4
sm:p-6
transition-colors
duration-300
overflow-hidden
"

>



<h2

className="
text-xl
sm:text-2xl
font-bold
text-blue-900
dark:text-white
mb-5
"

>

System Overview

</h2>





<div

className="
w-full
h-[280px]
sm:h-[350px]
"

>



<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={barData}

margin={{

top:10,

right:10,

left:-15,

bottom:10

}}

>



<CartesianGrid

strokeDasharray="3 3"

stroke={
isDark
?
"#374151"
:
"#d1d5db"
}

/>





<XAxis

dataKey="name"

tick={{

fill:textColor,

fontSize:12

}}

/>




<YAxis

tick={{

fill:textColor,

fontSize:12

}}

/>




<Tooltip

contentStyle={tooltipStyle}

/>




<Legend

wrapperStyle={{

fontSize:"12px"

}}

/>





<Bar

dataKey="value"

fill="#2563EB"

radius={[8,8,0,0]}

animationDuration={800}

/>





</BarChart>


</ResponsiveContainer>



</div>



</div>














{/* PIE CHART */}




<div

className="
bg-white
dark:bg-gray-900
rounded-2xl
shadow-lg
p-4
sm:p-6
transition-colors
duration-300
overflow-hidden
"

>




<h2

className="
text-xl
sm:text-2xl
font-bold
text-blue-900
dark:text-white
mb-5
"

>

Distribution

</h2>







<div

className="
w-full
h-[280px]
sm:h-[350px]
"

>



<ResponsiveContainer

width="100%"

height="100%"

>



<PieChart>



<Pie


data={pieData}

dataKey="value"

nameKey="name"

cx="50%"

cy="50%"

outerRadius="75%"

label={false}


>



{

pieData.map((entry,index)=>(



<Cell

key={index}

fill={
COLORS[index % COLORS.length]
}

/>


))


}



</Pie>





<Tooltip

contentStyle={tooltipStyle}

/>





<Legend

wrapperStyle={{

fontSize:"12px"

}}

/>





</PieChart>



</ResponsiveContainer>


</div>






</div>









</div>



  );

}



export default DashboardCharts;