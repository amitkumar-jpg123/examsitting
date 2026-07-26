import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  FaUserShield,
  FaUserTie,
  FaHome,
  FaPhoneAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import logo from "../assets/axis-logo.jpeg";


function Header(){


const location = useLocation();

const [open,setOpen] = useState(false);



const navLink=(path)=>

location.pathname===path
?
"text-green-400 font-semibold"
:
"text-white hover:text-green-400 transition duration-300";





const links=[

{
path:"/",
name:"Home",
icon:<FaHome/>
},

{
path:"/admin-login",
name:"Admin Login",
icon:<FaUserShield/>
},

{
path:"/invigilator-login",
name:"Invigilator Login",
icon:<FaUserTie/>
},

{
path:"/contact",
name:"Contact",
icon:<FaPhoneAlt/>
}

];




return(


<header

className="
fixed
top-0
left-0
w-full
z-50
bg-[#0A2A66]/90
backdrop-blur-md
shadow-lg
"

>


<div

className="
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
h-20
flex
items-center
justify-between
"

>





{/* Logo */}



<Link

to="/"

className="
flex
items-center
gap-3
"

onClick={()=>setOpen(false)}

>


<img

src={logo}

alt="College Logo"

className="
w-12
h-12
sm:w-14
sm:h-14
rounded-full
object-cover
border-2
border-white
"

/>



<div className="
hidden
sm:block
">


<h1

className="
text-white
text-lg
md:text-xl
lg:text-2xl
font-bold
"

>

Axis College(AIHE)

</h1>



<p

className="
text-gray-300
text-xs
md:text-sm
"

>

Hathipur, Rooma, Kanpur

</p>


</div>


</Link>








{/* Desktop Menu */}



<nav

className="
hidden
md:block
"

>


<ul

className="
flex
items-center
gap-5
lg:gap-10
text-base
lg:text-lg
"

>


{

links.map((item,index)=>(


<li key={index}>


<Link

to={item.path}

className={`

${navLink(item.path)}

flex
items-center
gap-2

`}

>


{item.icon}

{item.name}


</Link>


</li>


))

}



</ul>


</nav>








{/* Mobile Button */}



<button


className="
md:hidden
text-white
text-2xl
"

onClick={()=>setOpen(!open)}

>


{

open

?

<FaTimes/>

:

<FaBars/>

}


</button>





</div>







{/* Mobile Menu */}



{

open && (


<div

className="
md:hidden
bg-[#0A2A66]
px-5
pb-5
"

>


<ul

className="
flex
flex-col
gap-5
text-lg
"

>


{

links.map((item,index)=>(


<li key={index}>


<Link


to={item.path}


onClick={()=>setOpen(false)}


className={`

${navLink(item.path)}

flex
items-center
gap-3

`}


>


{item.icon}

{item.name}


</Link>


</li>


))


}



</ul>


</div>


)


}




</header>


);


}


export default Header;