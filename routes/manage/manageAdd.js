const express = require("express");
const router = express.Router();
const manageController = require("../../controllers/signupController");

router.get("/", manageController.getManageSignup);

router.post("/", manageController.manageAdd);

module.exports = router;
