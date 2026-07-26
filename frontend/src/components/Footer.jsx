import {
  FaGraduationCap,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

import { Link } from "react-router-dom";


function Footer() {


  return (

    <footer className="bg-[#0A2A66] text-white mt-20">


      {/* Top Footer */}


      <div className="max-w-7xl mx-auto px-8 py-12 grid md:grid-cols-3 gap-10">



        {/* Logo */}


        <div>


          <div className="flex items-center gap-3 mb-5">


            <div className="bg-white p-2 rounded-full">


              <FaGraduationCap

                className="text-[#0A2A66]"

                size={28}

              />


            </div>



            <div>


              <h2 className="text-2xl font-bold">

                Exam Sitting

              </h2>


              <p className="text-gray-300">

                Arrangement System

              </p>


            </div>


          </div>





          <p className="text-gray-300 leading-7">


            A smart web application that automates exam
            seating arrangements, classroom allocation,
            and invigilator management with better
            accuracy and efficiency.


          </p>


        </div>







        {/* Quick Links */}



        <div>


          <h2 className="text-2xl font-bold mb-5">

            Quick Links

          </h2>




          <ul className="space-y-3 text-gray-300">





            <li>

              <Link

                to="/"

                className="
                hover:text-green-400
                cursor-pointer
                transition
                "

              >

                Home

              </Link>


            </li>






            <li>


              <Link

                to="/admin-login"

                className="
                hover:text-green-400
                cursor-pointer
                transition
                "

              >

                Admin Login


              </Link>


            </li>






            <li>


              <Link

                to="/invigilator-login"

                className="
                hover:text-green-400
                cursor-pointer
                transition
                "

              >

                Invigilator Login


              </Link>


            </li>






            <li>


              <Link
to="/contact"
className="
hover:text-green-400
transition
"
>
Contact
</Link>


            </li>




          </ul>


        </div>








        {/* Contact */}



        <div id="contact">


          <h2 className="text-2xl font-bold mb-5">

            Contact Us

          </h2>





          <div className="space-y-4 text-gray-300">





            <div className="flex items-center gap-3">


              <FaEnvelope />

              contact@axiscolleges.in


            </div>






            <div className="flex items-center gap-3">


              <FaPhoneAlt />


              +91 8853777774


            </div>






            <div className="flex items-center gap-3">


              <FaMapMarkerAlt />


              Hathipur, Rooma, NH-2, Kanpur, Uttar Pradesh 209402


            </div>




          </div>


        </div>




      </div>









      {/* Bottom Footer */}




      <div className="border-t border-blue-700">


        <div className="max-w-7xl mx-auto py-5 text-center">


          <p className="text-gray-300">


            © {new Date().getFullYear()} Exam Seating Arrangement
            System. All Rights Reserved.


          </p>


        </div>


      </div>





    </footer>


  );

}



export default Footer;