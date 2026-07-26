import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

  return (

    <div className="
      min-h-screen
      bg-gray-100
      dark:bg-gray-900
      transition-colors
      duration-300
    ">


      {/* Sidebar */}

      <Sidebar />



      {/* Main Content */}

      <div className="ml-72">


        {/* Navbar */}

        <Navbar />



        {/* Page Content */}

        <main className="
          p-8
          transition-colors
          duration-300
        ">

          {children}

        </main>


      </div>



    </div>

  );

}


export default Layout;