import { useEffect, useState } from "react";

import {
  FaUserCircle,
  FaEdit,
  FaSave,
  FaLock,
  FaTimes,
  FaCamera,
} from "react-icons/fa";

import toast from "react-hot-toast";

import {
  getAdminProfile,
  updateAdmin,
  changePassword,
  uploadProfileImage,
} from "../services/authApi";


function AdminProfile() {


  // ==========================
  // States
  // ==========================


  const [admin, setAdmin] = useState(null);


  const [loading, setLoading] = useState(true);


  const [editMode, setEditMode] = useState(false);


  const [uploading, setUploading] = useState(false);



  const [formData, setFormData] = useState({

    username: "",

    email: "",

  });



  const [passwordData, setPasswordData] = useState({

    currentPassword: "",

    newPassword: "",

    confirmPassword: "",

  });



  const [selectedImage, setSelectedImage] = useState(null);



  // ==========================
  // Backend URL
  // ==========================


  const IMAGE_URL = "http://localhost:5000/uploads/";



  // ==========================
  // Load Admin Profile
  // ==========================


  useEffect(() => {


    const loadProfile = async () => {


      try {


        const storedAdmin =
          localStorage.getItem("admin");



        if (!storedAdmin) {


          toast.error("Admin Login Required");

          setLoading(false);

          return;


        }



        const adminData =
          JSON.parse(storedAdmin);



        const res =
          await getAdminProfile(adminData._id);



        if (res.data.success) {



          const profile =
            res.data.admin;



          setAdmin(profile);



          setFormData({

            username:
              profile.username || "",

            email:
              profile.email || "",

          });



          localStorage.setItem(

            "admin",

            JSON.stringify(profile)

          );


        }



      } catch(error){



        console.log(error);



        toast.error(
          "Failed To Load Profile"
        );


      }
      finally{


        setLoading(false);


      }



    };



    loadProfile();



  }, []);





  // ==========================
  // Profile Input Change
  // ==========================


  const handleChange = (e)=>{


    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });


  };




  // ==========================
  // Password Input Change
  // ==========================


  const handlePasswordChange = (e)=>{


    setPasswordData({

      ...passwordData,

      [e.target.name]:
        e.target.value,

    });


  };





  // ==========================
  // Image Select
  // ==========================


  const handleImageChange = (e)=>{


    const file =
      e.target.files[0];



    if(!file)
      return;



    if(!file.type.startsWith("image")){


      toast.error(
        "Only Image Allowed"
      );

      return;


    }



    setSelectedImage(file);


  };






  // ==========================
  // Update Profile
  // ==========================


  const handleUpdate = async()=>{


    try{



      if(!formData.username ||
         !formData.email){


        toast.error(
          "Please Fill All Fields"
        );

        return;


      }




      const res =
        await updateAdmin(

          admin._id,

          formData

        );




      if(res.data.success){



        setAdmin(res.data.admin);



        localStorage.setItem(

          "admin",

          JSON.stringify(
            res.data.admin
          )

        );



        setEditMode(false);



        toast.success(
          "Profile Updated Successfully"
        );

      }



    }
    catch(error){



      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Profile Update Failed"

      );


    }


  };





  // ==========================
  // Cancel Edit
  // ==========================


  const cancelEdit = ()=>{


    setEditMode(false);



    setFormData({

      username: admin.username,

      email: admin.email,

    });


  };





  // ==========================
  // Change Password
  // ==========================


  const handleChangePassword = async()=>{


    if(
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ){


      toast.error(
        "Please Fill All Password Fields"
      );


      return;


    }




    if(
      passwordData.newPassword !==
      passwordData.confirmPassword
    ){


      toast.error(
        "Password Not Matching"
      );


      return;


    }





    if(passwordData.newPassword.length < 6){


      toast.error(
        "Password Minimum 6 Characters"
      );


      return;


    }





    try{


      const res =
        await changePassword(

          admin._id,

          {

            currentPassword:
              passwordData.currentPassword,


            newPassword:
              passwordData.newPassword,

          }

        );



      if(res.data.success){



        toast.success(
          "Password Changed Successfully"
        );



        setPasswordData({

          currentPassword:"",

          newPassword:"",

          confirmPassword:"",

        });


      }



    }
    catch(error){



      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Password Change Failed"

      );


    }


  };


    // ==========================
  // Upload Profile Image
  // ==========================


  const handleUploadImage = async()=>{


    if(!selectedImage){


      toast.error(
        "Please Select Image"
      );


      return;


    }



    try{


      setUploading(true);



      const form =
        new FormData();



      form.append(
        "profileImage",
        selectedImage
      );



      const res =
        await uploadProfileImage(

          admin._id,

          form

        );



      if(res.data.success){



        const updatedAdmin = {

          ...admin,

          profileImage:
            res.data.image,

        };



        setAdmin(updatedAdmin);



        localStorage.setItem(

          "admin",

          JSON.stringify(updatedAdmin)

        );



        setSelectedImage(null);



        toast.success(
          "Profile Image Updated"
        );


      }



    }
    catch(error){



      console.log(error);



      toast.error(

        error.response?.data?.message ||

        "Image Upload Failed"

      );


    }
    finally{


      setUploading(false);


    }


  };




  // ==========================
  // Loading Screen
  // ==========================


  if(loading){


    return (

      <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      ">


        <h2 className="
        text-2xl
        font-bold
        text-blue-700
        ">

          Loading Profile...

        </h2>


      </div>

    );


  }




  return (


    <div className="
    min-h-screen
    bg-gray-100
    py-10
    px-4
    ">


      <div className="
      max-w-3xl
      mx-auto
      ">



        {/* Profile Card */}


        <div className="
        bg-white
        rounded-2xl
        shadow-xl
        overflow-hidden
        ">



          {/* Header */}


          <div className="
          bg-gradient-to-r
          from-blue-700
          to-blue-900
          p-8
          text-center
          text-white
          ">



            {

            admin?.profileImage ? (


              <img

                src={
                  `${IMAGE_URL}${admin.profileImage}`
                }

                alt="Admin"

                className="
                w-32
                h-32
                rounded-full
                mx-auto
                object-cover
                border-4
                border-white
                shadow-lg
                "

              />


            )
            :
            (


              <FaUserCircle

                className="
                mx-auto
                text-8xl
                "

              />


            )


            }




            <h1 className="
            text-3xl
            font-bold
            mt-4
            ">

              Admin Profile

            </h1>


            <p className="
            text-blue-200
            mt-2
            ">

              Manage Account Information

            </p>




            {/* Image Upload */}


            <div className="
            mt-6
            flex
            flex-col
            items-center
            gap-3
            ">



              <label className="
              cursor-pointer
              bg-white
              text-blue-700
              px-5
              py-2
              rounded-lg
              flex
              items-center
              gap-2
              font-semibold
              ">


                <FaCamera/>


                Select Image


                <input

                  type="file"

                  accept="image/*"

                  hidden

                  onChange={handleImageChange}

                />


              </label>



              {

              selectedImage && (


                <button

                  onClick={handleUploadImage}

                  disabled={uploading}

                  className="
                  bg-green-600
                  hover:bg-green-700
                  px-6
                  py-2
                  rounded-lg
                  text-white
                  font-semibold
                  "

                >

                  {
                    uploading
                    ?
                    "Uploading..."
                    :
                    "Upload Photo"
                  }


                </button>


              )

              }



            </div>


          </div>






          {/* Body */}


          <div className="
          p-8
          ">




            <div className="
            grid
            md:grid-cols-2
            gap-6
            ">



              <div>


                <label className="
                font-semibold
                block
                mb-2
                ">

                  Username

                </label>


                <input

                  type="text"

                  name="username"

                  value={
                    formData.username
                  }

                  disabled={!editMode}

                  onChange={handleChange}

                  className="
                  w-full
                  border
                  rounded-lg
                  p-3
                  disabled:bg-gray-100
                  "

                />


              </div>





              <div>


                <label className="
                font-semibold
                block
                mb-2
                ">

                  Email

                </label>


                <input

                  type="email"

                  name="email"

                  value={
                    formData.email
                  }

                  disabled={!editMode}

                  onChange={handleChange}

                  className="
                  w-full
                  border
                  rounded-lg
                  p-3
                  disabled:bg-gray-100
                  "

                />


              </div>



            </div>





            {/* Edit Buttons */}



            <div className="
            mt-8
            flex
            gap-4
            ">


            {
            editMode
            ?

            <>


            <button

              onClick={handleUpdate}

              className="
              flex-1
              bg-green-600
              hover:bg-green-700
              text-white
              py-3
              rounded-lg
              font-semibold
              flex
              justify-center
              gap-2
              "

            >

              <FaSave/>

              Save Changes


            </button>




            <button

              onClick={cancelEdit}

              className="
              flex-1
              bg-gray-600
              hover:bg-gray-700
              text-white
              py-3
              rounded-lg
              font-semibold
              flex
              justify-center
              gap-2
              "

            >

              <FaTimes/>

              Cancel


            </button>


            </>


            :

            <button

              onClick={()=>setEditMode(true)}

              className="
              w-full
              bg-blue-700
              hover:bg-blue-800
              text-white
              py-3
              rounded-lg
              font-semibold
              flex
              justify-center
              gap-2
              "

            >

              <FaEdit/>

              Edit Profile


            </button>


            }


            </div>





            <hr className="my-10"/>





            {/* Password Section */}



            <h2 className="
            text-2xl
            font-bold
            text-blue-900
            flex
            gap-2
            items-center
            mb-5
            ">


              <FaLock/>

              Change Password


            </h2>





            <div className="
            grid
            gap-5
            ">



              <input

                type="password"

                name="currentPassword"

                placeholder="Current Password"

                value={
                  passwordData.currentPassword
                }

                onChange={
                  handlePasswordChange
                }

                className="
                border
                rounded-lg
                p-3
                "

              />



              <input

                type="password"

                name="newPassword"

                placeholder="New Password"

                value={
                  passwordData.newPassword
                }

                onChange={
                  handlePasswordChange
                }

                className="
                border
                rounded-lg
                p-3
                "

              />




              <input

                type="password"

                name="confirmPassword"

                placeholder="Confirm Password"

                value={
                  passwordData.confirmPassword
                }

                onChange={
                  handlePasswordChange
                }

                className="
                border
                rounded-lg
                p-3
                "

              />





              <button

                onClick={handleChangePassword}

                className="
                bg-red-600
                hover:bg-red-700
                text-white
                py-3
                rounded-lg
                font-semibold
                "

              >

                Change Password


              </button>



            </div>



          </div>



        </div>




        <p className="
        text-center
        text-gray-500
        mt-6
        text-sm
        ">

          Exam Seating Arrangement System © {new Date().getFullYear()}

        </p>



      </div>



    </div>


  );


}


export default AdminProfile;