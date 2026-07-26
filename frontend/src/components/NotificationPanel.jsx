import {
  FaUserPlus,
  FaBook,
  FaChair,
  FaBell,
} from "react-icons/fa";


function NotificationPanel({ dashboard }) {


  const notifications = [


    {
      icon: <FaUserPlus />,
      title: `${dashboard?.totalStudents || 0} Students Registered`,
      color: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
    },


    {
      icon: <FaBook />,
      title: `${dashboard?.totalExams || 0} Exams Scheduled`,
      color: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    },


    {
      icon: <FaChair />,
      title: `${dashboard?.totalSeating || 0} Seating Generated`,
      color: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },


  ];





  return (



    <div

      className="
      bg-white
      dark:bg-gray-900
      rounded-2xl
      shadow-lg
      p-4
      sm:p-6
      lg:p-8
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
        flex
        items-center
        gap-3
        mb-6
        "

      >

        <FaBell />

        Notifications


      </h2>








      {/* Notification List */}



      <div

        className="
        space-y-4
        sm:space-y-5
        "

      >





        {

          notifications.map((item,index)=>(



            <div

              key={index}

              className="
              flex
              items-center
              gap-3
              sm:gap-5
              p-4
              sm:p-5
              rounded-xl
              border
              dark:border-gray-700
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
              "

            >





              {/* Icon */}



              <div

                className={`
                ${item.color}

                p-3
                sm:p-4

                rounded-full

                text-xl
                sm:text-2xl

                flex-shrink-0

                `}

              >


                {item.icon}


              </div>








              {/* Text */}



              <div className="min-w-0">



                <h3

                  className="
                  font-semibold
                  text-base
                  sm:text-lg
                  text-gray-800
                  dark:text-white
                  break-words
                  "

                >

                  {item.title}


                </h3>



                <p

                  className="
                  text-sm
                  text-gray-500
                  dark:text-gray-400
                  mt-1
                  "

                >

                  Latest system update


                </p>



              </div>






            </div>



          ))



        }





      </div>






    </div>



  );

}



export default NotificationPanel;