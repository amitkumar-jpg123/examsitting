import {
  FaHandSparkles,
  FaCalendarAlt,
} from "react-icons/fa";


function WelcomeBanner(){


const admin = JSON.parse(
localStorage.getItem("admin")
);



const currentHour = new Date().getHours();



let greeting="Good Evening";


if(currentHour < 12){

greeting="Good Morning";

}
else if(currentHour < 18){

greeting="Good Afternoon";

}





const today = new Date().toLocaleDateString(
"en-IN",
{
weekday:"long",
day:"numeric",
month:"long",
year:"numeric",
}
);






return(



<div

className="

bg-gradient-to-r

from-blue-700

via-indigo-700

to-purple-700


text-white


rounded-2xl
sm:rounded-3xl


shadow-xl


p-5
sm:p-8


mt-6
sm:mt-8


relative

overflow-hidden

"

>







{/* Background Circle */}



<div

className="

absolute

-right-10

-top-10

w-28
sm:w-40


h-28
sm:h-40


bg-white/10


rounded-full

"

>

</div>







<div

className="
relative
z-10

"

>






<h1

className="

text-2xl
sm:text-3xl
md:text-4xl


font-bold


flex

flex-wrap


items-center


gap-2
sm:gap-3


"

>


<span>

{greeting},

</span>


<span>

{admin?.username || "Admin"}

</span>



<FaHandSparkles

className="
text-yellow-300

text-xl
sm:text-2xl

"

/>



</h1>







<p

className="

mt-3
sm:mt-4


text-blue-100


text-sm
sm:text-lg


leading-6

"

>


Welcome back to your Exam Seating Arrangement System.


</p>








<div

className="

flex

items-start

sm:items-center


gap-3


mt-4
sm:mt-5


text-blue-100


text-sm
sm:text-base


"

>


<FaCalendarAlt

className="
mt-1
sm:mt-0

"

/>



<span>

{today}

</span>



</div>







</div>





</div>


);


}


export default WelcomeBanner;