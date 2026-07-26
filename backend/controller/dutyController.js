const Duty = require("../models/Duty");




// =================================
// Create Duty (Admin Assign Duty)
// =================================

const createDuty = async(req,res)=>{

try{


const duty = await Duty.create({

    invigilator:req.body.invigilator,

    exam:req.body.exam,

    examName:req.body.examName,

    subject:req.body.subject,

    room:req.body.room,

    examDate:req.body.examDate,

    examTime:req.body.examTime,

    totalStudents:req.body.totalStudents

});



res.status(201).json({

    success:true,

    message:
    "Duty Assigned Successfully",

    duty

});


}
catch(error){


console.log(error);


res.status(500).json({

    success:false,

    message:error.message

});


}


};







// =================================
// Get Invigilator Duties
// =================================

const getMyDuties = async(req,res)=>{


try{


const duties =
await Duty.find({

    invigilator:req.params.id

})
.populate("exam");




res.status(200).json({

success:true,

total:
duties.length,

duties

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};








// =================================
// Complete Duty
// =================================


const completeDuty = async(req,res)=>{


try{


const duty =
await Duty.findByIdAndUpdate(

req.params.id,

{
    status:"Completed"
},

{
    new:true
}

);



if(!duty){

return res.status(404).json({

success:false,

message:"Duty Not Found"

});

}




res.status(200).json({

success:true,

message:
"Duty Completed Successfully",

duty

});


}
catch(error){


res.status(500).json({

success:false,

message:error.message

});


}


};








// =================================
// Export Controllers
// =================================

module.exports = {

    createDuty,

    getMyDuties,

    completeDuty

};