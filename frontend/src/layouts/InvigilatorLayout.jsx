import { Outlet } from "react-router-dom";
import InvigilatorSidebar from "../components/InvigilatorSidebar";


function InvigilatorLayout() {

  return (

    <div className="
      min-h-screen
      bg-gray-100
      dark:bg-gray-900
      flex
    ">

      {/* Invigilator Sidebar */}
      <InvigilatorSidebar />


      {/* Page Content */}
      <main className="
        flex-1
        p-4
        md:p-6
        lg:p-8
        overflow-x-hidden
      ">

        <Outlet />

      </main>


    </div>

  );

}


export default InvigilatorLayout;