
const express = require("express");
const router = express.Router();

// Registration controller imported
const regController = require("../controller/userController");

//Access route/end point
router.post("/course", regController.courses);
router.post("/contact", regController.contact_Us);
// router.post("/sign-up", regController.login);



module.exports = router;