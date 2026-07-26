import {
  FaUserPlus,
  FaBook,
  FaUniversity,
  FaChair,
  FaUserTie,
} from "react-icons/fa";



function ActivityLogs({ dashboard }) {



  const logs = [


    {
      icon:<FaUserPlus />,
      title:"Students Registered",
      count:dashboard?.totalStudents || 0,
      color:"bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },


    {
      icon:<FaBook />,
      title:"Exams Created",
      count:dashboard?.totalExams || 0,
      color:"bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },


    {
      icon:<FaUniversity />,
      title:"Rooms Available",
      count:dashboard?.totalRooms || 0,
      color:"bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
    },


    {
      icon:<FaUserTie />,
      title:"Invigilators",
      count:dashboard?.totalInvigilators || 0,
      color:"bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
    },


    {
      icon:<FaChair />,
      title:"Seating Generated",
      count:dashboard?.totalSeating || 0,
      color:"bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },


  ];






  return (



    <div

      className="
      bg-white
      dark:bg-gray-900
      rounded-2xl
      shadow-xl
      p-4
      sm:p-6
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

        Activity Logs


      </h2>









      {/* Logs */}



      <div

        className="
        space-y-4
        "

      >






        {

          logs.map((log,index)=>(




            <div

              key={index}

              className="
              flex
              items-center
              justify-between
              gap-3
              border
              dark:border-gray-700
              rounded-xl
              p-3
              sm:p-4
              hover:bg-gray-50
              dark:hover:bg-gray-800
              transition
              "

            >









              {/* Left Section */}



              <div

                className="
                flex
                items-center
                gap-3
                sm:gap-4
                min-w-0
                "

              >





                {/* Icon */}



                <div

                  className={`
                  
                  ${log.color}

                  p-3

                  rounded-full

                  text-lg
                  sm:text-xl

                  flex-shrink-0

                  `}

                >


                  {log.icon}


                </div>








                {/* Text */}



                <div className="min-w-0">



                  <h3

                    className="
                    font-semibold
                    text-sm
                    sm:text-base
                    text-gray-800
                    dark:text-white
                    truncate
                    "

                  >

                    {log.title}


                  </h3>




                  <p

                    className="
                    text-xs
                    sm:text-sm
                    text-gray-500
                    dark:text-gray-400
                    "

                  >

                    Total Records


                  </p>




                </div>





              </div>









              {/* Count */}



              <span

                className="
                text-lg
                sm:text-2xl
                font-bold
                text-blue-900
                dark:text-blue-400
                flex-shrink-0
                "

              >

                {log.count}


              </span>






            </div>




          ))


        }





      </div>






    </div>



  );


}



export default ActivityLogs;