import { Navigate } from "react-router-dom";


function InvigilatorProtectedRoute({children}){


const token =
localStorage.getItem(
"invigilatorToken"
);



if(!token){

return (

<Navigate
to="/invigilator-login"
replace
/>

);

}


return children;


}


export default InvigilatorProtectedRoute;