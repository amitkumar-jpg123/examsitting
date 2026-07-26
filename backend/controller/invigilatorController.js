const Invigilator = require("../models/Invigilator");
const bcrypt = require("bcryptjs");


// ==========================
// Add Invigilator
// ==========================

const addInvigilator = async (req, res) => {

  try {


    const {
      employeeId,
      name,
      email,
      phone,
      department,
      password
    } = req.body;



    if(
      !employeeId ||
      !name ||
      !email ||
      !phone ||
      !department ||
      !password
    ){

      return res.status(400).json({

        success:false,
        message:"Please Fill All Fields"

      });

    }




    const existEmail =
      await Invigilator.findOne({
        email
      });


    if(existEmail){

      return res.status(400).json({

        success:false,
        message:"Email Already Exists"

      });

    }





    const existEmployee =
      await Invigilator.findOne({
        employeeId
      });


    if(existEmployee){

      return res.status(400).json({

        success:false,
        message:"Employee ID Already Exists"

      });

    }





    // Password Hash

    const hashedPassword =
      await bcrypt.hash(password,10);





    const invigilator =
      await Invigilator.create({

        employeeId,

        name,

        email,

        phone,

        department,

        password:hashedPassword,

        role:"invigilator"

      });





    return res.status(201).json({

      success:true,

      message:
      "Invigilator Added Successfully",

      invigilator:{
        
        id:invigilator._id,

        employeeId:
        invigilator.employeeId,

        name:
        invigilator.name,

        email:
        invigilator.email

      }

    });



  }
  catch(error){


    console.log(error);


    return res.status(500).json({

      success:false,

      message:error.message

    });


  }

};





// ==========================
// Get All
// ==========================

const getInvigilators = async(req,res)=>{

try{


const invigilators =
await Invigilator.find()
.sort({
createdAt:-1
})
.select("-password");



res.status(200).json({

success:true,

invigilators

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};





// ==========================
// Update
// ==========================

const updateInvigilator = async(req,res)=>{

try{


const {id}=req.params;


const {

name,
email,
phone,
department

}=req.body;



const invigilator =
await Invigilator.findByIdAndUpdate(

id,

{
name,
email,
phone,
department
},

{
new:true
}

);



if(!invigilator){

return res.status(404).json({

success:false,

message:"Invigilator Not Found"

});

}



res.status(200).json({

success:true,

message:"Invigilator Updated Successfully",

invigilator

});



}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};






// ==========================
// Delete
// ==========================

const deleteInvigilator = async(req,res)=>{

try{


const {id}=req.params;


const invigilator =
await Invigilator.findByIdAndDelete(id);



if(!invigilator){

return res.status(404).json({

success:false,

message:"Invigilator Not Found"

});

}



res.status(200).json({

success:true,

message:"Invigilator Deleted Successfully"

});



}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}

};





module.exports={

addInvigilator,

getInvigilators,

updateInvigilator,

deleteInvigilator

};