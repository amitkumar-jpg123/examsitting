const nodemailer = require("nodemailer");


const sendContactEmail = async (req,res)=>{


try{


const {
name,
email,
phone,
message
}=req.body;



if(
!name ||
!email ||
!phone ||
!message
){

return res.status(400).json({

success:false,

message:"Please fill all fields"

});

}




const transporter = nodemailer.createTransport({

service:"gmail",

auth:{

user:process.env.EMAIL_USER,

pass:process.env.EMAIL_PASS

}

});





await transporter.sendMail({


from:process.env.EMAIL_USER,


to:process.env.EMAIL_USER,


subject:"New Contact Message",


html:`

<h2>Exam Seating System Contact</h2>

<p><b>Name:</b> ${name}</p>

<p><b>Email:</b> ${email}</p>

<p><b>Phone:</b> ${phone}</p>

<p><b>Message:</b> ${message}</p>

`


});





res.status(200).json({

success:true,

message:"Email sent successfully"

});




}catch(error){


console.log(error);


res.status(500).json({

success:false,

message:"Email failed"

});


}


};



module.exports={
sendContactEmail
};