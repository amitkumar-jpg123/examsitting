const Incident = require("../models/Incident");


// ======================================
// Create Incident Report
// ======================================

const createIncident = async (req, res) => {

  try {

    const {
      invigilator,
      employeeId,
      invigilatorName,
      incidentType,
      description
    } = req.body;


    console.log("Incident Data:", req.body);


    if (
      !invigilator ||
      !employeeId ||
      !invigilatorName ||
      !incidentType ||
      !description
    ) {

      return res.status(400).json({

        success:false,

        message:"All fields are required"

      });

    }


    const incident = await Incident.create({

      invigilator,

      employeeId,

      invigilatorName,

      incidentType,

      description

    });


    res.status(201).json({

      success:true,

      message:"Incident Report Submitted Successfully",

      incident

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



// ======================================
// Get All Incidents (Admin)
// ======================================

const getAllIncidents = async(req,res)=>{

  try{


    const incidents =
      await Incident.find()
      .sort({
        createdAt:-1
      });



    res.status(200).json({

      success:true,

      total:incidents.length,

      incidents

    });



  }
  catch(error){


    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};




// ======================================
// Update Incident Status
// ======================================

const updateIncidentStatus = async(req,res)=>{

  try{


    const incident =
      await Incident.findByIdAndUpdate(

        req.params.id,

        {
          status:req.body.status
        },

        {
          new:true
        }

      );



    if(!incident){

      return res.status(404).json({

        success:false,

        message:"Incident Not Found"

      });

    }



    res.status(200).json({

      success:true,

      message:"Status Updated Successfully",

      incident

    });



  }
  catch(error){


    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};




// ======================================
// Delete Incident
// ======================================

const deleteIncident = async(req,res)=>{

  try{


    const incident =
      await Incident.findByIdAndDelete(
        req.params.id
      );



    if(!incident){

      return res.status(404).json({

        success:false,

        message:"Incident Not Found"

      });

    }



    res.status(200).json({

      success:true,

      message:"Incident Deleted Successfully"

    });



  }
  catch(error){


    console.error(error);


    res.status(500).json({

      success:false,

      message:error.message

    });


  }

};



module.exports = {

  createIncident,

  getAllIncidents,

  updateIncidentStatus,

  deleteIncident

};