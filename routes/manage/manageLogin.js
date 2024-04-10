const express = require("express");
const router = express.Router();
const manageLogin = require("../../controllers/loginController");

router.get("/profile", manageLogin.getManageLogin);

router.post("/", manageLogin.postManageLogin);

module.exports = router;
