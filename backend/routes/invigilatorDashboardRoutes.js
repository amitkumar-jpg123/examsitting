const express=require("express");

const router=express.Router();


const {
getInvigilatorDashboard
}
=require("../controller/invigilatorDashboardController");



router.get(
"/dashboard/:id",
getInvigilatorDashboard
);


module.exports=router;