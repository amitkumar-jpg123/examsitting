const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// ==========================
// OTP Store
// ==========================

const otpStore = {};

// Generate 6 Digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const transporter = require("../config/mail");


// Register Admin
const registerAdmin = async (req, res) => {

  try {

    const {
      username,
      email,
      password
    } = req.body;


    const exist = await Admin.findOne({
      username
    });


    if (exist) {

      return res.status(400).json({

        success: false,
        message: "Admin Already Exists",

      });

    }


    const hashPassword = await bcrypt.hash(
      password,
      10
    );


    const admin = await Admin.create({

      username,

      email,

      password: hashPassword,

    });



    res.status(201).json({

      success: true,

      message: "Admin Registered Successfully",

      admin,

    });



  } catch (error) {


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }

};






// Login Admin
const loginAdmin = async (req,res)=>{


  try {


    const {
      username,
      password
    } = req.body;



    const admin = await Admin.findOne({
  username,
}).select("+password");



    if(!admin){

      return res.status(404).json({

        success:false,

        message:"Admin Not Found",

      });

    }




    const isMatch = await bcrypt.compare(

      password,

      admin.password

    );




    if(!isMatch){

      return res.status(401).json({

        success:false,

        message:"Invalid Password",

      });

    }





    const token = jwt.sign(

      {
        id:admin._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn:"1d"
      }

    );

    const adminData = admin.toObject();
delete adminData.password;

    res.json({

      success:true,

      message:"Login Successful",

      token,

      admin,

    });



  } catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};







// Get Admin Profile
const getAdminProfile = async(req,res)=>{


  try{


    const admin = await Admin.findById(
      req.params.id
    )
    .select("-password");




    if(!admin){


      return res.status(404).json({

        success:false,

        message:"Admin Not Found",

      });


    }




    res.status(200).json({

      success:true,

      admin,

    });



  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};









// Update Admin Profile
const updateAdmin = async(req,res)=>{


  try{


    const {
      username,
      email
    } = req.body;




    const updatedAdmin = await Admin.findByIdAndUpdate(

      req.params.id,

      {
        username,
        email,
      },

      {
        new:true,
      }

    )
    .select("-password");





    if(!updatedAdmin){


      return res.status(404).json({

        success:false,

        message:"Admin Not Found",

      });


    }




    res.status(200).json({

      success:true,

      message:"Profile Updated Successfully",

      admin:updatedAdmin,

    });




  }catch(error){


    res.status(500).json({

      success:false,

      message:error.message,

    });


  }


};

// ==========================
// Change Password
// ==========================

const changePassword = async (req, res) => {

  try {

    const { currentPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.params.id);

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });

    }

    const isMatch = await bcrypt.compare(

      currentPassword,

      admin.password

    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Current Password is Incorrect",
      });

    }

    const hashedPassword = await bcrypt.hash(
      newPassword,
      10
    );

    admin.password = hashedPassword;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================
// Upload Profile Image
// ==========================

const uploadProfileImage = async (req, res) => {

  try {

    const admin = await Admin.findById(req.params.id);

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });

    }

    if (!req.file) {

      return res.status(400).json({
        success: false,
        message: "Please Select an Image",
      });

    }

    admin.profileImage = req.file.filename;

    await admin.save();

    res.status(200).json({

      success: true,

      message: "Profile Image Uploaded Successfully",

      image: req.file.filename,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};    

// ==========================
// Check Admin Exists
// ==========================

const checkAdminExists = async (req, res) => {
  try {
    const count = await Admin.countDocuments();

    res.status(200).json({
      success: true,
      exists: count > 0,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Forgot Password (Send OTP)
// ==========================

// ==========================
// Forgot Password (Send OTP)
// ==========================

const forgotPassword = async (req, res) => {

  try {

    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Email Not Registered",
      });

    }

    const otp = generateOTP();

    otpStore[email] = otp;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Exam Seating Arrangement - Password Reset OTP",

      html: `
        <h2>Password Reset Request</h2>
        <p>Your OTP is:</p>
        <h1>${otp}</h1>
        <p>This OTP is valid for a short time.</p>
      `,

    });

    res.status(200).json({

      success: true,

      message: "OTP Sent Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// Verify OTP
// ==========================

const verifyOTP = async (req, res) => {

  try {

    const { email, otp } = req.body;

    if (!otpStore[email]) {

      return res.status(400).json({

        success: false,

        message: "OTP Expired",

      });

    }

    // First compare OTP
    if (otpStore[email] !== otp) {

      return res.status(400).json({

        success: false,

        message: "Invalid OTP",

      });

    }

    // After successful verification
    otpStore[email] = "VERIFIED";

    console.log("OTP Verified Successfully");
console.log("OTP Store After Verify:", otpStore);

    res.status(200).json({

      success: true,

      message: "OTP Verified Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// Reset Password
// ==========================

const resetPassword = async (req, res) => {

  try {

    const { email, newPassword } = req.body;

    console.log("Reset Email:", email);
console.log("OTP Store During Reset:", otpStore);
console.log("OTP Status:", otpStore[email]);

    if (otpStore[email] !== "VERIFIED") {

      return res.status(400).json({
        success: false,
        message: "OTP Verification Required",
      });

    }

    const admin = await Admin.findOne({ email });

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "Admin Not Found",
      });

    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    admin.password = hashedPassword;

    await admin.save();

    delete otpStore[email];

    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }

};

// ==========================
// Get All Admins
// ==========================

const getAllAdmins = async (req, res) => {

  try {

    const admins = await Admin.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({

      success: true,

      totalAdmins: admins.length,

      admins,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ==========================
// Add New Admin
// ==========================

const addAdmin = async (req, res) => {

  try {

    const { username, email, password } = req.body;

    // Check Empty Fields
    if (!username || !email || !password) {

      return res.status(400).json({

        success: false,

        message: "Please Fill All Fields",

      });

    }

    // Check Existing Username
    const usernameExists = await Admin.findOne({ username });

    if (usernameExists) {

      return res.status(400).json({

        success: false,

        message: "Username Already Exists",

      });

    }

    // Check Existing Email
    const emailExists = await Admin.findOne({ email });

    if (emailExists) {

      return res.status(400).json({

        success: false,

        message: "Email Already Exists",

      });

    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create Admin
    const admin = await Admin.create({

      username,
      email,
      password: hashedPassword,

    });

    res.status(201).json({

      success: true,

      message: "Admin Added Successfully",

      admin,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// Update Admin
// ==========================

const updateAdminById = async (req, res) => {

  try {

    const { username, email } = req.body;

    const admin = await Admin.findById(req.params.id);

    if (!admin) {

      return res.status(404).json({

        success: false,

        message: "Admin Not Found",

      });

    }

    // Check Username
    const usernameExists = await Admin.findOne({
      username,
      _id: { $ne: req.params.id },
    });

    if (usernameExists) {

      return res.status(400).json({

        success: false,

        message: "Username Already Exists",

      });

    }

    // Check Email
    const emailExists = await Admin.findOne({
      email,
      _id: { $ne: req.params.id },
    });

    if (emailExists) {

      return res.status(400).json({

        success: false,

        message: "Email Already Exists",

      });

    }

    admin.username = username;
    admin.email = email;

    await admin.save();

    res.status(200).json({

      success: true,

      message: "Admin Updated Successfully",

      admin,

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};

// ==========================
// Delete Admin
// ==========================

const deleteAdminById = async (req, res) => {

  try {

    const admin = await Admin.findById(req.params.id);

    if (!admin) {

      return res.status(404).json({

        success: false,

        message: "Admin Not Found",

      });

    }

    await Admin.findByIdAndDelete(req.params.id);

    res.status(200).json({

      success: true,

      message: "Admin Deleted Successfully",

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


module.exports = {

  registerAdmin,

  loginAdmin,

  getAdminProfile,

  updateAdmin,

  changePassword,

  uploadProfileImage,

  forgotPassword,
  verifyOTP,

  resetPassword,
  checkAdminExists,

    // Admin CRUD

  getAllAdmins,
  addAdmin,

  updateAdminById,
    deleteAdminById,

};