import {
  FaUserPlus,
  FaDoorOpen,
  FaBook,
  FaChair,
  FaChartBar,
} from "react-icons/fa";


import { useNavigate } from "react-router-dom";



function QuickActions(){



  const navigate = useNavigate();




  const actions = [



    {
      title:"Add Student",
      icon:<FaUserPlus />,
      path:"/students",
      color:"from-blue-500 to-blue-700",
    },



    {
      title:"Manage Rooms",
      icon:<FaDoorOpen />,
      path:"/rooms",
      color:"from-purple-500 to-purple-700",
    },



    {
      title:"Schedule Exam",
      icon:<FaBook />,
      path:"/exams",
      color:"from-green-500 to-green-700",
    },



    {
      title:"Generate Seating",
      icon:<FaChair />,
      path:"/generate-seating",
      color:"from-orange-500 to-orange-700",
    },



    {
      title:"View Reports",
      icon:<FaChartBar />,
      path:"/reports",
      color:"from-indigo-500 to-indigo-700",
    },



  ];






  return (



    <div

      className="
      bg-white
      dark:bg-gray-900
      rounded-3xl
      shadow-lg
      p-4
      sm:p-6
      mt-10
      transition-colors
      duration-300
      "

    >








      {/* Heading */}



      <h2

        className="
        text-xl
        sm:text-2xl
        font-bold
        text-blue-900
        dark:text-white
        mb-6
        "

      >

        Quick Actions


      </h2>









      {/* Action Cards */}



      <div

        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        xl:grid-cols-5
        gap-4
        sm:gap-5
        "

      >






        {

          actions.map((action,index)=>(




            <button



              key={index}



              onClick={()=>navigate(action.path)}




              className={`

              bg-gradient-to-r

              ${action.color}

              text-white

              rounded-2xl

              p-5
              sm:p-6

              shadow-lg

              hover:shadow-2xl

              hover:-translate-y-2

              transition-all

              duration-300

              flex

              flex-col

              items-center

              justify-center

              gap-4

              min-h-[160px]

              `}



            >








              {/* Icon */}



              <div

                className="
                w-12
                h-12

                sm:w-14
                sm:h-14

                rounded-full

                bg-white/20

                flex

                items-center

                justify-center

                text-2xl

                sm:text-3xl

                "

              >

                {action.icon}


              </div>









              {/* Title */}



              <span

                className="
                font-semibold
                text-sm
                sm:text-base
                text-center
                "

              >

                {action.title}


              </span>








            </button>






          ))


        }





      </div>






    </div>



  );

}



export default QuickActions;