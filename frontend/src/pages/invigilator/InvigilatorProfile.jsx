function InvigilatorProfile(){

const invigilator =
JSON.parse(
localStorage.getItem("invigilator")
);


return(

<div className="
min-h-screen
bg-gray-100
dark:bg-gray-900
p-6
">


<div className="
bg-white
dark:bg-gray-800
rounded-xl
shadow
p-6
max-w-xl
">


<h1 className="
text-3xl
font-bold
text-blue-700
mb-6
">

My Profile

</h1>


<p>
Name:
<b>
 {invigilator?.name}
</b>
</p>


<p>
Employee ID:
<b>
 {invigilator?.employeeId}
</b>
</p>


<p>
Role:
<b>
 {invigilator?.role}
</b>
</p>


</div>


</div>

);

}


export default InvigilatorProfile;