const express = require("express");

const router = express.Router();

const {
    registerInvigilator,
    loginInvigilator,
    getInvigilatorProfile,
    getInvigilatorDashboard
} = require("../controller/invigilatorloginController");


// ============================
// Register Invigilator
// ============================

router.post(
    "/register",
    registerInvigilator
);


// ============================
// Login Invigilator
// ============================

router.post(
    "/login",
    loginInvigilator
);


// ============================
// Profile
// ============================

router.get(
    "/profile/:id",
    getInvigilatorProfile
);


// ============================
// Dashboard
// ============================

router.get(
    "/dashboard/:id",
    getInvigilatorDashboard
);


module.exports = router;