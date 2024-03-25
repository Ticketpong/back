const express = require("express");
const router = express.Router();
const manageLogout = require("../../controllers/loginController");

router.get("/", manageLogout.getManageLogout);

module.exports = router;
