const express = require("express");
const router = express.Router();
const manageLogin = require("../../controllers/loginController");

router.get("/login/profile", manageLogin.getManageLogin);

router.get("/login", manageLogin.postManageLogin);

module.exports = router;
