const express = require("express");
const router = express.Router();
const manageLogin = require("../../controllers/loginController");

router.get("/", manageLogin.getManageLogin);

router.get("/login", manageLogin.postManageLogin);

module.exports = router;
