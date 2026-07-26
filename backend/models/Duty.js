const mongoose = require("mongoose");


const dutySchema = new mongoose.Schema(

{
    invigilator:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Invigilator",
        required:true
    },


    exam:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Exam",
        required:true
    },


    examName:{
        type:String,
        required:true
    },


    subject:{
        type:String,
        required:true
    },


    room:{
        type:String,
        required:true
    },


    examDate:{
        type:String,
        required:true
    },


    examTime:{
        type:String,
        required:true
    },


    totalStudents:{
        type:Number,
        default:0
    },


    status:{
        type:String,
        enum:[
            "Assigned",
            "Completed"
        ],
        default:"Assigned"
    }

},


{
    timestamps:true
}


);


module.exports =
mongoose.model(
"Duty",
dutySchema
);