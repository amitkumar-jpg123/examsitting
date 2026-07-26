import Header from "../components/Header";
import Footer from "../components/Footer";

import heroBg from "../assets/examhall.jpg";
import examImg from "../assets/Exam.jpg";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


function Home() {

  const navigate = useNavigate();


  return (

    <>

      <Header />


      {/* Hero Section */}

      <section

        className="
        relative
        min-h-screen
        bg-cover
        bg-center
        flex
        items-center
        "

        style={{
          backgroundImage:`url(${heroBg})`
        }}

      >


        {/* Overlay */}

        <div className="
        absolute
        inset-0
        bg-black/60
        "></div>



        {/* Content */}

        <div className="
        relative
        z-10
        w-full
        "
        >

          <div className="
          max-w-7xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          "
          >


            <div className="
            max-w-3xl
            text-white
            "
            >



              <p className="
              uppercase
              tracking-[3px]
              sm:tracking-[5px]
              text-green-400
              font-semibold
              mb-4
              text-sm
              sm:text-base
              "
              >

                Welcome To

              </p>




              <h1 className="
              text-4xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-extrabold
              leading-tight
              "
              >

                Exam Sitting
                <br/>
                Arrangement
                <br/>
                System


              </h1>




              <p className="
              mt-5
              sm:mt-6
              text-base
              sm:text-lg
              leading-7
              sm:leading-8
              text-gray-200
              max-w-2xl
              "
              >

                Simplify examination management by automatically
                generating seating arrangements, assigning rooms,
                managing students and scheduling invigilators
                through one powerful dashboard.

              </p>




              <button

                onClick={() => navigate("/admin-login")}

                className="
                mt-8
                sm:mt-10
                flex
                items-center
                justify-center
                gap-3
                bg-green-600
                hover:bg-green-700
                transition
                duration-300
                px-6
                sm:px-8
                py-3
                sm:py-4
                rounded-lg
                text-base
                sm:text-lg
                font-semibold
                w-full
                sm:w-fit
                "

              >

                Get Started

                <FaArrowRight />

              </button>



            </div>


          </div>


        </div>


      </section>





      {/* About Section */}


      <section className="
      py-12
      sm:py-16
      lg:py-20
      bg-gray-100
      ">


        <div className="
        max-w-7xl
        mx-auto
        px-5
        sm:px-8
        lg:px-12
        grid
        grid-cols-1
        md:grid-cols-2
        gap-10
        lg:gap-14
        items-center
        ">



          {/* Image */}


          <div>


            <img

              src={examImg}

              alt="Exam Hall"

              className="
              rounded-xl
              shadow-2xl
              w-full
              h-auto
              object-cover
              "

            />


          </div>





          {/* Content */}


          <div>


            <h2 className="
            text-3xl
            sm:text-4xl
            font-bold
            text-blue-900
            mb-5
            sm:mb-6
            "
            >

              Why Choose Our System?

            </h2>




            <p className="
            text-gray-700
            leading-7
            sm:leading-8
            text-base
            sm:text-lg
            ">

              The Exam Sitting Arrangement System helps colleges
              and Universities automatically generate seating
              arrangements, manage students, classrooms,
              examinations and invigilator assignments without
              manual effort.

            </p>





            <div className="
            mt-8
            grid
            gap-5
            ">


              <div className="
              bg-white
              p-5
              rounded-lg
              shadow
              ">


                <h3 className="
                font-bold
                text-lg
                sm:text-xl
                text-blue-900
                ">

                  Smart Seating Arrangement

                </h3>


                <p className="
                text-gray-600
                mt-2
                ">

                  Automatically allocates seats based on room
                  capacity and exam schedule.

                </p>


              </div>





              <div className="
              bg-white
              p-5
              rounded-lg
              shadow
              ">


                <h3 className="
                font-bold
                text-lg
                sm:text-xl
                text-blue-900
                ">

                  Student & Exam Management

                </h3>


                <p className="
                text-gray-600
                mt-2
                ">

                  Easily manage students, exams, rooms and faculty
                  from one dashboard.

                </p>


              </div>





              <div className="
              bg-white
              p-5
              rounded-lg
              shadow
              ">


                <h3 className="
                font-bold
                text-lg
                sm:text-xl
                text-blue-900
                ">

                  Reports & PDF Download

                </h3>


                <p className="
                text-gray-600
                mt-2
                ">

                  Generate seating charts and printable reports
                  instantly.

                </p>


              </div>


            </div>


          </div>


        </div>


      </section>



      <Footer />


    </>

  );

}


export default Home;