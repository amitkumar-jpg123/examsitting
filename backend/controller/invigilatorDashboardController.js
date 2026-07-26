const Invigilator = require("../models/Invigilator");


const getInvigilatorDashboard = async(req,res)=>{

try{

const invigilator =
await Invigilator.findById(req.params.id)
.select("-password");


if(!invigilator){

return res.status(404).json({

success:false,
message:"Invigilator not found"

});

}


res.status(200).json({

success:true,

data:{

name:invigilator.name,

employeeId:invigilator.employeeId,

department:invigilator.department,

todayDuty:1,

assignedExams:5,

upcomingDuties:3,

completedDuties:12

}

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
getInvigilatorDashboard
};