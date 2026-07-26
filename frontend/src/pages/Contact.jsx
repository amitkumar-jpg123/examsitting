import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import contactBg from "../assets/contact-bg.jpg";

import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaUser,
  FaCommentDots,
  FaArrowLeft,
} from "react-icons/fa";


function Contact() {


const [form,setForm] = useState({

name:"",
email:"",
phone:"",
message:""

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const handleSubmit=async(e)=>{


e.preventDefault();


try{


await axios.post(
"http://localhost:5000/api/contact",
form
);


toast.success("Message Sent Successfully");


setForm({

name:"",
email:"",
phone:"",
message:""

});


}
catch(error){


console.log(error);

toast.error("Failed to Send Message");


}


};





return(



<div

className="
min-h-screen
bg-cover
bg-center
relative
flex
items-center
justify-center
py-24
px-4
sm:px-6
"

style={{

backgroundImage:`url(${contactBg})`

}}

>



{/* Overlay */}

<div className="
absolute
inset-0
bg-black/60
"></div>













{/* Main Container */}


<div

className="
relative
z-10
max-w-6xl
w-full
grid
grid-cols-1
md:grid-cols-2
gap-8
lg:gap-12
"

>






{/* Left Content */}



<div

className="
text-white
flex
flex-col
justify-center
"

>



<h1

className="
text-4xl
sm:text-5xl
font-bold
mb-5
sm:mb-6
"

>

Contact Us

</h1>





<p

className="
text-base
sm:text-lg
leading-7
sm:leading-8
text-gray-200
"

>

Welcome to the Exam Seating Arrangement System.

If you have any questions, suggestions, or need technical support,
feel free to contact us. Our team will respond as soon as possible.

</p>







<div

className="
mt-8
sm:mt-10
space-y-5
sm:space-y-6
"

>





{/* Address */}


<div className="
flex
items-start
gap-4
">


<FaMapMarkerAlt
className="
text-xl
sm:text-2xl
mt-1
"
/>


<div>

<h3 className="
font-semibold
text-lg
sm:text-xl
">

Address

</h3>


<p className="
text-gray-200
text-sm
sm:text-base
">

Axis College,
Hathipur, Rooma,
Kanpur, Uttar Pradesh

</p>


</div>


</div>







{/* Phone */}



<div className="
flex
items-start
gap-4
">


<FaPhone
className="
text-xl
sm:text-2xl
mt-1
"
/>


<div>


<h3 className="
font-semibold
text-lg
sm:text-xl
">

Phone

</h3>


<p className="
text-gray-200
text-sm
sm:text-base
">

+91 8853777774

</p>


</div>


</div>







{/* Email */}



<div className="
flex
items-start
gap-4
">


<FaEnvelope

className="
text-xl
sm:text-2xl
mt-1
"

/>


<div>


<h3 className="
font-semibold
text-lg
sm:text-xl
">

Email

</h3>


<p className="
text-gray-200
text-sm
sm:text-base
">

contact@axiscolleges.in

</p>


</div>


</div>





</div>



</div>









{/* Form */}



<div

className="
bg-white/15
backdrop-blur-xl
border
border-white/20
rounded-3xl
shadow-2xl
p-5
sm:p-8
"

>



<h2

className="
text-2xl
sm:text-3xl
font-bold
text-center
text-white
mb-6
sm:mb-8
"

>

Send Message

</h2>





<form

onSubmit={handleSubmit}

className="
space-y-4
sm:space-y-5
"

>




{

[
{
icon:<FaUser/>,
name:"name",
type:"text",
placeholder:"Enter Your Name"
},
{
icon:<FaEnvelope/>,
name:"email",
type:"email",
placeholder:"Enter Email Address"
},
{
icon:<FaPhone/>,
name:"phone",
type:"text",
placeholder:"Enter Phone Number"
}

].map((item,index)=>(


<div

key={index}

className="
relative
"

>


<div className="
absolute
left-4
top-1/2
-translate-y-1/2
text-gray-500
">

{item.icon}

</div>



<input

type={item.type}

name={item.name}

placeholder={item.placeholder}

value={form[item.name]}

onChange={handleChange}

required

className="
w-full
pl-12
pr-4
py-3
sm:py-4
rounded-xl
outline-none
bg-white
text-gray-800
text-sm
sm:text-base
focus:ring-2
focus:ring-green-500
"

/>


</div>


))

}





{/* Message */}


<div className="relative">


<FaCommentDots

className="
absolute
left-4
top-5
text-gray-500
"

/>


<textarea

name="message"

rows="5"

placeholder="Write your message..."

value={form.message}

onChange={handleChange}

required

className="
w-full
pl-12
pr-4
py-3
sm:py-4
rounded-xl
outline-none
bg-white
text-gray-800
resize-none
text-sm
sm:text-base
focus:ring-2
focus:ring-green-500
"

/>


</div>







<button

type="submit"

className="
w-full
bg-green-600
hover:bg-green-700
text-white
py-3
sm:py-4
rounded-xl
font-bold
text-base
sm:text-lg
flex
items-center
justify-center
gap-3
transition
shadow-lg
"

>


<FaPaperPlane/>

Send Message


</button>




{/* Back To Home Button */}

<div

className="
mt-6
flex
justify-center
"

>

<Link

to="/"

className="
inline-flex
items-center
justify-center
gap-2

bg-blue-900
hover:bg-green-600

text-white

px-5
sm:px-6

py-3

rounded-xl

font-semibold

text-sm
sm:text-base

transition
duration-300

shadow-lg

"

>

<FaArrowLeft />

Back To Home

</Link>


</div>




</form>






</div>







</div>




</div>


);


}


export default Contact;