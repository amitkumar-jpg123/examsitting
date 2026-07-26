const express = require("express");

const router = express.Router();


const {
    createDuty,

getMyDuties,

completeDuty

}
=
require("../controller/dutyController");


router.post(
"/create",
createDuty
);


router.get(
"/:id",
getMyDuties
);



router.put(
"/complete/:id",
completeDuty
);



module.exports = router;